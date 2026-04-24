<?php
declare(strict_types=1);
require __DIR__ . '/_helpers.php';
$cfg = require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'message' => 'Método não permitido']);
}

if (!empty($_POST['website'] ?? '')) {
    json_response(200, ['ok' => true, 'message' => 'OK']);
}

$produtosValidos = [
    'cloud-computing' => 'Cloud Computing',
    'hospedagem'      => 'Hospedagem de Sites',
    'email'           => 'E-mail Profissional',
    'backup'          => 'Cloud Backup',
];

$produto  = clean((string)($_POST['produto'] ?? ''), 50);
$nome     = clean((string)($_POST['nome'] ?? ''), 100);
$empresa  = clean((string)($_POST['empresa'] ?? ''), 120);
$email    = clean((string)($_POST['email'] ?? ''), 255);
$telefone = clean((string)($_POST['telefone'] ?? ''), 20);

$errors = [];
if (!isset($produtosValidos[$produto])) $errors['produto']  = 'Selecione um produto';
if (strlen($nome) < 2)                  $errors['nome']     = 'Informe seu nome';
if ($empresa === '')                    $errors['empresa']  = 'Informe a empresa';
if (!valid_email($email))               $errors['email']    = 'E-mail inválido';
if (strlen($telefone) < 8)              $errors['telefone'] = 'Telefone inválido';

if ($errors) {
    json_response(422, ['ok' => false, 'message' => 'Verifique os campos.', 'errors' => $errors]);
}

$produtoNome = $produtosValidos[$produto];
$subject = "[Site Inetweb] Cadastro — $produtoNome — $empresa";
$body = "<h2>Novo cadastro pelo Comece Agora</h2>"
      . "<p><strong>Produto:</strong> " . htmlspecialchars($produtoNome) . "</p>"
      . "<p><strong>Nome:</strong> " . htmlspecialchars($nome) . "</p>"
      . "<p><strong>Empresa:</strong> " . htmlspecialchars($empresa) . "</p>"
      . "<p><strong>E-mail:</strong> " . htmlspecialchars($email) . "</p>"
      . "<p><strong>Telefone:</strong> " . htmlspecialchars($telefone) . "</p>";

$ok = send_mail($cfg, $subject, $body, $email, $nome);

if ($ok) {
    json_response(200, ['ok' => true, 'message' => 'Cadastro enviado! Em breve entraremos em contato.']);
}
json_response(500, ['ok' => false, 'message' => 'Não foi possível enviar agora. Tente novamente em instantes.']);
