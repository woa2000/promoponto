'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Linkedin, Instagram, Phone } from 'lucide-react';

/**
 * Header com Drawer à direita (30% da viewport)
 * Funciona para desktop e mobile.
 * Sem backdrop — o conteúdo permanece visível, como no mockup.
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  const links: [string, string][] = [
    ['Conheça a Agência', '/page/a/conheca-a-agencia'],
    ['Nossos Cases', '/cases'],
    ['Notícias e Tendências', '/noticias'],
    ['Entre em Contato', '/contato'],
    ['Política de Privacidade', '/page/a/politica-de-privacidade'],
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 bg-brand-background">
          <Link href="/">
            <Image
              src="/logo-promo-ponto.png"
              alt="Logo"
              width={300}
              height={300}
              className="h-16 w-auto"
            />
          </Link>
          {/* Botão sempre visível */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="ml-2"
          >
            <Image
              src="/images/icons/menu.svg"
              alt="Menu"
              width={40}
              height={40}
              className="h-16 w-16"
            />
          </button>
        </div>
      </header>

      {/* Drawer para todas as telas */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[70vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[30vw] sd:max-w-md bg-white px-6 py-10 shadow-lg flex flex-col justify-center transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        } text-[#8C4F9A]`}
      >
        {/* Close */}
        <button
          className="absolute right-4 top-4 text-brand-700"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        >
          <XMarkIcon className="h-10 w-10" />
        </button>

        <nav className="mt-8 flex flex-col gap-6 text-[30px] font-medium px-20">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="hover:text-brand-700"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div className="mt-10 flex flex-col px-20">
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
      </aside>

      {/* Overlay invisível para capturar cliques fora */}
      {open && (
        <button
          className="fixed inset-0 z-40 cursor-default"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        />
      )}
    </>
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
