# designacoesnvmc.site

Este projeto tem por objetivo facilitar o processo de designações e confirmação dos participantes para uma reunião NVMC. Sua integração com WhatsApp permite notificar no momomento atual ou fazer agendamentos para notificações via número simples ou a partir de um contato.

## ✨ Funcionalidades

*   **Autenticação via OAuth**:
    *   Autenticação segura com Google.
*   **Conexão com WhatsApp**:
    *   Conexão com WhatsApp via QRCode.
    *   Gerenciamento de conexão.
    *   Sincronização de contatos (em desenvolvimento).
*   **Preenchimento de folha de designações**:
    *   Seleção de partes a serem designadas a partir de escolha do usuário por layout e semana inicial.
    *   Recebimento de formulário com partes preenchidas semana a semana.
    *   Inputs para preenchimento de data da reunião e participantes.
    *   Download de arquivo em PDF contendo semanas designadas.
    *   Persistência em banco de dados para designações.
*   **Dashboard de designações**:
    *   Visualização de todas as designações salvas.
    *   Filtro por data ou participante.
    *   Possibilidade de editar partipante.
    *   Exclusão de designações.
*   **Notificação de designações**:
    *   Notificações via WhatsApp.
    *   Opção de notificação em momento atual ou agendamento.
    *   Agendamento permitido apenas em semana anterior.
    *   Notificar via número de telefone ou contato sincronizado.
    *   Validação de telefone.
    *   Reenvio de notificação.

## 🛠️ Tecnologias Utilizadas

*   **Next.js**: Framework baseado em React com foco em performance e otimização para SEO. Utilizado SSR e Route Handlers.
*   **TypeScript**: Superconjunto tipado do JavaScript que oferece segurança de tipo e escalabilidade.
*   **TailwindCSS**: Framework CSS baseado em estilização por classes. Foco em produtividade e padronização.
*   **Prisma**: ORM moderno, tipado e de próxima geração para bancos de dados.
*   **PostgreSQL**: Banco de dados relacional robusto e extensível.
*   **Zod**: Biblioteca de declaração e validação de schema **TypeScript-first**, garantindo segurança de tipo e validação em tempo de execução.
*   **date-fns**: Biblioteca utilitária para manipulação de datas no JavaScript.
*   **Puppeteer**: Biblioteca Node.js para scrapping de dados e automações.
*   **Shadcn.ui**: Biblioteca de componentes React com foco em UI moderna e produtividade ao desenvolvedor. 
*   **Evolution API**: Gateway para envio de mensagens via WhatsApp.
*   **Docker**: Plataforma de containerização para empacotar e isolar o ambiente da aplicação, garantindo portabilidade e consistência.
*   **Docker Compose**: Ferramenta para definir e executar aplicações Docker multi-container, simplificando a orquestração de serviços como a API e o banco de dados.

## ⚙️ Configuração (Variáveis de Ambiente)

Crie um arquivo `.env` na raiz do seu projeto com as seguintes variáveis de ambiente. Preencha-as com suas respectivas credenciais e configurações:

```dotenv
# Configurações do Banco de Dados
# Quando usando Docker Compose, "db" é o nome do serviço do banco de dados
DATABASE_URL="postgresql://user:password@db:5432/database?schema=public"
# Variáveis para o serviço de banco de dados Docker Compose
POSTGRES_USER="user"
POSTGRES_PASSWORD="password"
POSTGRES_DB="database"

# AUTH - GOOGLE PROVIDER
AUTH_SECRET="seu_auth_secret_aqui" # Added by `npx auth`. Read more: https://cli.authjs.dev
AUTH_GOOGLE_ID="seu_auth_google_id_aqui"
AUTH_GOOGLE_SECRET="seu_auth_google_secret_aqui"

# AUTH - CONFIG AUTH.JS
# Configurações de Admin
AUTH_URL=http://localhost:3000
AUTH_REDIRECT_PROXY_URL=http://localhost:3000/api/auth

# EVOLUTION API
EVOLUTION_API_URL=http://localhost:8080
SERVER_URL=http://localhost:8080
# Cors - * for all or set separate by commas -  ex.: 'yourdomain1.com, yourdomain2.com'
CORS_ORIGIN=*
CORS_METHODS=POST,GET,PUT,DELETE
CORS_CREDENTIALS=true
CONFIG_SESSION_PHONE_CLIENT=EvolutionAPI
CONFIG_SESSION_PHONE_NAME=Chrome
QRCODE_LIMIT=20
AUTHENTICATION_TYPE=apikey
AUTHENTICATION_API_KEY=seu_authentication_secret_key_aqui

#ASAAS - Página Apoie-nos
ASAAS_LINK_PAGAMENTO_UNICO="link_pagamento_unico"
ASAAS_LINK_PAGAMENTO_RECORRENTE="link_pagamento_recorrente"
```

## 📦 Instalação

Siga os passos abaixo para configurar e instalar o projeto. **Recomenda-se o uso de Docker para garantir um ambiente consistente.**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-projeto.git
    cd seu-projeto
    ```

## ▶️ Como Rodar

### Com Docker Compose (Recomendado)

Para iniciar todos os serviços (API e Banco de Dados) usando Docker Compose:

#### Modo de Desenvolvimento 

Para rodar a aplicação em modo de desenvolvimento com hot-reloading (ideal para o fluxo de trabalho TypeScript):

```bash
# Inicia os serviços em background
docker compose -f compose.dev.yml up -d
```

#### Modo de Produção

Para construir as imagens e iniciar a aplicação compilada em segundo plano (detached mode):

```bash
docker compose -f compose.prod.yml up --build -d
```
Para parar os serviços:
```bash
docker compose down
```

A API estará disponível em `http://localhost:3000`.

### Sem Docker (Ambiente Local)

Se você não quiser usar Docker e preferir rodar a aplicação diretamente em seu ambiente local (garanta que Node.js e PostgreSQL estejam instalados e configurados manualmente):

1.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
2.  **Configure e migre o banco de dados com Prisma:**
    Certifique-se de que seu banco de dados PostgreSQL esteja rodando e que `DATABASE_URL` no `.env` esteja correto para o seu ambiente local.
    ```bash
    npx prisma migrate dev --name init
    ```
3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev # Este comando deve transpilá-lo e rodar a aplicação (ex: com `ts-node-dev`)
    # ou
    yarn dev
    ```
    Para construir e iniciar em produção:
    ```bash
    npm run build # Compila o TypeScript para JavaScript
    npm start     # Inicia a aplicação a partir dos arquivos JavaScript compilados
    # ou
    yarn build
    yarn start
    ```
