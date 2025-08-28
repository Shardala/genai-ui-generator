'use client';

import { useState } from 'react';
import GeneratedResult from './components/GeneratedResult';
import { appTitle, copyGenCode, enterPrompt, generateTxt, refreshTxt } from './consts';

export default function Home() {

  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');

  function removeMarkdown(text: string) {
    const start = text.indexOf("```jsx");
    const end = text.lastIndexOf("```");

    if (start !== -1 && end > start) {
      // Remove "`jsx" and "`"
      return text.slice(start + 6, end);
    }

    return text;
  }

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: prompt })
      });

      const data = await response.json();
      if (response.ok) {
        setCode(removeMarkdown(data.code));

      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      alert("Code copied to clipboard")
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const disabled = !prompt;

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="max-w-5xl w-full flex-col items-center justify-center text-sm lg:flex">
        <div className='w-full flex-col items-center justify-center text-sm lg:flex bg-black/20 p-6 rounded-lg'>
          <p className='text-3xl mb-4 font-bold text-slate-300 w-full justify-self-start'>
            {appTitle}
          </p>
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-md bg-transparent overflow-hidden">
            <input
              className="peer h-full w-full outline-none bg-gray-100 text-sm text-gray-700 pl-4 pr-12 rounded-lg"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={enterPrompt}
            />
            <div onClick={handleGenerate} className="absolute w-fit p-5 right-0 flex items-center justify-center h-full w-12 bg-slate-500 hover:bg-slate-600 text-white cursor-pointer rounded-r-lg">
              <p className='text-sm'>{generateTxt}</p>
            </div>
          </div>

          <div className='flex'>
            <button className={`bg-slate-500 text-white px-5 py-3 mt-7 m-2 rounded-lg ${disabled ? 'bg-slate-700' : 'bg-slate-500 hover:bg-slate-600'}`} onClick={handleCopy}>
              {copyGenCode}
            </button>
            <button className={`text-white px-5 py-3 mt-7 m-2 rounded-lg bg-slate-500 hover:bg-slate-600`}>
              {refreshTxt}
            </button>
          </div>
        </div>

        <div className='bg-transparent border-2 border-slate-700 rounded mt-7 p-2 flex justify-center'>
          <GeneratedResult code={code}/>
        </div>

        <div className='bg-transparent rounded mt-7 p-2 flex justify-center'>
          {
            /* PASTE GENERATED CODE HERE AFTER PROMPT FINISHES, TO SEE THE RESULT */
          }
        </div>

      </div>
    </main>
  )
}
