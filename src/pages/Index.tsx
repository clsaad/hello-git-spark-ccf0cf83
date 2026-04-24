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
            { icon: Cloud, title: "Cloud Hosting", desc: "Servidores em nuvem com alta disponibilidade." },
            { icon: Shield, title: "Segurança", desc: "Proteção SSL, backups e firewall avançado." },
            { icon: Zap, title: "Performance", desc: "Infraestrutura otimizada para máxima velocidade." },
            { icon: Globe, title: "Domínios", desc: "Registro e gerenciamento simplificados." },
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
      <section id="contato" className="container py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Entre em contato</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-2"><Mail className="h-8 w-8 text-secondary" /><span>contato@inetweb.com.br</span></div>
          <div className="flex flex-col items-center gap-2"><Phone className="h-8 w-8 text-secondary" /><span>+55 (11) 0000-0000</span></div>
          <div className="flex flex-col items-center gap-2"><MapPin className="h-8 w-8 text-secondary" /><span>São Paulo, Brasil</span></div>
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
