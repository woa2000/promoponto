import Image from "next/image";
import ServiceIcon from "@/components/ui/ServiceIcon";
import Layout from '@/components/layout'
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import SimplePortableText from "@/components/ui/SimplePortableText";

const POST_QUERY = `*[_type == "page" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const options = { next: { revalidate: 30 } };

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);

    console.log("post", post);
    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null;

    console.log("postImageUrl", postImageUrl);

    return (
        <Layout>
            {/* Hero */}
            <section className="bg-white text-left px-8 md:px-20 py-10 rounded-t-2xl">
                <div className="w-full">                   
                    <h1 className="text-brand-purple font-bold text-[clamp(36px,6vw,48px)]">
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

            {/* Seção Serviços */}
            {
                post.showService && (
                    <section className="bg-brand-purple px-8 md:px-20 py-20 mt-6 text-center text-white rounded-2xl">
                        <h2 className="text-brand-lime text-[clamp(36px,6vw,48px)] font-semibold mb-8 text-left">Serviços</h2>
                        <div className="flex flex-wrap justify-center gap-12">
                            {[
                                ["Design de Imobiliário", "Da exposição de produto a exposição de marca.", "/images/icons/ico1.svg"],
                                ["MPDV & Retail Intelligence", "Da entradano canal até o contato com produto.", "/images/icons/ico2.svg"],
                                ["Ativação de Marca & Vendas", "Da degustação a recreação com o shopper.", "/images/icons/ico3.svg"],
                                ["Promoção", "Do gatilhode compra ao impactonas vendas.", "/images/icons/ico4.svg"],
                                ["Estande, Convenção & Eventos", "Dos negóciose engajamento, indo até o entretenimento.", "/images/icons/ico5.svg"],
                                ["Ferramenta de Vendas", "Do argumento de vendas a proposta de valor do produto.", "/images/icons/ico6.svg"],
                                ["Trade Digital", "Dos canais sociais aoe-commerce.", "/images/icons/ico7.svg"],
                            ].map(([label, description, icon]) => (
                                <ServiceIcon key={label} label={label} icon={icon} description={description} />
                            ))}
                        </div>
                    </section>
                )
            }

        </Layout>
    );
}


