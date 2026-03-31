import { getAsset, getBlogPermalink, getHomePermalink, getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Beranda', href: getHomePermalink() },
    {
      text: 'Layanan Kami',
      links: [
        { text: 'Wastafel Mampet', href: getPermalink('/pembersihan-wastafel') },
        { text: 'Saluran Kamar Mandi', href: getPermalink('/services-kamar-mandi') },
        { text: 'Sedot WC & Septic Tank', href: getPermalink('/services-sedot-wc') },
        { text: 'Pipa Air Bersih', href: getPermalink('/services-pipa-air') },
      ],
    },
    {
      text: 'Area Karawang',
      links: [
        { text: 'Karawang Barat & Timur', href: getPermalink('/area-karawang-kota') },
        { text: 'Cikampek & Klari', href: getPermalink('/area-cikampek-klari') },
        { text: 'Telukjambe & Galuh Mas', href: getPermalink('/area-telukjambe') },
      ],
    },
    { text: 'Blog Edukasi', href: getBlogPermalink() },
  ],
  actions: [
    { 
      text: 'WhatsApp Kami', 
      href: 'https://wa.me/6281234567890', 
      variant: 'primary' as const // KUNCI MANUAL: Mengunci tipe agar terbaca sebagai 'primary'
    }
  ],
};

export const footerData = {
  links: [
    {
      title: 'Layanan Utama',
      links: [
        { text: 'Ahli Saluran Mampet', href: getPermalink('/services') },
        { text: 'Pembersihan Pipa', href: getPermalink('/services') },
      ],
    },
    {
      title: 'Wilayah Karawang',
      links: [
        { text: 'Karawang Kota', href: getPermalink('/area-karawang-kota') },
        { text: 'Klari', href: getPermalink('/jasa-saluran-mampet-klari-karawang') },
        { text: 'Cikampek', href: getPermalink('/area-cikampek') },
        { text: 'Telukjambe Timur', href: getPermalink('/area-telukjambe-timur') },
        { text: 'Telukjambe Barat', href: getPermalink('/area-telukjambe-barat') },
        { text: 'Purwasari', href: getPermalink('/area-purwasari') },
        { text: 'Kotabaru', href: getPermalink('/area-kotabaru') },
        { text: 'Majalaya', href: getPermalink('/area-majalaya') },
        { text: 'Rengasdengklok', href: getPermalink('/area-rengasdengklok') },
        { text: 'Jatisari', href: getPermalink('/area-jatisari') },
        { text: 'Jatisari', href: getPermalink('/area-jatisari') },
        { text: 'Ciampel', href: getPermalink('/area-ciampel-suryacipta') },
        { text: 'Pangkalan', href: getPermalink('/area-pangkalan-loji') },
        { text: 'Tegalwaru', href: getPermalink('/area-tegalwaru') },
        { text: 'Lemahabang', href: getPermalink('/area-lemahabang-adas') },
        { text: 'Tempuran', href: getPermalink('/area-tempuran') },
        { text: 'Cilamaya Wetan', href: getPermalink('/area-cilamaya-wetan') },
        { text: 'Cilamaya Kulon', href: getPermalink('/area-cilamaya-kulon') },
        { text: 'Rawamerta', href: getPermalink('/area-rawamerta') },
        { text: 'Pedes', href: getPermalink('/area-pedes') },
        { text: 'Cibuaya', href: getPermalink('/area-cibuaya') },
      ],
    },
    {
      title: 'Perusahaan',
      links: [
        { text: 'Tentang Kami', href: getPermalink('/about') },
        { text: 'Kontak', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Ketentuan', href: getPermalink('/terms') },
    { text: 'Privasi', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'WhatsApp', icon: 'tabler:brand-whatsapp', href: 'https://wa.me/6281234567890' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `Dikelola oleh <a class="text-blue-600 underline dark:text-muted" href="https://jasasaluranmampetkarawang.my.id/"> Jasa Saluran Mampet Karawang</a> · All rights reserved.`,
};