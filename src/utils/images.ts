// @ts-nocheck
import { isUnpicCompatible, unpicOptimizer, astroAssetsOptimizer } from './images-optimization';
import type { ImageMetadata } from 'astro';
import type { OpenGraph } from '@astrolib/seo';
import type { ImagesOptimizer } from './images-optimization';

/** The optimized image shape returned by our ImagesOptimizer */
type OptimizedImage = Awaited<ReturnType<ImagesOptimizer>>[0];

const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;
  try {
    images = import.meta.glob('~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}');
  } catch (error) {
    // continue regardless of error
  }
  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined = undefined;

/** */
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

/** */
export const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  if (typeof imagePath !== 'string') {
    return imagePath;
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath;
  }

  if (!imagePath.startsWith('~/assets/images')) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  const key = imagePath.replace('~/', '/src/');

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata })['default']
    : null;
};

/** */
export const adaptOpenGraphImages = async (
  openGraph: OpenGraph = {},
  astroSite: URL | undefined = new URL('https://jasasaluranmampetkarawang.my.id') // Gunakan domain SSOT Anda
): Promise<OpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph;
  }

  const images = openGraph.images;
  const defaultWidth = 1200;
  const defaultHeight = 630;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as ImageMetadata | string | undefined;
        if (!resolvedImage) {
          return { url: '' };
        }

        let _image: OptimizedImage | undefined;

        // 1. Tangani Unpic Compatible (Remote)
        if (
          typeof resolvedImage === 'string' &&
          (resolvedImage.startsWith('http://') || resolvedImage.startsWith('https://')) &&
          isUnpicCompatible(resolvedImage)
        ) {
          _image = (await unpicOptimizer(resolvedImage, [defaultWidth], defaultWidth, defaultHeight, 'jpg'))[0];
        } 
        // 2. Tangani Internal/Local atau Remote via Astro Assets
        else if (resolvedImage) {
          const isString = typeof resolvedImage === 'string';
          
          // PERBAIKAN: Jika string (remote/absolute), paksa inferSize via props tambahan
          // AstroAssetsOptimizer membutuhkan props yang tepat agar tidak crash
          const dimensions = !isString && resolvedImage?.width <= defaultWidth
              ? [resolvedImage?.width, resolvedImage?.height]
              : [defaultWidth, defaultHeight];

          try {
            _image = (await astroAssetsOptimizer(
              resolvedImage, 
              [dimensions[0]], 
              dimensions[0], 
              dimensions[1], 
              'jpg',
              undefined,
              { inferSize: isString } // Kunci: paksa infer jika itu string path
            ))[0];
          } catch (e) {
            // Fallback: Jika masih gagal, kembalikan URL asli tanpa optimasi agar build tidak stop
            return { url: isString ? resolvedImage : resolvedImage.src };
          }
        }

        if (typeof _image === 'object' && _image !== null) {
          return {
            url: 'src' in _image ? String(new URL(_image.src, astroSite)) : '',
            width: _image.width || undefined,
            height: _image.height || undefined,
          };
        }
      }
      return { url: '' };
    })
  );

  return { ...openGraph, images: adaptedImages.filter((img) => img.url !== '') };
};