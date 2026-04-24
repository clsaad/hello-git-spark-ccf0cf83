import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Server, Mail as MailIcon, HardDrive, ArrowLeft, Check } from "lucide-react";
import logo from "@/assets/inetweb-logo.png";

const PRODUCTS = [
  { id: "cloud-computing", title: "Cloud Computing", desc: "Infraestrutura em nuvem escalável e sob demanda.", icon: Cloud },
  { id: "hospedagem", title: "Hospedagem de Sites", desc: "Hospedagem rápida, segura e com alta disponibilidade.", icon: Server },
  { id: "email", title: "E-mail Profissional", desc: "Contas de e-mail com seu domínio, antispam e webmail.", icon: MailIcon },
  { id: "backup", title: "Cloud Backup", desc: "Backups automáticos e criptografados na nuvem.", icon: HardDrive },
];

const schema = z.object({
  produto: z.string().min(1, "Selecione um produto"),
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  empresa: z.string().trim().min(1, "Informe a empresa").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
});

const ComeceAgora = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<string>("");
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", telefone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ produto, ...form });
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.issues.forEach((i) => { if (i.path[0]) fe[i.path[0] as string] = i.message; });
      setErrors(fe);
      return;
    }
    setErrors({});
    toast({ title: "Cadastro recebido!", description: "Em breve nossa equipe entrará em contato." });
    setForm({ nome: "", empresa: "", email: "", telefone: "" });
    setProduto("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <Link to="/"><img src={logo} alt="Inetweb" className="h-10 w-auto" /></Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/"><ArrowLeft className="h-4 w-4" /> Voltar</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="container py-16 md:py-20 text-center text-primary-foreground">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Comece agora</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Escolha um dos nossos produtos e preencha seus dados. Entraremos em contato.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-12" noValidate>
          <div>
            <h2 className="text-2xl font-bold mb-2">1. Selecione o produto</h2>
            <p className="text-muted-foreground mb-6">Escolha qual solução você quer contratar.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {PRODUCTS.map((p) => {
                const selected = produto === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setProduto(p.id)}
                    className={`text-left transition-all ${selected ? "ring-2 ring-secondary" : ""}`}
                  >
                    <Card className={`h-full border-2 ${selected ? "border-secondary bg-secondary/5" : "hover:border-secondary/50"}`}>
                      <CardContent className="p-6 flex items-start gap-4">
                        <p.icon className="h-8 w-8 text-secondary shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold">{p.title}</h3>
                            {selected && <Check className="h-5 w-5 text-secondary" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                );
              })}
            </div>
            {errors.produto && <p className="text-sm text-destructive mt-2">{errors.produto}</p>}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">2. Seus dados</h2>
            <p className="text-muted-foreground mb-6">Preencha o formulário para concluir.</p>
            <div className="grid gap-4 md:grid-cols-2 bg-card p-6 rounded-xl border">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={form.nome} onChange={onChange("nome")} maxLength={100} aria-invalid={!!errors.nome} />
                {errors.nome && <p className="text-sm text-destructive">{errors.nome}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input id="empresa" value={form.empresa} onChange={onChange("empresa")} maxLength={120} aria-invalid={!!errors.empresa} />
                {errors.empresa && <p className="text-sm text-destructive">{errors.empresa}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={form.email} onChange={onChange("email")} maxLength={255} aria-invalid={!!errors.email} />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" type="tel" value={form.telefone} onChange={onChange("telefone")} maxLength={20} aria-invalid={!!errors.telefone} />
                {errors.telefone && <p className="text-sm text-destructive">{errors.telefone}</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancelar</Button>
            <Button type="submit" size="lg" className="bg-secondary hover:bg-secondary/90">Enviar cadastro</Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ComeceAgora;
