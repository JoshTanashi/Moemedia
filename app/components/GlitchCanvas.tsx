"use client";

import { useEffect, useRef } from "react";

type Cleanup = () => void;

export function GlitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let cleanup: Cleanup | null = null;

    (async () => {
      const [THREE, { EffectComposer }, { RenderPass }, { ShaderPass }, { RGBShiftShader }] =
        await Promise.all([
          import("three"),
          import("three/examples/jsm/postprocessing/EffectComposer.js"),
          import("three/examples/jsm/postprocessing/RenderPass.js"),
          import("three/examples/jsm/postprocessing/ShaderPass.js"),
          import("three/examples/jsm/shaders/RGBShiftShader.js"),
        ]);

      if (cancelled) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const rgbShiftPass = new ShaderPass(RGBShiftShader);
      rgbShiftPass.uniforms.amount.value = 0.003;
      composer.addPass(rgbShiftPass);

      const textureLoader = new THREE.TextureLoader();

      let active = false;
      let rafId = 0;
      let fadeTimeout: ReturnType<typeof setTimeout> | null = null;
      let currentImage: string | null = null;
      const startTime = performance.now();

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      const renderLoop = (time: number) => {
        if (!active) return;
        const elapsed = (time - startTime) / 1000;
        rgbShiftPass.uniforms.amount.value = 0.004 + Math.sin(elapsed * 2.4) * 0.002;
        composer.render();
        rafId = requestAnimationFrame(renderLoop);
      };

      const startLoop = () => {
        if (active) return;
        active = true;
        rafId = requestAnimationFrame(renderLoop);
      };

      const stopLoop = () => {
        active = false;
        if (rafId) cancelAnimationFrame(rafId);
      };

      const applyCover = (image: HTMLImageElement) => {
        const screenAspect = window.innerWidth / window.innerHeight;
        const imageAspect = image.width / image.height;
        const tex = material.map;
        if (!tex) return;
        if (screenAspect > imageAspect) {
          tex.repeat.set(1, imageAspect / screenAspect);
          tex.offset.set(0, (1 - imageAspect / screenAspect) / 2);
        } else {
          tex.repeat.set(screenAspect / imageAspect, 1);
          tex.offset.set((1 - screenAspect / imageAspect) / 2, 0);
        }
      };

      const handleEnter = (e: Event) => {
        const detail = (e as CustomEvent<{ image: string }>).detail;
        if (!detail?.image) return;

        if (fadeTimeout) {
          clearTimeout(fadeTimeout);
          fadeTimeout = null;
        }

        if (currentImage !== detail.image) {
          currentImage = detail.image;
          textureLoader.load(detail.image, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map = texture;
            material.needsUpdate = true;
            applyCover(texture.image as HTMLImageElement);
          });
        }

        canvas.style.transition = "opacity 600ms ease";
        canvas.style.opacity = "1";
        startLoop();
      };

      const handleLeave = () => {
        canvas.style.transition = "opacity 300ms ease";
        canvas.style.opacity = "0";
        fadeTimeout = setTimeout(() => {
          stopLoop();
        }, 300);
      };

      window.addEventListener("card-glitch-enter", handleEnter as EventListener);
      window.addEventListener("card-glitch-leave", handleLeave);

      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("card-glitch-enter", handleEnter as EventListener);
        window.removeEventListener("card-glitch-leave", handleLeave);
        stopLoop();
        if (fadeTimeout) clearTimeout(fadeTimeout);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="glitch-canvas hidden md:block" />;
}
