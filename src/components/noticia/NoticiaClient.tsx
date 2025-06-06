'use client';

import Image from 'next/image';
import { SanityDocument } from 'next-sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import SimplePortableText from '@/components/ui/SimplePortableText';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NoticiaClientProps {
  post: SanityDocument & {
    title: string;
    subTitle?: string;
    mainImage?: SanityImageSource;
    body: any;
    publishedAt: string;
  };
  postImageUrl: string | null | undefined;
}

export default function NoticiaClient({ post, postImageUrl }: NoticiaClientProps) {
  // Format date for display
  const publishedDate = post.publishedAt ? 
    format(new Date(post.publishedAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR }) : 
    '';

  return (
    <>
      {/* Hero */}
      <section className="bg-white text-left px-8 md:px-20 py-10 rounded-t-2xl">
        <div className="w-full">
          <h1 className="text-brand-purple font-bold text-[clamp(36px,6vw,48px)]">
            {post.title}
          </h1>
          {post.subTitle && (
            <p className="text-brand-purple text-[clamp(22px,3vw,30px)] font-medium mt-4">
              {post.subTitle}
            </p>
          )}
          {publishedDate && (
            <p className="text-neutral-500 mt-6">
              Publicado em {publishedDate}
            </p>
          )}
        </div>
      </section>

      {postImageUrl && (
        <section className="relative min-h-[500px] w-full">
          <Image
            src={postImageUrl}
            alt={post.title || "Imagem da notícia"}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </section>
      )}

      {/* Conteúdo do corpo */}
      <section className="bg-white px-8 md:px-20 py-20 text-lg leading-relaxed rounded-b-2xl">
        <div className="mx-auto max-w-3xl text-brand-purple text-left">
          <SimplePortableText value={post.body} />
        </div>
      </section>

      {/* Botão de voltar para a página noticias */}
      <section className="flex justify-center py-10">
        <a 
          href="/noticias" 
          className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          aria-label="Voltar para notícia"
        >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-brand-purple"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
        </a>
      </section>
    </>
  );
}
