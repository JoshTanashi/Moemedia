export const contact = {
  phoneDisplay: "073 569 2335",
  tel: "tel:+27735692335",
  whatsapp: "https://wa.me/27735692335",
  email: "joshua@moemedia.co.za",
  location: "South Africa",
};

export function whatsappLink(message: string) {
  return `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
