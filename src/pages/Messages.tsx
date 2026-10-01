import { useState } from 'react';
import { DashboardLayout } from './Dashboard';
import { messages as mockMessages } from '../data/mockData';

export default function Messages() {
  const [selected, setSelected] = useState(mockMessages[0].id);
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState(mockMessages);

  const conversation = localMessages.find(m => m.id === selected)!;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLocalMessages(prev => prev.map(m =>
      m.id === selected
        ? {
            ...m,
            conversation: [...m.conversation, { from: 'me', text: input.trim(), time: 'Just now' }],
            lastMessage: input.trim(),
          }
        : m
    ));
    setInput('');
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-display text-2xl text-[#1b4332] mb-6">Messages</h1>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: '540px' }}>
          <div className="flex h-full">
            {/* Conversation List */}
            <div className="w-64 border-r border-gray-100 flex flex-col shrink-0">
              <div className="p-3 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full px-3 py-2 bg-[#f0fdf4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {localMessages.map(msg => (
                  <button
                    key={msg.id}
                    onClick={() => setSelected(msg.id)}
                    className={`w-full p-3 flex gap-3 items-start text-left transition-colors ${
                      selected === msg.id ? 'bg-[#f0fdf4]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#2d6a4f] shrink-0">
                      <img src={msg.avatar} alt={msg.farmer} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-gray-800 text-xs truncate">{msg.farmer}</span>
                        {msg.unread > 0 && (
                          <span className="bg-[#2d6a4f] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shrink-0 ml-1">
                            {msg.unread}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{msg.lastMessage}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{msg.time}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#2d6a4f] shrink-0">
                  <img src={conversation.avatar} alt={conversation.farmer} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{conversation.farmer}</div>
                  <div className="text-xs text-gray-500">Re: {conversation.product}</div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {conversation.conversation.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                      msg.from === 'me'
                        ? 'bg-[#2d6a4f] text-white rounded-br-sm'
                        : 'bg-[#f0fdf4] text-gray-800 rounded-bl-sm'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-[#95d5b2]' : 'text-gray-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-[#f0fdf4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#2d6a4f] text-white rounded-xl hover:bg-[#1b4332] transition-colors"
                  aria-label="Send"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
