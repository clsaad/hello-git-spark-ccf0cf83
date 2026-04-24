# Inetweb — Site Institucional

Projeto criado no Lovable (React 18 + Vite 5 + Tailwind CSS + TypeScript).

---

## 🚀 Exportação para o GitHub

O Lovable mantém **sincronização bidirecional** com o GitHub: tudo que você edita no Lovable é enviado automaticamente para o repositório, e qualquer push feito no GitHub volta para o Lovable em tempo real.

### Passo a passo

1. **Abra o painel de conectores**
   - Desktop: barra lateral → **Connectors** (nível raiz)
   - Mobile: menu **…** (canto inferior direito) → **Connectors**

2. **Selecione GitHub → Connect project**

3. **Autorize o Lovable GitHub App** na conta ou organização desejada.
   > ⚠️ Apenas **uma conta GitHub** pode estar vinculada à sua conta Lovable por vez.

4. **Escolha a conta/organização** onde o repositório será criado.

5. Clique em **Create Repository**. O Lovable cria o repositório e faz o push inicial automaticamente.

6. (Opcional) Para baixar o código localmente:
   ```bash
   git clone https://github.com/<sua-conta>/<seu-repo>.git
   cd <seu-repo>
   ```

> ℹ️ O Lovable **ainda não suporta importar** repositórios já existentes do GitHub. O fluxo é sempre: Lovable → GitHub.

---

## 🔐 Variáveis de ambiente e credenciais

Este projeto atual é **100% frontend estático** (landing page). **Nenhuma chave secreta é necessária** para rodar ou publicar.

### O que NÃO precisa configurar agora

- ❌ Banco de dados
- ❌ Chaves de API
- ❌ Variáveis `.env`
- ❌ Secrets do GitHub Actions

### O que você precisará configurar **somente se** adicionar backend no futuro

| Quando adicionar… | Onde configurar | Como acessar no código |
|---|---|---|
| Lovable Cloud (DB, Auth, Storage, Functions) | Ativado pelo Lovable automaticamente | Auto-injetado |
| Chaves privadas (Stripe, Resend, OpenAI, etc.) | Lovable → **Cloud → Secrets** | `Deno.env.get('NOME_DA_KEY')` em edge functions |
| Chaves públicas (publishable keys) | `.env` local com prefixo `VITE_` | `import.meta.env.VITE_NOME` |
| Deploy fora do Lovable (Vercel/Netlify) | Painel do provedor de hospedagem | Conforme runtime escolhido |

> 🔒 **Nunca** coloque chaves privadas no código-fonte versionado. Use `Cloud → Secrets` no Lovable.

---

## 🧪 Testando o build localmente antes do push

Embora o Lovable já valide o build na nuvem, é uma boa prática rodar localmente antes de mexer no código via GitHub.

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- `npm`, `bun` ou `pnpm`

### Comandos

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento (HMR em http://localhost:8080)
npm run dev

# 3. Validar TypeScript + build de produção
npm run build

# 4. Testar a build de produção localmente
npm run preview

# 5. Lint (opcional, mas recomendado)
npm run lint

# 6. Rodar testes unitários (Vitest)
npm test
```

### Checklist antes de fazer push

- [ ] `npm run build` finaliza **sem erros**
- [ ] `npm run preview` carrega a página corretamente em `http://localhost:4173`
- [ ] `npm run lint` não retorna erros
- [ ] `npm test` passa
- [ ] Nenhum arquivo `.env*` com segredos foi commitado (já está no `.gitignore`)

Se todos os itens acima passarem, é seguro fazer:

```bash
git add .
git commit -m "feat: descrição da mudança"
git push origin main
```

O Lovable detecta o push em segundos e atualiza o preview automaticamente.

---

## 🌐 Publicação

Frontend (este projeto): clique em **Publish** (canto superior direito) → **Update** para subir mudanças.
Backend (quando houver edge functions): faz deploy **automático e imediato**.

---

## 📚 Links úteis

- [Documentação Lovable](https://docs.lovable.dev/)
- [Integração GitHub](https://docs.lovable.dev/integrations/github)
- [Lovable Cloud](https://docs.lovable.dev/features/cloud)
