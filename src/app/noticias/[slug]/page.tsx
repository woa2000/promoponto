import Image from "next/image";
import Layout from '@/components/layout'
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import SimplePortableText from "@/components/ui/SimplePortableText";

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
            {/* Hero */}
            <section className="bg-white text-left px-8 md:px-20 py-10 rounded-t-2xl">
                <div className="w-full">
                    <h1 className="text-brand-purple font-bold text-[clamp(36px,6vw,48px)] leading-[52px] mb-3 mt-3">
                        {post.title}
                    </h1>
                    <p className="text-brand-purple text-[clamp(22px,3vw,30px)] font-medium">
                        {post.subTitle}
                    </p>
                </div>
            </section>

            {postImageUrl && (
                <section className="relative min-h-[600px] w-full">
                    <Image
                        src={postImageUrl}
                        alt={post.title || "Page image"}
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </section>
            )}

            {/* Bloco de texto em branco */}
            <section className="bg-white px-8 md:px-20 py-20 text-brand-gray text-lg leading-relaxed rounded-b-2xl">
                <div className="w-full mx-auto grid  lg:grid-cols-2 gap-20 text-brand-purple text-left text-[22px]">
                    <SimplePortableText value={post.body} />                    
                </div>
            </section>
        </Layout>
    );
}


