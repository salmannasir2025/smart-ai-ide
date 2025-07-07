import React, { useState } from 'react';
import { findBugs } from '../utils/api';

export default function BugFinder() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function analyzeCode() {
    if (!code.trim()) return;
    setLoading(true);
    const response = await findBugs(code);
    if (response.error) {
      setResult(`Error: ${response.error}`);
    } else {
      const text = response.generations?.[0]?.text || 'No bugs found.';
      setResult(text);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <textarea
        className="flex-grow bg-gray-800 rounded p-3 font-mono text-sm"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here to check for bugs..."
      />
      <button
        onClick={analyzeCode}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 rounded py-2 px-4 text-white"
      >
        {loading ? 'Analyzing...' : 'Find Bugs'}
      </button>
      <pre className="whitespace-pre-wrap bg-gray-700 p-3 rounded overflow-auto">{result}</pre>
    </div>
  );
}
