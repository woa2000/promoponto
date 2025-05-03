import Image from "next/image";
import SimplePortableText from "@/components/ui/SimplePortableText";
import Link from "next/link";

interface ConteudoNoticiaProps {
  reading: boolean;
  post: {
    slug: { current: string }
    title: string;
    subTitle?: string;
    image?: string | null;
    columns?: number;
    body: any;
  };
}

export default function ConteudoNoticia({ reading, post }: ConteudoNoticiaProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-white text-left px-8 md:px-20 py-10 rounded-t-2xl">
        <div className="flex justify-end items-center gap-4">
          <button>
            <Image
              src="/images/icons/share.svg"
              alt="Share"
              width={24}
              height={24}
            />
          </button>
          <Link
            key={post.slug.current}
            href={`/noticias/${post.slug.current}/${reading ? 'full' : 'read'}`}
          >
            <Image
              src="/images/icons/extend.svg"
              alt="Extend"
              width={24}
              height={24}
            />
          </Link>
        </div>
        <div className="w-full">
          <h1 className="text-brand-purple font-bold text-[clamp(36px,6vw,48px)] leading-[52px] mb-3 mt-3">
            {post.title}
          </h1>
          {post.subTitle && (
            <p className="text-brand-purple text-[clamp(22px,3vw,30px)] font-medium">
              {post.subTitle}
            </p>
          )}
        </div>
      </section>

      {post.image && (
        <section className="relative min-h-[600px] w-full">
          <Image
            src={post.image}
            alt={post.title || "Page image"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </section>
      )}

      {/* Bloco de texto em branco */}
      <section className="bg-white px-8 md:px-20 py-20 text-brand-gray text-lg leading-relaxed rounded-b-2xl">
        <div className={`w-full mx-auto grid ${post.columns ? `lg:grid-cols-${post.columns}` : 'grid-cols-1'} gap-20 text-brand-purple text-left text-[22px]`}>
          <SimplePortableText value={post.body} />
        </div>
      </section>
    </>
  );
}
