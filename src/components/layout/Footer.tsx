import Link from "next/link";
import { Linkedin, Instagram, Phone } from "lucide-react";

/**
 * Footer
 * Menu ocupa 1/3 da largura; restante ocupa 2/3.
 * 100 % TailwindCSS.
 */
export default function Footer() {
  return (
    <footer className="bg-[#d0d0cf] text-brand-400">
      <div className="mx-auto flex container flex-col gap-8 px-6 py-12 md:flex-row md:items-start">
        {/* —— Menu (1/3) —— */}
        <nav className="space-y-3 text-lg font-medium leading-relaxed md:w-1/3 text-left flex flex-col">
          {([
            ["Conheça a Agência", "/agencia"],
            ["Nossos Cases", "/cases"],
            ["Notícias e Tendências", "/noticias"],
            ["Entre em Contato", "/contato"],
            ["Política de Privacidade", "/politica-de-privacidade"],
          ] as [string, string][])?.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-brand-500 block"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* —— Conteúdo (2/3) —— */}
        <div className="flex flex-col items-center text-center md:w-2/3">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="text-left flex flex-col">
              <p className="text-base font-medium">Contato direto ao ponto.</p>
              <a
                href="tel:+5511973596836"
                className="mt-1 text-4xl font-bold md:font-extrabold tracking-tight text-brand-700 md:text-5xl"
              >
                11&nbsp;97359.6836
              </a>
            </div>
            <div>
              {/* Ícones sociais */}
              <ul className="flex gap-4">
                <SocialLink
                  href="https://linkedin.com"
                  label="LinkedIn"
                  icon={<Linkedin size={20} />}
                />
                <SocialLink
                  href="https://instagram.com"
                  label="Instagram"
                  icon={<Instagram size={20} />}
                />
                <SocialLink
                  href="https://wa.me/5511973596836"
                  label="WhatsApp"
                  icon={<Phone size={20} />}
                />
              </ul>
            </div>
          </div>
          {/* Endereço */}
          <address className="mt-10 not-italic text-base">
            Rua Arquiteto Marcelo Roberto, 32 – Vila Cruzeiro, São Paulo ‑ SP,
            04726‑190
          </address>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <li>
      <Link
        href={href}
        aria-label={label}
        className="grid h-9 w-9 place-items-center rounded-full bg-[#917CB0] text-white transition hover:bg-brand-700"
      >
        {icon}
      </Link>
    </li>
  );
}
