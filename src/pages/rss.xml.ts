import { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG } from 'astrowind:config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts();

  const rss = await getRssString({
    title: SITE.name || 'Jasa Saluran Mampet Karawang',
    description: METADATA?.description || 'Layanan Ahli Saluran Mampet Karawang Bergaransi',
    
    // Gunakan URL absolut yang valid
    site: import.meta.env.SITE || SITE.site || 'https://jasasaluranmampetkarawang.id',

    items: posts.map((post) => ({
      link: getPermalink(post.permalink, 'post'),
      title: post.title || '',
      description: post.excerpt || '',
      pubDate: post.publishDate ? new Date(post.publishDate) : new Date(),
      customData: post.category ? `<category>${post.category}</category>` : '',
    })),

    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};