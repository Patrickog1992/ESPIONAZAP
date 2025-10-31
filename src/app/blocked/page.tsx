
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Phone, CircleDashed, MoreVertical, Search, Archive } from "lucide-react";

const WhatsappIcon = () => (
  <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
    <path d="M90 43.84C90 68.05 69.85 88 45 88C39.1 88 33.55 86.8 28.66 84.7L0 90L5.45 62.45C3.02 57.4 1.7 51.74 1.7 45.84C1.7 21.62 21.85 1.69 46.7 1.69C58.52 1.69 69.1 6.33 76.77 13.73C84.45 21.12 89.42 31.4 90 41.84L90 43.84Z" fill="#40C351"/>
    <path d="M72.82 58.44C71.32 63.87 63.2 67.57 58.75 67.8C56.53 67.92 51.13 68.9 44.13 66.2C34.42 62.62 27.52 54.43 26.65 53.3C25.78 52.18 19.33 43.62 19.33 34.62C19.33 25.62 25.21 20.3 27.43 20.3C29.65 20.3 31.45 20.42 32.32 22.8C33.4 25.62 36.4 34.27 36.73 35.13C37.06 35.98 36.61 37.1 35.41 38.35C34.03 39.8 32.71 40.85 31.84 41.72C31.09 42.47 30.22 43.33 31.3 45.4C32.38 47.47 36.5 54.02 43.5 57.73C49.15 60.67 53.05 60.1 54.91 58.44C56.23 57.24 57.55 55.43 58.87 53.77C59.62 52.8 61.12 51.55 63.22 52.8C65.32 54.05 70.33 56.62 71.95 57.57C73.57 58.52 74.05 59.07 72.82 58.44V58.44Z" fill="white"/>
  </svg>
);

const ContactItem = () => (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b">
        <Avatar>
            <AvatarFallback className="bg-gray-300"></AvatarFallback>
        </Avatar>
        <div className="ml-4 flex-grow">
            <p className="font-semibold text-gray-800">Bloqueado 🔒</p>
            <p className="text-sm text-gray-500">Finalize a Ordem de Serviço</p>
        </div>
    </div>
);

const MessageBubble = ({ content, time, isUser }: { content: string, time: string, isUser: boolean }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`rounded-lg py-2 px-3 max-w-sm ${isUser ? 'bg-[#dcf8c6]' : 'bg-white'}`}>
            <p className="text-sm" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>{content}</p>
            <p className="text-xs text-gray-400 text-right mt-1">{time}</p>
        </div>
    </div>
);


export default function BlockedPage() {
    return (
        <div className="bg-[#eae6df] min-h-screen flex items-center justify-center font-sans">
            <title>Conteúdo Bloqueado 🔒</title>
            <div className="w-full max-w-[1366px] h-screen md:h-[calc(100vh-40px)] flex flex-col md:flex-row shadow-2xl">

                {/* Sidebar */}
                <div className="w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col">
                    <header className="p-3 bg-gray-100 border-b flex items-center justify-between">
                         <Avatar>
                            <AvatarFallback className="bg-gray-400"></AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-4 text-gray-600">
                            <Users className="w-6 h-6 cursor-pointer hover:text-gray-800" />
                            <CircleDashed className="w-6 h-6 cursor-pointer hover:text-gray-800" />
                            <MessageSquare className="w-6 h-6 cursor-pointer hover:text-gray-800" />
                            <Phone className="w-6 h-6 cursor-pointer hover:text-gray-800" />
                            <MoreVertical className="w-6 h-6 cursor-pointer hover:text-gray-800" />
                        </div>
                    </header>
                    <div className="p-3 bg-gray-50 border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="text" placeholder="Pesquisar ou começar uma nova conversa" className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-gray-200 focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b text-gray-700">
                            <Archive className="w-5 h-5 mr-4" />
                            <span>Arquivadas</span>
                        </div>
                        {[...Array(5)].map((_, i) => <ContactItem key={i} />)}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="w-full md:w-2/3 bg-[#efeae2] flex flex-col">
                    <header className="p-4 bg-gray-200 flex items-center justify-between border-b border-gray-300">
                      <div className="flex items-center gap-2">
                        <WhatsappIcon />
                        <h2 className="text-lg font-semibold text-gray-700">WhatsApp</h2>
                      </div>
                    </header>

                    <div className="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col justify-center items-center">
                        <div className="w-full">
                           <div className="text-center mb-8">
                                <Button className="bg-[#25D366] hover:bg-[#20b856] text-white font-bold py-4 px-8 rounded-lg text-lg h-auto shadow-lg">
                                    Liberar acesso completo R$ 27,90
                                </Button>
                            </div>
                            
                            <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:30 AM" isUser={false} />
                            <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:32 AM" isUser={true} />
                            <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:35 AM" isUser={false} />
                            <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:36 AM" isUser={true} />
                        </div>
                    </div>
                    
                    <footer className="p-4 bg-gray-100">
                        <div className="text-center text-sm text-gray-500">
                           As mensagens estão criptografadas.
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
