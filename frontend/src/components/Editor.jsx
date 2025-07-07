import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

export default function Editor() {
  const [code, setCode] = useState('// Start coding here...\n');

  return (
    <div className="h-full border border-gray-700 rounded">
      <MonacoEditor
        width="100%"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={setCode}
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          fontSize: 14,
        }}
      />
    </div>
  );
}
