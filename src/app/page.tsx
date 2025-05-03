import HomeGrid from '@/components/grid/HomeGrid'
import Layout from '@/components/layout'

import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[_type == "tiles"]{
  _id,
  title,
  cor,
  image {
    ..., // Inclui outros campos da imagem como hotspot e crop
    asset->{ // Acessa os detalhes do asset (arquivo) da imagem
      _id,
      url // Obtém a URL direta da imagem
    }
  },
  tipoTiles,
  tipoLink,
  link
}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const sanityTiles = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  // Map SanityDocument to TileData
  const tiles = sanityTiles.map((doc) => ({
    titulo: doc.title,
    imagem: doc.image || null,
    cor: doc.cor,
    tipoLink: doc.tipoLink,
    link: doc.link ? doc.link : "#",
    type: doc.tipoTiles,
  }));

  return (
    <Layout>
      <HomeGrid tiles={tiles} />
    </Layout>
  )
}
