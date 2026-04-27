import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().url().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string().url(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/post' }),
  schema: ({ image }) => // PERBAIKAN: Menggunakan fungsi image untuk optimasi aset
    z.object({
      publishDate: z.date().optional(),
      updateDate: z.date().optional(),
      draft: z.boolean().optional(),

      title: z.string(),
      excerpt: z.string().optional(),
      // PERBAIKAN: image() mendukung path lokal (~/assets) dan URL remote
      image: image().optional(), 

      category: z.string().optional(),
      tags: z.array(z.string()).default([]), 
      author: z.string().optional(),

      metadata: metadataDefinition(),
    }),
});

export const collections = {
  post: postCollection,
};