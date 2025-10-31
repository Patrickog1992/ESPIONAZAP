"use client";

import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CurrentDate } from "@/components/current-date";
import { MessageCircleWarning, FileImage, MapPin, Loader2 } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { cn } from "@/lib/utils";

function VturbPlayer() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/82b0f5b7-3ef8-4fad-9a6a-1e700b3d750b/players/6904ff1e6ae4034e48057611/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const loadedScript = document.querySelector(`script[src="${script.src}"]`);
      if (loadedScript) {
        document.head.removeChild(loadedScript);
      }
    };
  }, []);

  return React.createElement("vturb-smartplayer", { id: "vid-6904ff1e6ae4034e48057611", style: { display: 'block', margin: '0 auto', width: '100%', maxWidth: '800px' } });
}


function AnalysisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone") || "Número não informado";

  const [showContent, setShowContent] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadingGif = placeholderImages.find(p => p.id === "loading-gif");
  const sslImage = placeholderImages.find(p => p.id === "ssl-image-2");
  
  const videoButtonTime = (4 * 60 + 13) * 1000;

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setShowContent(true);
    }, videoButtonTime);

    const progressInterval = setInterval(() => {
        setProgress(p => {
            if (p >= 100) {
                clearInterval(progressInterval);
                return 100;
            }
            const newProgress = p + (100 / (videoButtonTime / 100));
            return newProgress;
        })
    }, 100);

    return () => {
      clearTimeout(buttonTimer);
      clearInterval(progressInterval);
    };
  }, [videoButtonTime]);

  const handleAccessClick = () => {
    setIsRedirecting(true);
    setProgress(0); // Reset progress for the redirect loading
  };
  
  useEffect(() => {
    if (isRedirecting) {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 5;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
                router.push('/blocked');
            }
        }, 50);

        return () => clearInterval(interval);
    }
  }, [isRedirecting, router]);

  const resultCards = [
    { value: 21, title: 'Mensagens suspeitas', description: '*Mensagens contendo algum contexto sexual.', icon: MessageCircleWarning },
    { value: 7, title: 'Imagens suspeitas', description: '*Imagens identificadas com conteúdos de nudes.', icon: FileImage },
    { value: 3, title: 'Localizações suspeitas', description: '*Localizações como motel, casa de massagem e pontos de prostituição.', icon: MapPin },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-extrabold text-foreground">
                Essa análise pode durar até 5 minutos...
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
                Assista o video enquanto o número é rastreado e as conversas são processadas
            </p>
            <p className="font-bold mt-2">🔊 Verifique se seu som está ligado</p>

            <div className="my-8 shadow-2xl rounded-lg overflow-hidden bg-black">
                <VturbPlayer />
            </div>
            
            <div className="mt-8 transition-all duration-500">
                {!showContent ? (
                    <div className="space-y-4">
                        {loadingGif && <Image src={loadingGif.imageUrl} alt={loadingGif.description} width={80} height={80} unoptimized className="mx-auto" />}
                        <p className="text-xl font-bold text-primary">{phone}</p>
                        <h2 className="text-2xl font-bold">Fazendo a Investigação</h2>
                        <Progress value={progress} className="w-full max-w-md mx-auto" />
                        <p className="font-semibold text-muted-foreground animate-pulse">AGUARDE... O Whatsapp informado está sendo espionado</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold mb-4">{isRedirecting ? "Redirecionando para as conversas..." : "Analisando Relatórios..."}</h2>
                       <Button size="lg" className={cn("h-16 text-xl font-bold w-full max-w-md mx-auto my-8", !isRedirecting && "animate-pulse-green")} onClick={handleAccessClick} disabled={isRedirecting}>
                          {isRedirecting ? <Loader2 className="animate-spin" /> : "ACESSAR MENSAGENS"}
                      </Button>
                      {isRedirecting && <Progress value={progress} className="w-full max-w-md mx-auto mt-4" />}

                      {!isRedirecting && (
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            {resultCards.map((card, index) => (
                               <Card key={index} className="text-center shadow-lg hover:shadow-primary/20 transition-shadow">
                                   <CardContent className="p-6">
                                       <card.icon className="w-10 h-10 mx-auto text-primary mb-3"/>
                                       <p className="text-5xl font-extrabold text-foreground">{card.value}</p>
                                       <p className="text-lg font-bold mt-2">{card.title}</p>
                                       <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                                   </CardContent>
                               </Card>
                            ))}
                        </div>
                      )}
                    </div>
                )}
            </div>
            
            <section className="max-w-3xl mx-auto mt-16 text-center">
                {sslImage && <Image src={sslImage.imageUrl} alt={sslImage.description} width={200} height={75} className="mx-auto my-6" data-ai-hint={sslImage.imageHint} />}
                <p className="text-muted-foreground italic">*Esta ferramenta 100% anônima*</p>
                <p className="text-muted-foreground font-semibold mt-2">Não responda as mensagens para manter sigilo.</p>
                
                <div className="mt-8">
                    <p className="text-3xl font-extrabold text-primary">95.310</p>
                    <p className="text-muted-foreground font-semibold">Números de Whatsapp Clonados</p>
                </div>
            </section>
        </div>
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

export default function AnalysisPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-12 h-12 animate-spin text-primary"/></div>}>
            <AnalysisContent />
        </Suspense>
    )
}
