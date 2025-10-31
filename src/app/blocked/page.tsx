
"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Phone, CircleDashed, MoreVertical, Search, Archive, Video, PhoneCall } from "lucide-react";

const ContactItem = ({ unreadCount, time, seed }: { unreadCount?: number; time?: string, seed: number }) => (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b">
        <Avatar className="h-12 w-12 bg-gray-300">
           <Image 
                src={`https://picsum.photos/seed/${seed}/48/48`}
                alt="Foto de perfil borrada"
                width={48}
                height={48}
                className="rounded-full filter blur-sm"
            />
        </Avatar>
        <div className="ml-4 flex-grow">
            <p className="font-semibold text-gray-800">Bloqueado 🔒</p>
            <p className="text-sm text-gray-500">Finalize a Ordem de Serviço</p>
        </div>
        {unreadCount && time && (
            <div className="flex flex-col items-end text-xs">
                <p className="text-green-500 font-semibold mb-1">{time}</p>
                <span className="bg-green-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">{unreadCount}</span>
            </div>
        )}
    </div>
);


const MessageBubble = ({ content, time, isUser }: { content: string, time: string, isUser: boolean }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`rounded-lg py-2 px-3 max-w-sm ${isUser ? 'bg-[#dcf8c6]' : 'bg-white'} shadow`}>
            <p className="text-sm" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>{content}</p>
            <p className="text-xs text-gray-400 text-right mt-1">{time}</p>
        </div>
    </div>
);


export default function BlockedPage() {
    
    const contacts = [
        { unreadCount: 2, time: '10:49', seed: 1 },
        { unreadCount: 5, time: '10:45', seed: 2 },
        { seed: 3 },
        { unreadCount: 1, time: 'Ontem', seed: 4 },
        { seed: 5 },
        { seed: 6 },
        { seed: 7 },
    ];

    return (
        <div className="bg-[#eae6df] min-h-screen flex items-center justify-center font-sans">
            <title>Conteúdo Bloqueado 🔒</title>
            <div className="w-full max-w-[1366px] h-screen md:h-[calc(100vh-40px)] flex flex-col md:flex-row shadow-2xl">

                {/* Sidebar */}
                <div className="w-full md:w-[30%] lg:w-1/3 bg-white border-r border-gray-200 flex flex-col">
                    <header className="p-3 bg-[#f0f2f5] border-b flex items-center justify-between">
                         <Avatar className="h-10 w-10 bg-gray-300">
                             <Image 
                                src="https://picsum.photos/seed/user/40/40"
                                alt="Foto de perfil borrada"
                                width={40}
                                height={40}
                                className="rounded-full filter blur-sm"
                            />
                         </Avatar>
                        <div className="flex items-center gap-4 text-gray-500">
                            <Users size={22} className="cursor-pointer hover:text-gray-700" />
                            <CircleDashed size={22} className="cursor-pointer hover:text-gray-700" />
                            <MessageSquare size={22} className="cursor-pointer hover:text-gray-700" />
                            <MoreVertical size={22} className="cursor-pointer hover:text-gray-700" />
                        </div>
                    </header>
                    <div className="p-2 bg-white border-b">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Pesquisar ou começar uma nova conversa" className="w-full pl-10 pr-4 py-1.5 text-sm border rounded-lg bg-[#f0f2f5] focus:outline-none focus:bg-white focus:border-gray-300" />
                        </div>
                    </div>
                     <div className="flex-grow overflow-y-auto">
                        <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b text-gray-700 font-medium">
                            <Archive className="w-5 h-5 mr-4 text-gray-600" />
                            <span>Arquivadas</span>
                        </div>
                        {contacts.map((contact, i) => <ContactItem key={i} {...contact} />)}
                    </div>
                    <nav className="bg-[#f0f2f5] p-2 flex justify-around border-t">
                        <button className="flex flex-col items-center text-primary w-full py-1 rounded-md">
                           <MessageSquare size={24} />
                           <span className="text-xs mt-1">Conversas</span>
                        </button>
                         <button className="flex flex-col items-center text-gray-600 hover:text-primary w-full py-1 rounded-md">
                           <Users size={24} />
                           <span className="text-xs mt-1">Grupos</span>
                        </button>
                        <button className="flex flex-col items-center text-gray-600 hover:text-primary w-full py-1 rounded-md">
                           <CircleDashed size={24} />
                           <span className="text-xs mt-1">Status</span>
                        </button>
                         <button className="flex flex-col items-center text-gray-600 hover:text-primary w-full py-1 rounded-md">
                           <PhoneCall size={24} />
                           <span className="text-xs mt-1">Ligações</span>
                        </button>
                    </nav>
                </div>

                {/* Chat Area */}
                <div className="w-full md:w-[70%] lg:w-2/3 bg-[#efeae2] flex flex-col relative">
                    <header className="p-3 bg-[#f0f2f5] flex items-center justify-between border-b border-gray-300 z-10">
                      <div className="flex items-center gap-3">
                         <Avatar className="h-10 w-10 bg-gray-300">
                           <Image 
                                src="https://picsum.photos/seed/1/40/40"
                                alt="Foto de perfil borrada"
                                width={40}
                                height={40}
                                className="rounded-full filter blur-sm"
                            />
                         </Avatar>
                         <div>
                            <h2 className="font-semibold text-gray-700">Bloqueado 🔒</h2>
                            <p className="text-xs text-gray-500">visto por último hoje às 10:52</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6 text-gray-500">
                          <Video size={22} className="cursor-pointer hover:text-gray-700" />
                          <Phone size={22} className="cursor-pointer hover:text-gray-700" />
                          <MoreVertical size={22} className="cursor-pointer hover:text-gray-700" />
                      </div>
                    </header>

                    <div className="flex-grow p-4 md:p-6 overflow-y-auto flex flex-col justify-end z-10">
                        <div className="w-full">
                           <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:30 AM" isUser={false} />
                           <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:32 AM" isUser={true} />
                           <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:35 AM" isUser={false} />
                           <MessageBubble content="Conteúdo Bloqueado 🔒" time="10:36 AM" isUser={true} />
                        </div>
                    </div>
                    
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 w-full px-4">
                       <div className="text-center my-4 w-full">
                            <a href="https://pay.kirvano.com/42448069-81fd-45dd-a3f5-961139087a79" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-[#25D366] hover:bg-[#20b856] text-white font-bold py-4 px-8 rounded-full text-lg h-auto shadow-lg animate-pulse-green">
                                    Liberar acesso completo R$ 27,90
                                </Button>
                            </a>
                        </div>
                    </div>
                    
                    <footer className="p-2 bg-[#f0f2f5] z-10">
                        <div className="text-center text-sm text-gray-500 font-medium p-3 rounded-lg bg-yellow-100/80 border border-yellow-200/80">
                           <p>🔒 As mensagens estão criptografadas. Para liberar o acesso total e visualizar todas as conversas, finalize a ordem de serviço clicando no botão acima.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
