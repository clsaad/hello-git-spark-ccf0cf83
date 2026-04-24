// Ano dinâmico no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Validação básica + envio AJAX para PHP
function showError(form, name, msg) {
  const err = form.querySelector(`.error[data-for="${name}"]`);
  const input = form.querySelector(`[name="${name}"]`);
  if (err) err.textContent = msg || "";
  if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
}

function validateContact(form) {
  let ok = true;
  const data = Object.fromEntries(new FormData(form).entries());
  ["nome", "telefone", "empresa", "email", "mensagem"].forEach((f) => showError(form, f, ""));

  if (!data.nome || data.nome.trim().length < 2) { showError(form, "nome", "Informe seu nome"); ok = false; }
  if (!data.telefone || data.telefone.trim().length < 8) { showError(form, "telefone", "Telefone inválido"); ok = false; }
  if (!data.empresa || !data.empresa.trim()) { showError(form, "empresa", "Informe a empresa"); ok = false; }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showError(form, "email", "E-mail inválido"); ok = false; }
  if (!data.mensagem || data.mensagem.trim().length < 5) { showError(form, "mensagem", "Escreva uma mensagem"); ok = false; }
  return ok;
}

function validateSignup(form) {
  let ok = true;
  const data = Object.fromEntries(new FormData(form).entries());
  ["produto", "nome", "empresa", "email", "telefone"].forEach((f) => showError(form, f, ""));

  if (!data.produto) { showError(form, "produto", "Selecione um produto"); ok = false; }
  if (!data.nome || data.nome.trim().length < 2) { showError(form, "nome", "Informe seu nome"); ok = false; }
  if (!data.empresa || !data.empresa.trim()) { showError(form, "empresa", "Informe a empresa"); ok = false; }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showError(form, "email", "E-mail inválido"); ok = false; }
  if (!data.telefone || data.telefone.trim().length < 8) { showError(form, "telefone", "Telefone inválido"); ok = false; }
  return ok;
}

async function submitForm(form, validator) {
  const status = form.querySelector("#form-status");
  if (status) { status.textContent = ""; status.style.color = ""; }
  if (!validator(form)) return;

  const btn = form.querySelector('button[type="submit"]');
  if (btn) { btn.disabled = true; btn.dataset._t = btn.textContent; btn.textContent = "Enviando..."; }

  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(form),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.ok) {
      form.reset();
      if (status) { status.textContent = json.message || "Mensagem enviada com sucesso!"; status.style.color = "hsl(142 70% 35%)"; }
    } else {
      if (status) { status.textContent = (json && json.message) || "Falha ao enviar. Tente novamente."; status.style.color = "hsl(0 84% 50%)"; }
    }
  } catch (e) {
    if (status) { status.textContent = "Erro de conexão. Tente novamente."; status.style.color = "hsl(0 84% 50%)"; }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = btn.dataset._t || "Enviar"; }
  }
}

const contactForm = document.getElementById("contact-form");
if (contactForm) contactForm.addEventListener("submit", (e) => { e.preventDefault(); submitForm(contactForm, validateContact); });

const signupForm = document.getElementById("signup-form");
if (signupForm) signupForm.addEventListener("submit", (e) => { e.preventDefault(); submitForm(signupForm, validateSignup); });
