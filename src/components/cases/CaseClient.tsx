'use client';

import Image from 'next/image';
import SimplePortableText from '@/components/ui/SimplePortableText';
import { SanityDocument } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';

// Typagem para itens de galeria
interface GalleryItem {
  image?: SanityImageSource;
  descricao?: string;
  _key: string;
}

// Configure urlFor function
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset && source
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface CaseClientProps {
  post: SanityDocument & {
    title: string;
    subTitle?: string;
    imagemCapa?: SanityImageSource;
    galeria?: GalleryItem[];
    body: any;
  };
  postImageUrl: string | null | undefined;
}

export default function CaseClient({ post, postImageUrl }: CaseClientProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-white text-left px-8 md:px-20 py-10 rounded-t-2xl">
        <div className="w-full">
          <h1 className="text-brand-purple font-bold text-[clamp(36px,6vw,48px)]">
            {post.title}
          </h1>
          {post.subTitle && (
            <p className="text-brand-purple text-[clamp(22px,3vw,30px)] font-medium">
              {post.subTitle}
            </p>
          )}
        </div>
      </section>

      {postImageUrl && (
        <section className="relative min-h-[600px] w-full">
          <Image
            src={postImageUrl}
            alt={post.title || 'Imagem do case'}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </section>
      )}

      {/* Galeria de imagens */}
      {Array.isArray(post.galeria) && post.galeria.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {post.galeria.map((item: GalleryItem, idx: number) => {
            // Verificar se o item tem uma imagem válida
            if (!item.image) return null;

            const imageUrl = urlFor(item.image)?.width(800).height(600).url();
            
            if (!imageUrl) return null;

            return (
              <div
                key={item._key}
                className="relative w-full aspect-[4/3] overflow-hidden shadow-md"
              >
                <Image
                  src={imageUrl}
                  alt={item.descricao || `Imagem ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {item.descricao && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 rounded-b-xl">
                    {item.descricao}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* Conteúdo do corpo */}
      <section className="bg-white px-8 md:px-20 py-20 text-lg leading-relaxed rounded-b-2xl">
        <div className="mx-auto grid lg:grid-cols-2 gap-20 text-brand-purple text-left text-[22px]">
          <SimplePortableText value={post.body} className="col-span-2" />
        </div>
      </section>
    </>
  );
}
