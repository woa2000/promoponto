import Layout from '@/components/layout';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import ConteudoNoticia from "@/components/noticia/ConteudoNoticia";

const POST_QUERY = `*[_type == "noticia" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function Noticia({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);

    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null;
    return (
        <Layout>
            <ConteudoNoticia
                reading={false}
                post={{
                    slug: post.slug,
                    title: post.title,
                    subTitle: post.subTitle,
                    image: postImageUrl,
                    body: post.body,
                }}
            />
        </Layout>
    );
}


