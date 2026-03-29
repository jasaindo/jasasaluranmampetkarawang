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
    title: `${SITE.name}’s Blog`,
    description: METADATA?.description || '',
    // PERBAIKAN: Gunakan SITE.site dari konfigurasi AstroWind
    site: SITE.site,

    items: posts.map((post) => {
      const permalink = getPermalink(post.permalink, 'post');
      return {
        link: permalink, // getPermalink sudah menangani trailingSlash secara otomatis di AstroWind
        title: post.title,
        description: post.excerpt,
        pubDate: post.publishDate,
      };
    }),

    customData: `<language>${SITE.language || 'id-id'}</language>`,
    trailingSlash: SITE.trailingSlash,
  });

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
