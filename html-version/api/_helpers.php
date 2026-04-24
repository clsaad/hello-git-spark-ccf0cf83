<?php
function json_response(int $status, array $payload): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function clean(string $v, int $max = 500): string {
    $v = trim($v);
    if (strlen($v) > $max) $v = substr($v, 0, $max);
    return $v;
}

function valid_email(string $v): bool {
    return (bool) filter_var($v, FILTER_VALIDATE_EMAIL);
}

/**
 * Envia e-mail via PHPMailer (se disponível) ou via mail() como fallback.
 */
function send_mail(array $cfg, string $subject, string $bodyHtml, string $replyEmail, string $replyName): bool {
    $autoload = __DIR__ . '/../vendor/autoload.php';
    if (file_exists($autoload)) {
        require_once $autoload;
        if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
            try {
                $mail = new PHPMailer\PHPMailer\PHPMailer(true);
                $mail->isSMTP();
                $mail->Host       = $cfg['smtp_host'];
                $mail->SMTPAuth   = true;
                $mail->Username   = $cfg['smtp_user'];
                $mail->Password   = $cfg['smtp_pass'];
                if (!empty($cfg['smtp_secure'])) {
                    $mail->SMTPSecure = $cfg['smtp_secure'];
                }
                $mail->Port       = $cfg['smtp_port'];
                $mail->CharSet    = 'UTF-8';

                $mail->setFrom($cfg['from_email'], $cfg['from_name']);
                $mail->addAddress($cfg['to_email']);
                if ($replyEmail) {
                    $mail->addReplyTo($replyEmail, $replyName ?: $replyEmail);
                }
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body    = $bodyHtml;
                $mail->AltBody = strip_tags(str_replace(['<br>', '<br/>', '<br />'], "\n", $bodyHtml));
                return $mail->send();
            } catch (Throwable $e) {
                error_log('PHPMailer error: ' . $e->getMessage());
                return false;
            }
        }
    }

    // Fallback usando mail() — não autentica via SMTP.
    $headers   = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = 'From: ' . $cfg['from_name'] . ' <' . $cfg['from_email'] . '>';
    if ($replyEmail) {
        $headers[] = 'Reply-To: ' . ($replyName ?: $replyEmail) . ' <' . $replyEmail . '>';
    }
    return @mail($cfg['to_email'], $subject, $bodyHtml, implode("\r\n", $headers));
}
