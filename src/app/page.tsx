"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Smartphone, ShieldCheck, Wifi, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CurrentDate } from "@/components/current-date";
import { cn } from "@/lib/utils";
import { placeholderImages } from "@/lib/placeholder-images.json";

type StepStatus = "pending" | "processing" | "done";

interface Step {
  text: string;
  status: StepStatus;
  icon: React.ElementType;
}

const initialSteps: Omit<Step, "status">[] = [
  { text: "Conectando ao servidor do WhatsApp...", icon: Server },
  { text: "Simulando IP na sua região.", icon: Wifi },
  { text: "Ignorando o firewall...", icon: ShieldCheck },
  { text: "Injetando consultas SQL...", icon: Smartphone },
  { text: "Buscando informações de {phone}...", icon: Smartphone },
  { text: "Quebrando senha...", icon: Lock },
  { text: "Autenticando como {phone}...", icon: Lock },
  { text: "Acesso concedido, redirecionando...", icon: ShieldCheck },
];

export default function Home() {
  const [phone, setPhone] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [steps, setSteps] = useState<Step[]>(
    initialSteps.map((s) => ({ ...s, status: "pending" }))
  );
  const router = useRouter();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic phone masking
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
    setPhone(value);
  };

  const startSimulation = async () => {
    if (phone.replace(/\D/g, "").length < 10) {
        alert("Por favor, insira um número de telefone válido.");
        return;
    }

    setIsSimulating(true);

    const updatedSteps: Step[] = initialSteps.map(s => ({...s, status: 'pending'}));
    
    for (let i = 0; i < updatedSteps.length; i++) {
        const currentSteps = updatedSteps.map((step, index) => 
            index < i ? {...step, status: 'done'} : (index === i ? {...step, status: 'processing'} : step)
        );
        setSteps(currentSteps.map(s => ({...s, text: s.text.replace('{phone}', phone)})));
        await new Promise(res => setTimeout(res, 1000));
    }

    const finalSteps = updatedSteps.map(s => ({...s, status: 'done', text: s.text.replace('{phone}', phone)}));
    setSteps(finalSteps);
    
    await new Promise(res => setTimeout(res, 500));
    router.push(`/analysis?phone=${encodeURIComponent(phone)}`);
  };

  const mainImage = placeholderImages.find(p => p.id === "main-promo-image");
  const featureImage = placeholderImages.find(p => p.id === "feature-image-1");
  const sslImage = placeholderImages.find(p => p.id === "ssl-image-1");


  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-6xl" role="img" aria-label="detective">
            🕵️
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mt-4">
            Você acabou de ganhar uma INVESTIGAÇÃO GRATUITA
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mt-4">
            Descubra com quem ele(a) anda conversando...
          </p>

          <Card className="mt-6 text-left shadow-lg">
            <CardContent className="p-6">
              <p className="font-semibold text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Acesse fotos, vídeos e até mensagens apagadas e veja onde ele(a)
                está em tempo real. Tudo isso sem deixar rastros. 100%
                invisível.
              </p>
            </CardContent>
          </Card>
          
          {mainImage && (
            <div className="my-8 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={mainImage.imageUrl}
                alt={mainImage.description}
                width={600}
                height={130}
                layout="responsive"
                className="w-full"
                data-ai-hint={mainImage.imageHint}
              />
            </div>
          )}

          <div className="mt-8">
            <label
              htmlFor="phone-input"
              className="block text-lg font-medium text-foreground mb-2"
            >
              Digite abaixo o numero que deseja clonar
            </label>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
              <Input
                id="phone-input"
                type="tel"
                placeholder="(00) 00000-0000"
                className="text-center text-lg h-14 max-w-xs"
                value={phone}
                onChange={handlePhoneChange}
                disabled={isSimulating}
              />
              <Button
                size="lg"
                className="h-14 w-full sm:w-auto text-lg font-bold"
                onClick={startSimulation}
                disabled={isSimulating}
              >
                Acessar WhatsApp
              </Button>
            </div>
          </div>

          {isSimulating && (
            <div className="mt-8 text-left max-w-md mx-auto space-y-2">
                {steps.map((step, index) => step.status !== 'pending' && (
                    <div key={index} className={cn(
                        "flex items-center gap-3 p-2 rounded-md transition-all duration-300",
                        step.status === 'processing' && 'text-destructive',
                        step.status === 'done' && 'text-green-600'
                    )}>
                        <step.icon className={cn("w-5 h-5", {'animate-spin': step.status === 'processing'})}/>
                        <span className="font-medium">{step.text}</span>
                    </div>
                ))}
            </div>
          )}
        </div>
        
        <section className="max-w-3xl mx-auto mt-16 text-center">
            <p className="font-bold text-lg"><ShieldCheck className="inline-block mr-2 text-primary" />Dados protegidos por criptografia.</p>
            {featureImage && <Image src={featureImage.imageUrl} alt={featureImage.description} width={700} height={130} className="mx-auto my-6 rounded-lg shadow-md" data-ai-hint={featureImage.imageHint} />}
            <h2 className="text-2xl font-bold mt-8">Como a ferramenta funciona?</h2>
            <p className="text-muted-foreground mt-2">
                Ela Clona totalmente o celular da pessoa através do número de telefone, você só precisa inseri-lo no campo acima e clonar. Não importa se a pessoa utiliza whatsapp modificado ou mora distante de você, o aplicativo clona TUDO.
            </p>
            <div className="mt-8 space-y-2 font-semibold">
                <p>Aplicativo Oficial Evite cópias</p>
                <p>Funcional em Android, Iphone, Windows e Mac</p>
            </div>
            {sslImage && <Image src={sslImage.imageUrl} alt={sslImage.description} width={200} height={45} className="mx-auto my-6" data-ai-hint={sslImage.imageHint} />}
            <p className="text-3xl font-extrabold text-primary">95.183</p>
            <p className="text-muted-foreground font-semibold">Números de Whatsapp Clonados</p>
        </section>

      </main>
      <footer className="w-full bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>Ferramenta Atualizada: <CurrentDate /></p>
          <p className="mt-2">Políticas de Privacidade e Cookies</p>
          <p>©2024 – Todos os Direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
