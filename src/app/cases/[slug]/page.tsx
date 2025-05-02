'use client';

import Image from 'next/image';
import Layout from '@/components/layout';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import SimplePortableText from '@/components/ui/SimplePortableText';

const POST_QUERY = `*[_type == "portfolio" && slug.current == $slug][0]`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

// Tipagem para itens de galeria
interface GalleryItem {
  image?: SanityImageSource;
  descricao?: string;
  _key: string;
}

export default async function Case({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument & {
    title: string;
    subTitle?: string;
    imagemCapa?: SanityImageSource;
    galeria?: GalleryItem[];
    body: any;
  }>(POST_QUERY, await params, options);

  const postImageUrl = post.imagemCapa
    ? urlFor(post.imagemCapa)?.width(550).height(310).url()
    : null;

  return (
    <Layout>
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
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </section>
      )}

      {/* Galeria de imagens do portfólio */}
      {Array.isArray(post.galeria) && post.galeria.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {post.galeria.map((item: GalleryItem, idx: number) => {
            const imageUrl =
              item.image && urlFor(item.image)?.width(800).height(600).url();
            return (
              imageUrl && (
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
              )
            );
          })}
        </section>
      )}

      {/* Bloco de texto */}
      <section className="bg-white px-8 md:px-20 py-20 text-lg leading-relaxed rounded-b-2xl">
        <div className="mx-auto grid lg:grid-cols-2 gap-20 text-brand-purple text-left text-[22px]">
          <SimplePortableText value={post.body} className="col-span-2" />
        </div>
      </section>
    </Layout>
  );
}


// import Image from "next/image";
// import Layout from '@/components/layout'
// import imageUrlBuilder from "@sanity/image-url";
// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
// import { client } from "@/sanity/client";
// import { SanityDocument } from "next-sanity";
// import SimplePortableText from "@/components/ui/SimplePortableText";

// const POST_QUERY = `*[_type == "portfolio" && slug.current == $slug][0]`;

// const { projectId, dataset } = client.config();
// const urlFor = (source: SanityImageSource) =>
//     projectId && dataset
//         ? imageUrlBuilder({ projectId, dataset }).image(source)
//         : null;

// const options = { next: { revalidate: 30 } };

// export default async function Case({
//     params,
// }: {
//     params: Promise<{ slug: string }>;
// }) {
//     const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);

//     console.log("post", post);
//     const postImageUrl = post.imagemCapa
//         ? urlFor(post.imagemCapa)?.width(550).height(310).url()
//         : null;

//     console.log("postImageUrl", postImageUrl);

//     return (
//         <Layout>
//             {/* Hero */}
//             <section className="bg-white text-left px-8 md:px-20 py-10 rounded-t-2xl">
//                 <div className="w-full">
//                     <h1 className="text-brand-purple font-bold text-[clamp(36px,6vw,48px)]">
//                         {post.title}
//                     </h1>
//                     <p className="text-brand-purple text-[clamp(22px,3vw,30px)] font-medium">
//                         {post.subTitle}
//                     </p>
//                 </div>
//             </section>

//             {postImageUrl && (
//                 <section className="relative min-h-[600px] w-full">
//                     <Image
//                         src={postImageUrl}
//                         alt={post.title || "Page image"}
//                         fill
//                         style={{ objectFit: "cover" }}
//                         priority
//                     />
//                 </section>
//             )}

//             {/* Galeria de imagens do portfólio */}
//             {Array.isArray(post.galeria) && post.galeria.length > 0 && (
//                 <section className="relative min-h-[600px] w-full">
//                     {post.galeria.map((item: { image?: any; descricao?: string; _key?: string }, idx: number) => {
//                         const imageUrl = item?.image ? urlFor(item.image)?.width(800).height(600).url() : null;
//                         return imageUrl ? (
//                             <div key={item._key || idx} className="relative w-full aspect-[4/3] overflow-hidden shadow-md">
//                                 <Image
//                                     src={imageUrl}
//                                     alt={item.descricao || `Imagem ${idx + 1}`}
//                                     fill
//                                     className="object-cover"
//                                     sizes="(max-width: 768px) 100vw, 33vw"
//                                 />
//                                 {item.descricao && (
//                                     <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 rounded-b-xl">
//                                         {item.descricao}
//                                     </div>
//                                 )}
//                             </div>
//                         ) : null;
//                     })}
//                 </section>
//             )}

//             {/* Bloco de texto em branco */}
//             <section className="bg-white px-8 md:px-20 py-20 text-brand-gray text-lg leading-relaxed rounded-b-2xl">
//                 <div className="w-full mx-auto grid  lg:grid-cols-2 gap-20 text-brand-purple text-left text-[22px]">
//                     <SimplePortableText value={post.body} />
//                 </div>
//             </section>
//         </Layout>
//     );
// }


