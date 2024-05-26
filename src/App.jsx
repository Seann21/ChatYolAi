import { useState } from 'react';
import './App.css';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { requestGroqAI } from "./utils/groq";
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function App() {
  const [content, setContent] = useState('');
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  const ClickSubmit = async () => {
    setLoading(true);
    setData('');
    setAnimate(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      let ai = await requestGroqAI(content);
      setData(ai);
      setAnimate(true); // Trigger animation
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setData("Error fetching AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-col min-h-[80vh] justify-center items-center w-full'>
       <img
    src="/robot.jpg"
    className="w-32 rounded-full mb-6"
    alt="Avatar"/>
       <h1 className='text-5xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-red-600 to-green-500 animate-gradient'>
        ChatYol AI
      </h1>
      <form className='flex flex-col gap-4 py-4' onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder='Masukkan teks...'
          className='py-2 mt-5 px-24 text-md rounded-md block focus:outline-none focus:ring focus:border-violet-500 text-center w-full'
          id='content'
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={ClickSubmit}
          type='button'
          className='bg-indigo-600 py-2 px-4 font-bold rounded-md text-white hover:bg-indigo-700 flex justify-center items-center'
          disabled={loading}
        >
          {loading ? (
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          ) : (
            'Kirim'
          )}
        </button>
      </form>
      <div className='max-w-5xl mx-auto w-full mt-4'>
        {data && (
          <div className={`transition-transform duration-500 ${animate ? 'animate-showcase' : ''}`}>
            <SyntaxHighlight
              language='typescript'
              style={darcula}
              wrapLongLines={true}
            >
              {data}
            </SyntaxHighlight>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
