# 📱 DizzAí! iOS - Guia Completo para GitHub

## 🎯 Objetivo

Este guia mostra **passo a passo** como colocar o app DizzAí! (Expo + React Native) no GitHub e configurar builds automáticos.

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Passo 1: Criar Repositório no GitHub](#passo-1-criar-repositório-no-github)
3. [Passo 2: Clonar e Preparar Localmente](#passo-2-clonar-e-preparar-localmente)
4. [Passo 3: Fazer Push do Código](#passo-3-fazer-push-do-código)
5. [Passo 4: Configurar GitHub Actions](#passo-4-configurar-github-actions)
6. [Passo 5: Testar o Build Automático](#passo-5-testar-o-build-automático)
7. [Passo 6: Publicar na App Store](#passo-6-publicar-na-app-store)

---

## 🔧 Pré-requisitos

Antes de começar, você precisa ter:

- ✅ Conta no GitHub (gratuita em https://github.com)
- ✅ Git instalado no seu computador
- ✅ Node.js 18+ instalado
- ✅ Npm ou Yarn instalado

**Verificar se tudo está instalado:**

```bash
node --version
npm --version
git --version
```

Se algum comando não funcionar, instale em: https://nodejs.org

---

## Passo 1: Criar Repositório no GitHub

### 1.1 Acessar GitHub

1. Abra https://github.com
2. Clique em **"Sign in"** (canto superior direito)
3. Digite seu email e senha
4. Clique em **"Sign in"**

### 1.2 Criar Novo Repositório

1. Clique no **ícone de perfil** (canto superior direito)
2. Clique em **"Your repositories"**
3. Clique no botão verde **"New"**

### 1.3 Configurar Repositório

Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Repository name** | `dizzai-app-ios` |
| **Description** | `App iOS do DizzAí! - Saiba como está o lugar AGORA` |
| **Public/Private** | Selecione **Public** |
| **Initialize with README** | Deixe desmarcado |

4. Clique em **"Create repository"**

### 1.4 Copiar URL do Repositório

Você verá uma página com a URL do repositório. Copie a URL que aparece (será algo como `https://github.com/seu-usuario/dizzai-app-ios.git`).

---

## Passo 2: Clonar e Preparar Localmente

### 2.1 Abrir Terminal/Prompt

- **Windows:** Pressione `Win + R`, digite `cmd` e pressione Enter
- **Mac:** Pressione `Cmd + Space`, digite `Terminal` e pressione Enter
- **Linux:** Abra o terminal (Ctrl + Alt + T)

### 2.2 Navegar para a Pasta

```bash
cd Desktop
```

### 2.3 Clonar o Repositório

Cole a URL que você copiou:

```bash
git clone https://github.com/seu-usuario/dizzai-app-ios.git
cd dizzai-app-ios
```

### 2.4 Copiar Arquivos do Projeto

Copie todos os arquivos do projeto Expo para esta pasta:

```bash
# No seu computador, copie os arquivos:
# - App.tsx
# - package.json
# - app.json
# - .gitignore
# - etc.

# Ou use este comando (se estiver no diretório do projeto):
cp -r /home/ubuntu/dizzai-app-ios/* .
```

### 2.5 Instalar Dependências

```bash
npm install
```

---

## Passo 3: Fazer Push do Código

### 3.1 Configurar Git (primeira vez apenas)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"
```

### 3.2 Adicionar Arquivos

```bash
git add .
```

### 3.3 Fazer Commit

```bash
git commit -m "Inicial: DizzAí iOS com Expo"
```

### 3.4 Fazer Push

```bash
git push origin main
```

Se pedir senha, use seu token do GitHub (veja como gerar abaixo).

### 3.5 Gerar Token do GitHub (se necessário)

1. Vá para https://github.com/settings/tokens
2. Clique em **"Generate new token"**
3. Dê um nome (ex: `dizzai-token`)
4. Marque as opções:
   - ✅ `repo` (acesso completo a repositórios)
   - ✅ `workflow` (para GitHub Actions)
5. Clique em **"Generate token"**
6. **Copie o token** (você não verá novamente!)
7. Use este token como senha quando o Git pedir

---

## Passo 4: Configurar GitHub Actions

### 4.1 Criar Pasta de Workflows

No seu repositório local, crie a pasta:

```bash
mkdir -p .github/workflows
```

### 4.2 Criar Arquivo de Build

Crie um arquivo chamado `.github/workflows/build.yml`:

```yaml
name: Build and Release Expo App

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NODE_OPTIONS: "--max-old-space-size=4096"

    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: Setup Node
        uses: actions/setup-node@v5
        with:
          node-version: 24

      - name: Install dependencies
        run: npm install

      - name: Install Expo CLI
        run: npm install -g expo-cli

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v1.0.0-${{ github.run_number }}
          name: DizzAí iOS v1.0.0 Build ${{ github.run_number }}
          body: |
            🚀 DizzAí iOS - App Inovador de Informação em Tempo Real
            
            Build automático criado com sucesso!
          draft: false
          prerelease: false
```

### 4.3 Fazer Push do Workflow

```bash
git add .github/workflows/build.yml
git commit -m "Add GitHub Actions workflow"
git push origin main
```

---

## Passo 5: Testar o Build Automático

### 5.1 Acessar GitHub Actions

1. Vá para seu repositório no GitHub
2. Clique na aba **"Actions"**
3. Você verá o workflow sendo executado

### 5.2 Acompanhar o Build

1. Clique no workflow em execução
2. Você verá os passos sendo executados
3. Espere até terminar (deve levar 2-5 minutos)

### 5.3 Verificar Resultado

Se tudo correu bem, você verá:
- ✅ Todos os passos com checkmark verde
- ✅ Uma release criada automaticamente

Se houver erro (❌), clique no passo com erro para ver o log.

---

## Passo 6: Publicar na App Store

### 6.1 Pré-requisitos

- ✅ Mac com Xcode instalado
- ✅ Conta de desenvolvedor Apple ($99/ano)
- ✅ Certificados e provisioning profiles

### 6.2 Fazer Build para iOS

No seu computador (Mac):

```bash
npx expo build:ios
```

Siga as instruções na tela.

### 6.3 Enviar para App Store

Use o Xcode ou o Transporter:

1. Baixe o arquivo `.ipa` gerado
2. Abra o Transporter (App Store Connect)
3. Faça login com sua conta Apple
4. Arraste o arquivo `.ipa`
5. Clique em **"Deliver"**

### 6.4 Revisar no App Store Connect

1. Vá para https://appstoreconnect.apple.com
2. Faça login com sua conta Apple
3. Clique em **"My Apps"**
4. Selecione seu app
5. Preencha as informações (descrição, screenshots, etc.)
6. Clique em **"Submit for Review"**

A Apple levará 24-48 horas para revisar seu app.

---

## 📚 Estrutura do Projeto

```
dizzai-app-ios/
├── .github/
│   └── workflows/
│       └── build.yml          ← Build automático
├── App.tsx                    ← App principal
├── app.json                   ← Configuração Expo
├── package.json               ← Dependências
├── tsconfig.json              ← TypeScript config
├── .gitignore                 ← Arquivos ignorados
└── README.md                  ← Documentação
```

---

## 🐛 Solução de Problemas

### Erro: "git: command not found"

**Solução:** Instale Git em https://git-scm.com

### Erro: "npm: command not found"

**Solução:** Instale Node.js em https://nodejs.org

### Erro: "Authentication failed"

**Solução:** Use um token do GitHub em vez de senha (veja Passo 3.5)

### Build falha no GitHub Actions

**Solução:** Clique no workflow com erro e veja o log para identificar o problema

### App não funciona no iPhone

**Solução:** Certifique-se de que:
- ✅ Xcode está instalado
- ✅ Certificados Apple estão configurados
- ✅ Provisioning profiles estão corretos

---

## 🚀 Próximos Passos

1. **Adicionar mais lugares** - Edite `App.tsx` e adicione os 65 lugares do DF
2. **Conectar com API** - Integre com a API tRPC do backend
3. **Adicionar autenticação** - Implemente login com Manus OAuth
4. **Publicar na App Store** - Siga o Passo 6

---

## 📞 Suporte

Se tiver dúvidas:

1. Verifique a documentação oficial: https://docs.expo.dev
2. Consulte a comunidade: https://forums.expo.dev
3. Abra uma issue no GitHub

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja `LICENSE` para mais detalhes.

---

**DizzAí! - Saiba como está o lugar AGORA! 🚀**
