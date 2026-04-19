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