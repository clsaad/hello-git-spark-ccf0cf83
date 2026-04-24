<?php
/**
 * Configurações de envio de e-mail (SMTP).
 *
 * Edite os valores abaixo OU defina variáveis de ambiente no servidor:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE (tls|ssl|''),
 *   SMTP_FROM, SMTP_FROM_NAME, MAIL_TO
 *
 * Para usar SMTP autenticado recomenda-se instalar PHPMailer:
 *   composer require phpmailer/phpmailer
 * E manter o autoload em ../vendor/autoload.php.
 */

return [
    'smtp_host'      => getenv('SMTP_HOST')      ?: 'smtp.inetweb.com.br',
    'smtp_port'      => (int)(getenv('SMTP_PORT') ?: 587),
    'smtp_user'      => getenv('SMTP_USER')      ?: 'comercial@inetweb.com.br',
    'smtp_pass'      => getenv('SMTP_PASS')      ?: 'COLOQUE_SUA_SENHA',
    'smtp_secure'    => getenv('SMTP_SECURE')    ?: 'tls', // 'tls', 'ssl' ou ''
    'from_email'     => getenv('SMTP_FROM')      ?: 'comercial@inetweb.com.br',
    'from_name'      => getenv('SMTP_FROM_NAME') ?: 'Site Inetweb',
    'to_email'       => getenv('MAIL_TO')        ?: 'cleber.saad@inetweb.com.br',
];
