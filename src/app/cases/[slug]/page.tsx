import Layout from '@/components/layout';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import CaseClient from '@/components/cases/CaseClient';

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

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch<SanityDocument & {
    title: string;
    subTitle?: string;
    imagemCapa?: SanityImageSource;
    galeria?: GalleryItem[];
    body: any;
  }>(POST_QUERY, { slug: params.slug }, options);

  const postImageUrl = post.imagemCapa
    ? urlFor(post.imagemCapa)?.width(550).height(310).url()
    : null;

  return (
    <Layout>
      <CaseClient post={post} postImageUrl={postImageUrl} />
    </Layout>
  );
}
