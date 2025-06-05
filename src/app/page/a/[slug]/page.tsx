import Layout from '@/components/layout';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import PageClient from "@/components/page/PageClient";

const POST_QUERY = `*[_type == "page" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function PageServerComponent({
    params,
}: {
    params: { slug: string };
}) {
    const post = await client.fetch<SanityDocument & {
      title: string;
      subTitle?: string;
      image?: SanityImageSource;
      columns?: number;
      body: any;
      showService?: boolean;
    }>(POST_QUERY, { slug: params.slug }, options);
    
    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null;

    return (
        <Layout>
            <PageClient post={post} postImageUrl={postImageUrl} />
        </Layout>
    );
}


