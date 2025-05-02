// app/(site)/contato/page.tsx
"use client";

import { useState } from "react";
import Layout from '@/components/layout';

type FormState = {
  foco: string;
  nome: string;
  sobrenome: string;
  email: string;
  mensagem: string;
  consent: boolean;
};

const initialForm: FormState = {
  foco: "",
  nome: "",
  sobrenome: "",
  email: "",
  mensagem: "",
  consent: false,
};

export default function ContatoPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch('https://n8n.rasystem.com.br/webhook/715a19a4-819b-4949-85ea-762cee50eff9', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Layout>
      <h1 className="text-[clamp(36px,6vw,48px)] leading-[52px] font-semibold text-brand-purple mb-6">
        Se chegou até aqui, está no ponto certo!
      </h1>
      <p className="text-brand-purple text-[20px] mb-6">
        Deixe abaixo algumas informações e dúvidas que logo retornamos o seu contato.
      </p>

      {/* Container responsivo: coluna no mobile, linha em desktop */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 w-full mx-auto">
        {/* Coluna do formulário + endereço */}
        <div className="flex flex-col w-full lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-3 text-sm text-brand-purple flex flex-col"
          >
            {/* Foco de interesse */}
            <div className="flex flex-col">
              <label htmlFor="foco" className="text-brand-purple font-semibold mb-1">
                Foco de interesse:
              </label>
              <select
                id="foco"
                name="foco"
                value={form.foco}
                onChange={handleChange}
                className="rounded-lg px-3 py-[10px] bg-white border-0 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="servicos">Serviços</option>
                <option value="orçamento">Solicitar orçamento</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            {/* Nome */}
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              className="w-full rounded-lg px-3 py-[10px] bg-white border-0 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              required
              value={form.nome}
              onChange={handleChange}
            />

            {/* Sobrenome */}
            <input
              type="text"
              name="sobrenome"
              placeholder="Sobrenome"
              className="w-full rounded-lg px-3 py-[10px] bg-white border-0 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              required
              value={form.sobrenome}
              onChange={handleChange}
            />

            {/* E-mail */}
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="w-full rounded-lg px-3 py-[10px] bg-white border-0 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              required
              value={form.email}
              onChange={handleChange}
            />

            {/* Mensagem */}
            <textarea
              name="mensagem"
              placeholder="Deixe sua mensagem"
              className="w-full rounded-lg px-3 py-[10px] bg-white border-0 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-brand-purple"
              required
              value={form.mensagem}
              onChange={handleChange}
            />

            {/* Consentimento */}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="h-4 w-4 text-brand-purple border-brand-400 rounded focus:ring-brand-purple"
                required
              />
              <label htmlFor="consent" className="text-[14px] leading-[16px] text-brand-purple">
                Consentir em receber comunicações da agência está de acordo com nossa Política de Privacidade.
              </label>
            </div>

            {/* Botão de envio */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-[100px] bg-brand-purple text-white font-semibold py-2 rounded-lg mt-2 hover:bg-brand-500 transition disabled:opacity-50"
            >
              {status === "sending" ? "ENVIANDO..." : "ENVIAR"}
            </button>

            {/* Feedback de status */}
            {status === "error" && (
              <p className="text-red-500 mt-2">Ocorreu um erro. Tente novamente.</p>
            )}
            {status === "success" && (
              <p className="text-green-600 mt-2">Mensagem enviada com sucesso!</p>
            )}
          </form>

          <div className="mt-8 text-[20px] text-brand-purple">
            <p>
              Rua Arquiteto Marcelo Roberto, 32 – Vila Cruzeiro, São Paulo – SP,
              04726-190
            </p>
          </div>
        </div>

        {/* Coluna do mapa */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <div className="w-full h-60 lg:h-full rounded overflow-hidden">
            <iframe
              title="Mapa Google"
              src="https://www.google.com/maps?q=Rua+Arquiteto+Marcelo+Roberto,+32,+Vila+Cruzeiro,+São+Paulo,+SP,+04726-190&output=embed"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
