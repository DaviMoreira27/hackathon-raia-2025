# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

## Estrutura de Diretórios

# 📂 Frontend - Projeto React Router

Este repositório contém a aplicação **frontend** desenvolvida com **React + TypeScript** e o novo sistema de rotas do **React Router v7 (@react-router/dev)**.  
A estrutura segue a organização baseada em arquivos (`file-based routing`).

---

## 📁 Estrutura de Pastas

```bash
frontend/
│
├── app/                     # Código principal da aplicação
│   ├── routes/              # Definições de rotas e componentes de página
│   │   ├── content-manager.css
│   │   ├── ContentBlock.css
│   │   ├── ContentBlock.tsx
│   │   ├── Header.css
│   │   ├── Header.tsx       # Componente de cabeçalho / navegação
│   │   ├── home.tsx         # Página inicial (/)
│   │   ├── Tela2.tsx        # Página Tela 2 (/tela2)
│   │   ├── Tela2.css
│   │   ├── TextContainer.tsx
│   │   ├── TextContainer.css
│   │   ├── VideoContainer.tsx
│   │   ├── VideoContainer.css
│   │   ├── app.css          # Estilos globais
│   │   ├── root.tsx         # Root layout com <Outlet /> e ErrorBoundary
│   │   └── routes.ts        # Configuração inicial das rotas
│   │
│   └── ...
│
├── public/                  # Arquivos estáticos públicos
│
├── package.json             # Dependências e scripts npm
├── react-router.config.ts   # Configurações do React Router
├── tsconfig.json            # Configuração do TypeScript
├── Dockerfile               # Configuração para build e deploy com Docker
├── README.md                # Este arquivo
└── ...

