<?php
declare(strict_types=1);
require __DIR__ . '/_helpers.php';
$cfg = require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'message' => 'Método não permitido']);
}

// Honeypot
if (!empty($_POST['website'] ?? '')) {
    json_response(200, ['ok' => true, 'message' => 'OK']);
}

$nome     = clean((string)($_POST['nome'] ?? ''), 100);
$telefone = clean((string)($_POST['telefone'] ?? ''), 20);
$empresa  = clean((string)($_POST['empresa'] ?? ''), 120);
$email    = clean((string)($_POST['email'] ?? ''), 255);
$mensagem = clean((string)($_POST['mensagem'] ?? ''), 2000);

$errors = [];
if (strlen($nome) < 2)        $errors['nome']     = 'Informe seu nome';
if (strlen($telefone) < 8)    $errors['telefone'] = 'Telefone inválido';
if ($empresa === '')          $errors['empresa']  = 'Informe a empresa';
if (!valid_email($email))     $errors['email']    = 'E-mail inválido';
if (strlen($mensagem) < 5)    $errors['mensagem'] = 'Escreva uma mensagem';

if ($errors) {
    json_response(422, ['ok' => false, 'message' => 'Verifique os campos.', 'errors' => $errors]);
}

$subject = "[Site Inetweb] Contato de $nome ($empresa)";
$body = "<h2>Novo contato pelo site</h2>"
      . "<p><strong>Nome:</strong> " . htmlspecialchars($nome) . "</p>"
      . "<p><strong>Empresa:</strong> " . htmlspecialchars($empresa) . "</p>"
      . "<p><strong>E-mail:</strong> " . htmlspecialchars($email) . "</p>"
      . "<p><strong>Telefone:</strong> " . htmlspecialchars($telefone) . "</p>"
      . "<p><strong>Mensagem:</strong><br>" . nl2br(htmlspecialchars($mensagem)) . "</p>";

$ok = send_mail($cfg, $subject, $body, $email, $nome);

if ($ok) {
    json_response(200, ['ok' => true, 'message' => 'Mensagem enviada com sucesso! Em breve entraremos em contato.']);
}
json_response(500, ['ok' => false, 'message' => 'Não foi possível enviar agora. Tente novamente em instantes.']);
