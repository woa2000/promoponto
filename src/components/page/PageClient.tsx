'use client';

import Image from "next/image";
import ServiceIcon from "@/components/ui/ServiceIcon";
import SimplePortableText from "@/components/ui/SimplePortableText";
import { SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface PageClientProps {
  post: SanityDocument & {
    title: string;
    subTitle?: string;
    image?: SanityImageSource;
    columns?: number;
    body: any;
    showService?: boolean;
  };
  postImageUrl: string | null | undefined;
}

export default function PageClient({ post, postImageUrl }: PageClientProps) {
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
            alt={post.title || "Page image"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </section>
      )}

      {/* Bloco de texto em branco */}
      <section className="bg-white px-8 md:px-20 py-20 text-brand-gray text-lg leading-relaxed rounded-b-2xl">
        <div className={`w-full mx-auto grid ${post.columns ? `lg:grid-cols-${post.columns}` : 'grid-cols-1'} gap-20 text-brand-purple text-left text-[22px]`}>
          <SimplePortableText value={post.body} />
        </div>
      </section>

      {/* Seção Serviços */}
      {post.showService && (
        <section className="bg-brand-purple px-8 md:px-20 py-20 mt-6 text-center text-white rounded-2xl">
          <h2 className="text-brand-lime text-[clamp(36px,6vw,48px)] font-semibold mb-8 text-left">Serviços</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {[
              ["Design de Imobiliário", "Da exposição de produto a exposição de marca.", "/images/icons/ico1.svg"],
              ["MPDV & Retail Intelligence", "Da entrada no canal até o contato com produto.", "/images/icons/ico2.svg"],
              ["Ativação de Marca & Vendas", "Da degustação a recreação com o shopper.", "/images/icons/ico3.svg"],
              ["Promoção", "Do gatilho de compra ao impacto nas vendas.", "/images/icons/ico4.svg"],
              ["Estande, Convenção & Eventos", "Dos negócios e engajamento, indo até o entretenimento.", "/images/icons/ico5.svg"],
              ["Ferramenta de Vendas", "Do argumento de vendas a proposta de valor do produto.", "/images/icons/ico6.svg"],
              ["Trade Digital", "Dos canais sociais ao e-commerce.", "/images/icons/ico7.svg"],
            ].map(([label, description, icon]) => (
              <ServiceIcon key={label} label={label} icon={icon} description={description} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
