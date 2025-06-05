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

export default async function CasePage(props: any) {
  // Handle params safely regardless of their structure
  let slug: string;
  
  if (!props || !props.params) {
    throw new Error("Missing params in page props");
  }
  
  const params = props.params;
  if (params instanceof Promise) {
    const resolvedParams = await params;
    slug = resolvedParams.slug;
  } else if (typeof params === 'object' && params !== null) {
    slug = params.slug;
  } else {
    throw new Error("Invalid params structure");
  }

  const post = await client.fetch<SanityDocument & {
    title: string;
    subTitle?: string;
    imagemCapa?: SanityImageSource;
    galeria?: GalleryItem[];
    body: any;
  }>(POST_QUERY, { slug }, options);

  const postImageUrl = post.imagemCapa
    ? urlFor(post.imagemCapa)?.width(550).height(310).url()
    : null;

  return (
    <Layout>
      <CaseClient post={post} postImageUrl={postImageUrl} />
    </Layout>
  );
}
