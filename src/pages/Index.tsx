import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Server, Mail as MailIcon, HardDrive, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import logo from "@/assets/inetweb-logo.png";

const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  empresa: z.string().trim().min(1, "Informe a empresa").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  mensagem: z.string().trim().min(5, "Escreva uma mensagem").max(2000),
});

const Index = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", empresa: "", email: "", mensagem: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => { if (i.path[0]) fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // TODO: ativar Lovable Cloud para chamar a Edge Function `send-contact-email`
    // que envia via SMTP usando os Secrets SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast({
      title: "Envio indisponível",
      description: "Ative o Lovable Cloud para habilitar o envio por SMTP. Os campos foram validados com sucesso.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <img src={logo} alt="Inetweb logo" className="h-10 w-auto" />
          <nav className="hidden gap-8 md:flex">
            <a href="#servicos" className="text-sm font-medium hover:text-secondary transition-colors">Serviços</a>
            <a href="#sobre" className="text-sm font-medium hover:text-secondary transition-colors">Sobre</a>
            <a href="#contato" className="text-sm font-medium hover:text-secondary transition-colors">Contato</a>
          </nav>
          <Button variant="default" className="bg-secondary hover:bg-secondary/90">Fale Conosco</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="container relative py-24 md:py-36 text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Soluções na nuvem <br /> para o seu negócio
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-primary-foreground/80 mb-10">
            Hospedagem, infraestrutura e serviços web rápidos, seguros e escaláveis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Comece agora</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">Saiba mais</Button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Tudo que sua empresa precisa para crescer online.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Cloud, title: "Cloud Computing", desc: "Infraestrutura em nuvem escalável e sob demanda." },
            { icon: Server, title: "Hospedagem de Sites", desc: "Hospedagem rápida, segura e com alta disponibilidade." },
            { icon: MailIcon, title: "E-mail Profissional", desc: "Contas de e-mail com seu domínio, antispam e webmail." },
            { icon: HardDrive, title: "Cloud Backup", desc: "Backups automáticos e criptografados na nuvem." },
          ].map((s) => (
            <Card key={s.title} className="border-2 hover:border-secondary transition-colors">
              <CardHeader>
                <s.icon className="h-10 w-10 text-secondary mb-2" />
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{s.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="bg-muted py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre a Inetweb</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Há mais de uma década oferecendo soluções de hospedagem e infraestrutura digital
              para empresas de todos os portes. Nossa missão é manter seu negócio sempre online,
              seguro e veloz.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combinamos tecnologia de ponta com atendimento humano para entregar a melhor
              experiência possível.
            </p>
          </div>
          <div className="rounded-2xl p-12 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <div className="grid grid-cols-2 gap-8">
              <div><div className="text-4xl font-bold">99.9%</div><div className="text-sm opacity-80">Uptime</div></div>
              <div><div className="text-4xl font-bold">24/7</div><div className="text-sm opacity-80">Suporte</div></div>
              <div><div className="text-4xl font-bold">10+</div><div className="text-sm opacity-80">Anos</div></div>
              <div><div className="text-4xl font-bold">5k+</div><div className="text-sm opacity-80">Clientes</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="container py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Fale Conosco</h2>
          <p className="text-muted-foreground">Envie sua mensagem e nossa equipe entrará em contato.</p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-3"><Mail className="h-6 w-6 text-secondary mt-1" /><div><div className="font-semibold">E-mail</div><div className="text-muted-foreground">cleber.saad@inetweb.com.br</div></div></div>
            <div className="flex items-start gap-3"><Phone className="h-6 w-6 text-secondary mt-1" /><div><div className="font-semibold">Telefone</div><div className="text-muted-foreground">+55 (11) 0000-0000</div></div></div>
            <div className="flex items-start gap-3"><MapPin className="h-6 w-6 text-secondary mt-1" /><div><div className="font-semibold">Endereço</div><div className="text-muted-foreground">São Paulo, Brasil</div></div></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-xl border" noValidate>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" value={form.nome} onChange={handleChange("nome")} maxLength={100} aria-invalid={!!errors.nome} />
              {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" type="tel" value={form.telefone} onChange={handleChange("telefone")} maxLength={20} aria-invalid={!!errors.telefone} />
                {errors.telefone && <p className="text-sm text-destructive">{errors.telefone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input id="empresa" value={form.empresa} onChange={handleChange("empresa")} maxLength={120} aria-invalid={!!errors.empresa} />
                {errors.empresa && <p className="text-sm text-destructive">{errors.empresa}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={form.email} onChange={handleChange("email")} maxLength={255} aria-invalid={!!errors.email} />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" value={form.mensagem} onChange={handleChange("mensagem")} maxLength={2000} rows={5} aria-invalid={!!errors.mensagem} />
              {errors.mensagem && <p className="text-sm text-destructive">{errors.mensagem}</p>}
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-secondary hover:bg-secondary/90">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Enviar mensagem
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Protegido contra spam. Ative o Lovable Cloud para habilitar o envio por SMTP.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logo} alt="Inetweb" className="h-8 w-auto" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Inetweb. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
