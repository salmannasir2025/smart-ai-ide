import React, { useState } from 'react';
import { chatLocal, chatOpenAI } from '../utils/api';

const MODELS = [
  'codellama:7b-instruct-q4_0',
  'qwen2.5-coder:1.5b',
  'deepseek-coder:1.3b',
  'mistral:latest',
  'openai'
];

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState(MODELS[0]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setLoading(true);

    let response;
    if (model === 'openai') {
      response = await chatOpenAI(input);
      if (response.error) {
        setMessages((msgs) => [...msgs, { role: 'error', content: response.error }]);
      } else {
        const content = response.choices?.[0]?.message?.content || 'No response';
        setMessages((msgs) => [...msgs, { role: 'assistant', content }]);
      }
    } else {
      response = await chatLocal(model, input);
      if (response.error) {
        setMessages((msgs) => [...msgs, { role: 'error', content: response.error }]);
      } else {
        const content = response.generations?.[0]?.text || 'No response';
        setMessages((msgs) => [...msgs, { role: 'assistant', content }]);
      }
    }

    setInput('');
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-4 mb-3">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="bg-gray-800 rounded p-1"
        >
          {MODELS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="flex-grow overflow-y-auto border border-gray-700 rounded p-3 mb-3 bg-gray-800">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.role === 'user' ? 'text-right' : msg.role === 'assistant' ? 'text-left' : 'text-red-500'}`}
          >
            <span className="inline-block rounded px-3 py-1 max-w-xs break-words" style={{backgroundColor: msg.role === 'user' ? '#2563eb' : msg.role === 'assistant' ? '#374151' : '#b91c1c'}}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-gray-700 rounded px-3 py-2"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 rounded text-white"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
