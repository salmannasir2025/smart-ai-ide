import React, { useState } from 'react';
import Editor from './components/Editor';
import ChatPanel from './components/ChatPanel';
import BugFinder from './components/BugFinder';
import GithubPanel from './components/GithubPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="flex items-center bg-gray-800 p-3 shadow">
        <h1 className="text-xl font-bold flex-grow">SmartIDE</h1>
        <nav className="space-x-4">
          <button
            className={`px-3 py-1 rounded ${activeTab === 'editor' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button
            className={`px-3 py-1 rounded ${activeTab === 'chat' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
          <button
            className={`px-3 py-1 rounded ${activeTab === 'bugfinder' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('bugfinder')}
          >
            Bug Finder
          </button>
          <button
            className={`px-3 py-1 rounded ${activeTab === 'github' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('github')}
          >
            GitHub
          </button>
        </nav>
      </header>

      <main className="flex-grow p-4">
        {activeTab === 'editor' && <Editor />}
        {activeTab === 'chat' && <ChatPanel />}
        {activeTab === 'bugfinder' && <BugFinder />}
        {activeTab === 'github' && <GithubPanel />}
      </main>
    </div>
  );
}
