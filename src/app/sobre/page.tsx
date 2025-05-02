// app/(site)/page.tsx
"use client";

import ServiceIcon from "@/components/ui/ServiceIcon";
import Layout from '@/components/layout'

export default function Sobre() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-white text-left px-8 md:px-20 py-10 rounded-t-2xl">
        <div className="w-full">
          <h1 className="text-brand-purple font-bold text-[clamp(36px,6vw,48px)] mb-3">
            No ponto certo.
          </h1>
          <p className="text-brand-purple text-[clamp(22px,3vw,30px)] font-medium">
            O verdadeiro sucesso no trade vem do equilíbrio entre conhecimento,<br />
            criatividade e execução.
          </p>
        </div>
      </section>

      {/* Bloco roxo visual */}
      <section className="bg-brand-400 h-[600px] w-full px-20" />

      {/* Bloco de texto em branco */}
      <section className="bg-white px-8 md:px-20 py-20 text-brand-gray text-lg leading-relaxed rounded-b-2xl">
        <div className="w-full mx-auto grid  lg:grid-cols-2 gap-20 text-brand-purple text-left text-[22px]">
          <div className="flex flex-col gap-6  text-justify">
            <p>
              Um planejamento baseado apenas no conhecimento, sem uma abordagem
              criativa, pode resultar em campanhas que se perdem no mar de
              mensagens do mercado.
            </p>
            <p>
              Uma ideia criativa sem a execução adequada pode não gerar o impacto desejado.
            </p>
            <p>
              Mesmo uma execução impecável, sem um profundo entendimento de mercado e uma abordagem inovadora, pode levar a resultados aquém do esperado.
            </p>
          </div>
          <div className="flex flex-col gap-6 text-justify">
            <p>
              Para alcançar o sucesso no trade é fundamental saber equilibrar
              esses três fatores.
            </p>
            <p>
              Ter o conhecimento das necessidades do trade, ativar de forma
              criativa os canais de execução e refletir objetivos e métricas de
              sucesso para criar pontos inesquecíveis de contato.
            </p>
            <p>
              Quando esses atributos são aplicados no ponto certo, as marcas conseguem não apenas atingir, mas superar suas metas, e conquistar a lealdade de clientes e consumidores, destacando-se no competitivo cenário de vendas.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Serviços */}
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
    </Layout>
  );
}


