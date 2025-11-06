import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { prisma } from './prisma';

const conexaoEmail = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY!,
    })
);

const retornaEmailUsuarios = async () => {

    const usuarios = await prisma.usuario.findMany()

    return usuarios.map(usuario => {
        return {
            usuario: usuario.nome,
            email: usuario.email
        }
    });

};

const executaNotificacaoMudancaDominio = async (novoDominio: string) => {

    try {
        const listaEmails = await retornaEmailUsuarios();

        listaEmails.forEach(async item => {
            console.log(`Enviando email para: ${item.usuario} - ${item.email}`);

            await conexaoEmail.sendMail({
                from: "designacoesnvmc <suporte@designacoesreuniao.com.br",
                to: item.email,
                subject: "Mudança de domínio do site designacoesnvmc",
                html: `
                    <p>Olá ${item.usuario},</p>
                    <p>É um prazer ter você como usuário do projeto!</p>
                    <p>A fim de manter o projeto no ar, foi necessário fazer uma mudança no domínio para acesso a plataforma.</p>
                    <p>Antes o projeto estava disponível através do site: https://designacoesnvmc.site.</p>
                    <p>Informamos que a partir de agora o acesso deve ser realizado via: <a href="${novoDominio}" ><strong>${novoDominio}</strong></a></p>
                    <p>Por favor, atualize seus favoritos e links para refletir essa mudança.</p>
                    <p>Se você tiver alguma dúvida ou encontrar algum problema, não hesite em entrar em contato conosco.</p>
                    <p>Aproveitamos a oportunidade para o incentivar a relatar erros ou sugerir melhorias para o projeto, sua opinião é muito importante!</p>
                    <p>Atenciosamente,</p>
                    <p>Equipe designacoesreuniao</p>
                `,
            }).then(() => {
                console.log(`Email enviado para: ${item.usuario} - ${item.email}`);
            }).catch(erro => {
                console.error(`Erro ao enviar email para: ${item.usuario} - ${item.email}`);
                console.error(erro);
            });
        });
    } catch (error) {
        console.error('Erro ao executar notificação de mudança de domínio:', error);
    }

}

executaNotificacaoMudancaDominio("https://designacoesreuniao.com.br");