import Image from "next/image";
import Layout from '@/components/layout'
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import SimplePortableText from "@/components/ui/SimplePortableText";
import ConteudoNoticia from "@/components/noticia/ConteudoNoticia";

const POST_QUERY = `*[_type == "noticia" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function Noticia(props: any) {
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

    const post = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);

    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null;
    return (
        <div className="flex flex-col bg-white min-h-screen">
            <ConteudoNoticia
                reading={true}
                post={{
                    slug: post.slug,
                    title: post.title,
                    subTitle: post.subTitle,
                    image: postImageUrl,
                    body: post.body,
                }}
            />
        </div>
    );
}


