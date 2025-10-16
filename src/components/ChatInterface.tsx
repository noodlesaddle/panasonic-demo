"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Send } from "lucide-react";


interface Message {
    id: string;
    content: string;
    sender: "user" | "agent";
    timestamp: Date;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hi, I need to start the Q3 marketing plan for the 'Velocity' product line.",
            sender: "user",
            timestamp: new Date(),
        },
        {
            id: "2",
            content: "Welcome! I'm here to help you build the Q3 plan for Velocity. Our first step is to establish the strategic context.\n\nBased on our database, I've prioritized the following datasets to inform your situation analysis:\n\n1. Market Overview / Macro Picture: What shifts have occurred?\n2. Global Scorecard: How did Velocity perform against our annual goals in Q2?\n3. Brand Tracking: Are there any critical shifts in perception or health?\n\nQuestion for you: Which area of the business are you focused on optimizing in Q3 (e.g., brand awareness, market share, profitability)?",
            sender: "agent",
            timestamp: new Date(),
        },
        {
            id: "3",
            content: "We're primarily focused on driving market share, specifically with new customers. Our brand health is stable.",
            sender: "user",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputValue("");

        // Simulate agent response
        setTimeout(() => {
            const agentResponse: Message = {
                id: (Date.now() + 1).toString(),
                content: "Thank you for that context. Let me help you develop a strategy focused on acquiring new customers while maintaining your stable brand health...",
                sender: "agent",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, agentResponse]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen pandora-gradient flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-center pt-12 pb-8">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <img
                            src="/pandora-logo.svg"
                            alt="Pandora Logo"
                            width={50}
                            height={50}
                            className="object-contain text-gray-800"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">PANDORA</h1>
                    <p className="text-gray-600 text-lg">Ask our Planning Agent anything</p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 max-w-4xl mx-auto w-full px-6">
                <div className="h-[calc(100vh-300px)] overflow-y-auto scrollbar-hide">
                    <div className="space-y-6 pb-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className="max-w-[80%]">
                                    <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
                                        {message.sender === "user" ? "PANDORA (YOU)" : "OUR AGENT (DIANA)"}
                                    </div>
                                    <div
                                        className={`rounded-2xl px-6 py-4 ${message.sender === "user"
                                            ? "bg-gradient-to-r from-pink-200 to-pink-300 text-gray-900"
                                            : "bg-gray-100 text-gray-900"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="max-w-4xl mx-auto w-full px-6 pb-8">
                <div className="relative">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything about Pandora Planning..."
                        className="w-full pr-12 py-6 text-base rounded-2xl border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    <Button
                        onClick={handleSendMessage}
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}