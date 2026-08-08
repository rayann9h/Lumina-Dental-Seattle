import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface AiConciergeProps {
  onPreselectServiceAndBook: (serviceKey: string) => void;
}

export const AiConcierge: React.FC<AiConciergeProps> = ({ onPreselectServiceAndBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello! I am Lumina AI Concierge. How may I assist you with your dental care, insurance questions, or scheduling today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text, history }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'I am happy to assist you! Would you like to schedule an appointment with our clinical team?';

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'I apologize, but I experienced a brief network issue. You can easily schedule an appointment directly using our online booking tool!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { label: 'Book Cleaning', action: () => onPreselectServiceAndBook('cleaning') },
    { label: 'Toothache Triage', text: 'I am experiencing tooth pain, what should I do?' },
    { label: 'Whitening Cost', text: 'How much does professional teeth whitening cost?' },
    { label: 'Insurances Accepted', text: 'What insurance plans do you accept?' },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#003178] text-white shadow-xl hover:bg-[#0d47a1] transition-transform hover:scale-105 flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#003178]"
        aria-label="Open AI Dental Assistant"
      >
        <span className="material-symbols-outlined text-2xl" data-icon="smart_toy">
          smart_toy
        </span>
        <span className="text-xs font-bold hidden sm:inline group-hover:inline pr-1">AI Concierge</span>
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-[#e1e3e4] overflow-hidden flex flex-col h-[500px] animate-fadeIn">
          {/* Header */}
          <div className="bg-[#003178] text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#d9e2ff] text-[#003178] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-lg">smart_toy</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Lumina AI Concierge</h3>
                <span className="text-[10px] text-[#a1bbff] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Seattle Practice Assistant
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-[#0d47a1] text-white"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Quick Action Chips */}
          <div className="p-2 bg-[#f8f9fa] border-b border-[#e1e3e4] flex items-center gap-1.5 overflow-x-auto shrink-0">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (qp.action) {
                    qp.action();
                    setIsOpen(false);
                  } else if (qp.text) {
                    setInput(qp.text);
                  }
                }}
                className="text-[11px] font-semibold text-[#003178] bg-[#d9e2ff] hover:bg-[#cfe6f2] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-[#f8f9fa]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#003178] text-white rounded-br-none'
                      : 'bg-white text-[#191c1d] border border-[#e1e3e4] rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <span className="text-[9px] text-[#737783] mt-1 px-1">{m.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#526069] italic bg-white p-2.5 rounded-xl border border-[#e1e3e4] w-36">
                <span className="material-symbols-outlined text-sm animate-spin text-[#003178]">
                  progress_activity
                </span>
                <span>Typing answer...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#e1e3e4] flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about dental care, insurance, or hours..."
              className="flex-grow text-xs rounded-full border border-[#c3c6d4] bg-[#f8f9fa] px-4 py-2 focus:border-[#003178] focus:ring-1 focus:ring-[#003178] outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-[#003178] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0d47a1]"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
