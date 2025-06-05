import Layout from '@/components/layout';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import { SanityDocument } from 'next-sanity';
import NoticiaClient from '@/components/noticia/NoticiaClient';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function NoticiaPage(props: any) {
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
    mainImage?: SanityImageSource;
    body: any;
    publishedAt: string;
  }>(POST_QUERY, { slug }, options);

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : null;

  return (
    <Layout>
      <NoticiaClient post={post} postImageUrl={postImageUrl} />
    </Layout>
  );
}
