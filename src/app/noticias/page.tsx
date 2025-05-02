import Layout from '@/components/layout'
import Link from 'next/link'
import Image from 'next/image'

import { client } from '@/sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Tipagem para cada notícia retornada
interface NewsItem {
  _id: string
  title: string
  resume: string
  slug: { current: string }
  publishedAt: string
}

const POSTS_QUERY = `*[
  _type == "noticia" && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id,
  title,
  resume,
  slug,
  publishedAt
}`

const options = { next: { revalidate: 30 } }

export default async function Noticias() {
  // Busca as notícias tipadas como NewsItem[]
  const noticias = await client.fetch<NewsItem[]>(POSTS_QUERY, {}, options)

  return (
    <Layout>
      <h1 className="text-[clamp(36px,6vw,48px)] leading-[52px] font-semibold text-brand-purple mb-6">
        Notícias e novidades no ponto certo<br />para desenvolver o trade.
      </h1>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
        {noticias.map((n) => (
          <Link
            key={n._id}
            href={`/noticias/${n.slug.current}`}
            className="block bg-white rounded-md shadow-sm overflow-hidden flex flex-col hover:shadow-md transition"
          >
            {/* Cabeçalho decorativo */}
            <div className="bg-brand-gray h-20 flex items-center justify-end pr-4">
              <Image
                src="/images/pontos-vertical-verde.png"
                alt={n.title}
                width={30}
                height={30}
                className="opacity-80"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-10 text-left flex-1">
              <h3 className="text-brand-purple text-[28px] font-medium mb-2">
                {n.title}
              </h3>
              <p className="text-brand-purple text-[18px] mt-5">
                {n.resume}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Exemplo de botão para ver mais (opcional)
      <div className="text-center mt-12">
        <Link
          href="/noticias/page/2"
          className="inline-block bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md text-brand-700 text-3xl hover:scale-105 transition"
          aria-label="Ver mais notícias"
        >
          +
        </Link>
      </div>
      */}
    </Layout>
  )
}



// import Layout from '@/components/layout'
// import Link from 'next/link'

// import { type SanityDocument } from "next-sanity";
// import { client } from "@/sanity/client";
// import Image from "next/image";

// const POSTS_QUERY = `*[
//   _type == "noticia"
//   && defined(slug.current)
// ]|order(publishedAt desc)[0...12]{_id, title, resume, slug, publishedAt}`;

// const options = { next: { revalidate: 30 } };


// export default async function Noticias() {
//   const noticias = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

//   return (
//     <Layout>
//       <h1 className="text-[clamp(36px,6vw,48px)] leading-[52px] font-semibold text-brand-purple mb-6">Notícias e novidades no ponto certo <br />para desenvolver o trade.</h1>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
//         {noticias.map((n: any) => (
//           console.log("noticia", n),
//           <Link href={`/noticias/${n.slug.current}`} className="text-xl text-primary">
//             <article
//               key={n.id}
//               className="bg-white rounded-md shadow-sm overflow-hidden flex flex-col"
//             >
//               <div className="bg-brand-gray h-20 flex items-center justify-end pr-4">
//                 {/* Ícones decorativos ou imagem */}
//                 <Image
//                   src={"/images/pontos-vertical-verde.png"}
//                   alt={n.title}
//                   width={30}
//                   height={30}
//                   className="opacity-80"
//                 />
//               </div>
//               <div className="p-4 text-left min-h-[160px] flex-1 p-10">
//                 <h3 className="text-brand-purple text-[28px] font-medium text-base mb-2">
//                   {n.title}
//                 </h3>
//                 <p className="text-brand-purple text-[18px] mt-5">{n.resume}</p>
//               </div>
//             </article>
//           </Link>
//         ))}
//       </div>

//       {/* Botão + */}
//       {/* <button
//         type="button"
//         aria-label="Ver mais notícias"
//         className="mt-12 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md text-brand-700 text-3xl hover:scale-105 transition"
//       >
//         +
//       </button> */}


//       {/* // <ul className="space-y-4 text-black">
//       //   {noticias.map((n: any) => (
//       //     <li key={n._id}>
//       //       <Link href={`/noticias/${n.slug.current}`} className="text-xl text-primary">
//       //         {n.title}
//       //       </Link>
//       //     </li>
//       //   ))}
//       // </ul> */}
//     </Layout>
//   )
// }
