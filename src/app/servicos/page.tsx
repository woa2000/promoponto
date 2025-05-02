import Layout from '@/components/layout'

export default function Servicos() {
    return (
        <Layout>
            <h1 className="text-3xl font-semibold mb-6">Nossos Serviços</h1>
            <ul className="list-disc pl-6 space-y-2">
                <li>Gestão de campanhas promocionais</li>
                <li>Consultoria em marketing digital</li>
                <li>Criação de conteúdo e design</li>
                <li>Planejamento estratégico</li>
                <li>Monitoramento de resultados</li>
            </ul>
        </Layout>
    )
}