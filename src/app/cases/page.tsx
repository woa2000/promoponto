import Layout from '@/components/layout'

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import CasesGrid from '@/components/grid/CasesGrid';

const POSTS_QUERY = `*[_type == "portfolio"]{
  _id,
  title,
  slug,  
  imagemCapa {
    ..., // Inclui outros campos da imagem como hotspot e crop
    asset->{ // Acessa os detalhes do asset (arquivo) da imagem
      _id,
      url // Obtém a URL direta da imagem
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function Cases() {
  const sanityTiles = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  
  // Escolhe dinamicamente o tipo de tile baseado na posição ou outro critério
  const tiles = sanityTiles.map((doc) => {
    return {
      titulo: doc.title,
      imagem: doc.imagemCapa || null,
      link: doc.slug?.current ? `/cases/${doc.slug.current}` : "#",
      type: '',
    };
  });

  return (
    <Layout>
      <CasesGrid tiles={tiles} />
    </Layout>
  )
}
