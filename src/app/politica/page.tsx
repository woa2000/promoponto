import Layout from '@/components/layout'

export default function Politica() {
    return (
        <Layout>
            <h1 className="text-3xl font-semibold mb-6">Política de Privacidade</h1>
            <p className="mb-4">
                Sua privacidade é importante para nós. Esta página descreve como coletamos, usamos e protegemos suas informações ao utilizar nosso site.
            </p>
            <h2 className="text-xl font-semibold mb-2">Coleta de Informações</h2>
            <p className="mb-4">
                Podemos coletar informações pessoais, como nome e e-mail, quando você entra em contato conosco ou utiliza nossos serviços.
            </p>
            <h2 className="text-xl font-semibold mb-2">Uso das Informações</h2>
            <p className="mb-4">
                Utilizamos suas informações apenas para melhorar nossos serviços e comunicação. Não compartilhamos seus dados com terceiros sem sua autorização.
            </p>
            <h2 className="text-xl font-semibold mb-2">Segurança</h2>
            <p className="mb-4">
                Adotamos medidas de segurança para proteger suas informações contra acesso não autorizado.
            </p>
            <p>
                Em caso de dúvidas sobre nossa política de privacidade, entre em contato conosco.
            </p>
        </Layout>
    )
}