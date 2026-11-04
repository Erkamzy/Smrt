export const company = {
  name: "Смарткарт ХХК",
  founded: 1998,
  phone: "+976 7773-7007",
  phoneHref: "tel:+97677737007",
  email: "info@smrt.mn",
  site: "https://smrt.mn",
};

export const solutions = [
  {
    icon: "🪪",
    title: "Цахим бүртгэл, аюулгүй байдал",
    text: "Дэлхийн улс орнуудын засгийн газруудад итгэгдсэн шийдэл",
    href: "/solution/digital-identity",
    items: [],
  },
  {
    icon: "💳",
    title: "Төлбөр тооцоо",
    text: "Аюулгүй, хялбар төлбөр тооцооны боломжийг нээнэ",
    href: "/solution/payment",
    items: [
      "Төвлөрсөн карт хэвлэл",
      "Картын шуурхай хэвлэл",
      "Киоск",
      "Аюулгүй гүйлгээ, токен",
      "Дижитал карт",
      "Картын бэлдэц",
    ],
  },
  {
    icon: "🔐",
    title: "Биет аюулгүй байдлын бүтээгдэхүүн",
    text: "Аюулгүй байдлын хамгийн орчин үеийн цогц шийдэл",
    href: "/solution/physical-security",
    items: [],
  },
];

export const industries = [
  { icon: "🏦", title: "Банк санхүү", text: "Төлбөрийн карт хэвлэл, бэлдэц, аюулгүй төлбөр тооцооны шийдэл" },
  { icon: "🏛️", title: "Засгийн газар", text: "Биет болон цахим бичиг баримтын шийдэл" },
  { icon: "💻", title: "Технологи", text: "Мэдээллийн аюулгүй байдал, интернет төлбөр тооцооны шийдэл" },
  { icon: "📡", title: "Үүрэн холбоо", text: "Сим карт, е-сим картын шийдэл" },
  { icon: "⛏️", title: "Уул уурхай", text: "Тээврийн хэрэгслийн удирдлага, аюулгүй байдлын систем" },
  { icon: "🛍️", title: "Худалдаа, үйлчилгээ", text: "Гишүүнчлэл, хөнгөлөлтийн карт, интернет төлбөр тооцооны шийдэл" },
];

// Гадаадын хамтрагчид (лого: public/partners/). href байгаа нь сайтын дотоод хуудастай.
export const partners: { name: string; logo: string; href?: string }[] = [
  { name: "Thales", logo: "/partners/thales.png", href: "/partners/thales" },
  { name: "Entrust", logo: "/partners/entrust.png", href: "/partners/entrust" },
  { name: "Diebold Nixdorf", logo: "/partners/diebold-nixdorf.webp" },
  { name: "Hewlett Packard Enterprise", logo: "/partners/hpe.png" },
  { name: "APC", logo: "/partners/apc.webp" },
  { name: "Sargent & Greenleaf", logo: "/partners/sargent-greenleaf.png" },
  { name: "CIM", logo: "/partners/cim.png" },
  { name: "Brink's", logo: "/partners/brinks.png" },
];

// Монголын хамтрагч байгууллагууд (лого: public/partners/mn/)
export const localPartners: { name: string; logo: string }[] = [
  { name: "Монгол Улсын Засгийн газар", logo: "/partners/mn/government.png" },
  { name: "Улсын бүртгэлийн ерөнхий газар", logo: "/partners/mn/civil-registration.png" },
  { name: "Нийслэлийн Засаг даргын Тамгын газар", logo: "/partners/mn/ulaanbaatar.webp" },
  { name: "Чингис Хаан үндэсний музей", logo: "/partners/mn/chinggis-khaan-museum.webp" },
  { name: "Хаан банк", logo: "/partners/mn/khan-bank.png" },
  { name: "Голомт банк", logo: "/partners/mn/golomt-bank.png" },
  { name: "Худалдаа хөгжлийн банк", logo: "/partners/mn/tdb.png" },
  { name: "Төрийн банк", logo: "/partners/mn/state-bank.png" },
  { name: "Богд банк", logo: "/partners/mn/bogd-bank.png" },
  { name: "Чингис Хаан банк", logo: "/partners/mn/chinggis-khaan-bank.png" },
  { name: "М банк", logo: "/partners/mn/m-bank.png" },
];