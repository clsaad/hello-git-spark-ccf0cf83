# Inetweb — Versão HTML/CSS/JS + PHP

Versão estática do site para hospedagem tradicional (cPanel/Apache/Nginx com PHP).
A versão React continua intacta na raiz do projeto.

## Estrutura

```
html-version/
├── index.html              # Página principal
├── comece-agora.html       # Página de cadastro com seleção de produto
├── assets/
│   ├── styles.css          # Design system (HSL) idêntico ao React
│   ├── script.js           # Validação e envio AJAX dos formulários
│   └── inetweb-logo.png
├── api/
│   ├── config.php          # ⚙️ Credenciais SMTP (editar antes de publicar)
│   ├── _helpers.php        # Validação + envio (PHPMailer ou mail())
│   ├── send-contact.php    # Endpoint do formulário "Fale Conosco"
│   └── signup.php          # Endpoint do "Comece agora"
├── .htaccess
└── README.md
```

## Publicar na hospedagem

1. Faça upload da pasta `html-version/` (ou apenas seu conteúdo) para a raiz pública (`public_html`, `www`, etc.).
2. Edite `api/config.php` com seu SMTP da Inetweb:
   - `smtp_host`, `smtp_port`, `smtp_user`, `smtp_pass`, `smtp_secure` (`tls` ou `ssl`)
   - `to_email` já está como `cleber.saad@inetweb.com.br`.
3. (Recomendado) Instale PHPMailer para envio SMTP autenticado:
   ```bash
   cd html-version
   composer require phpmailer/phpmailer
   ```
   O sistema detecta `vendor/autoload.php` automaticamente. Sem PHPMailer ele usa `mail()` (sem autenticação SMTP).
4. Acesse `https://seudominio.com/index.html` para testar.

## Variáveis de ambiente (alternativa ao config.php)

Se preferir, defina no servidor:
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`,
`SMTP_FROM`, `SMTP_FROM_NAME`, `MAIL_TO`.

## Testar localmente

```bash
cd html-version
php -S localhost:8000
```
Abra `http://localhost:8000`.

## Segurança

- Honeypot (`name="website"`) bloqueia bots simples.
- Validação no client e no server.
- `.htaccess` bloqueia listagem de diretório e leitura do `config.php`.
- Para produção, considere também adicionar reCAPTCHA v3 ou hCaptcha.
