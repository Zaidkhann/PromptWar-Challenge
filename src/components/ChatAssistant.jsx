import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Key } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

const SYSTEM_PROMPT = `You are Vanguard, a highly intelligent and strictly constrained civic education AI. Your sole purpose is to educate Indian citizens about the democratic election process.

<Constraints>
1. SCOPE: You must ONLY answer questions related to Indian elections, ECI guidelines, voting procedures, and civic duties.
2. LENGTH: Keep answers extremely concise (2-4 sentences maximum).
3. REFUSAL: If a user asks about politics, opinions, or non-election topics, you MUST reply: "I am Vanguard, your civic guide. I can only answer questions about the election process and voting procedures."
4. FORMATTING: Use Markdown. Use bolding for key terms. Use bullet points for steps.
</Constraints>

<Examples>
User: Who can vote in India?
Vanguard: To vote in India, you must be an **Indian citizen** and at least **18 years old** on the qualifying date (usually January 1st of the election year). You must also be enrolled in the **electoral roll** of your constituency.

User: What's your opinion on the current Prime Minister?
Vanguard: I am Vanguard, your civic guide. I can only answer questions about the election process and voting procedures.
</Examples>

Always maintain a neutral, factual, and helpful tone.`;

const SUGGESTIONS = [
  'Who can vote in India?',
  'How do I register to vote?',
  'What is NOTA?',
  'What ID do I need?',
];

/**
 * ChatAssistant component that provides an AI interface powered by Google Gemini.
 * Allows users to ask questions about the Indian election process.
 * @returns {JSX.Element} The rendered ChatAssistant component.
 */
const ChatAssistant = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [isKeyValid, setIsKeyValid] = useState(!!import.meta.env.VITE_GEMINI_API_KEY);
  const [keyInput, setKeyInput] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'bot',
      text: "Hi! I'm Vanguard — your election guide. Ask me anything about voting in India.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isKeyValid]);

  // Initialize chat session when API key is available
  useEffect(() => {
    if (isKeyValid && apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash-8b',
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            maxOutputTokens: 500,
          }
        });
        chatRef.current = model.startChat({
          history: [
            {
              role: 'user',
              parts: [{ text: SYSTEM_PROMPT }],
            },
            {
              role: 'model',
              parts: [{ text: "Understood. I'm Vanguard, ready to help with election-related questions." }],
            },
          ],
        });
      } catch (err) {
        console.error("Error initializing model:", err);
        setIsKeyValid(false);
      }
    }
  }, [isKeyValid, apiKey]);

  const handleSaveKey = () => {
    if (keyInput.trim()) {
      setApiKey(keyInput.trim());
      setIsKeyValid(true);
    }
  };

  const handleSend = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || !chatRef.current) return;

    const userMsg = { id: Date.now(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessageStream(trimmed);
      
      const botMsgId = Date.now() + 1;
      setMessages((prev) => [...prev, { id: botMsgId, role: 'bot', text: '' }]);
      
      let fullText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        setMessages((prev) => 
          prev.map(m => m.id === botMsgId ? { ...m, text: fullText } : m)
        );
      }
    } catch (err) {
      console.error('Gemini API error:', err);
      let errorMsg = `Sorry, I couldn't process that. Error: ${err.message}`;
      
      if (err.message?.includes('API key not valid')) {
          errorMsg = "Your API key is invalid. Please check it and try again.";
          // Only kick out on explicitly invalid key
          setIsKeyValid(false);
      } else if (err.message?.includes('429') || err.message?.includes('quota')) {
          errorMsg = "Sorry, this API key has exceeded its usage quota. Please generate a new free key from Google AI Studio (aistudio.google.com).";
      } else if (err.message?.includes('not found') || err.message?.includes('model')) {
          errorMsg = "The selected model is not available for your API key. Please check your key permissions.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: errorMsg,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isKeyValid) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-6 bg-[#12121a] border-l border-white/5 relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-[#1a1a24] border border-white/10 rounded-3xl p-8 space-y-6 text-center shadow-2xl relative overflow-hidden"
              >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Key size={32} className="text-indigo-400" />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-white mb-3">Welcome to Vanguard AI</h2>
                      <p className="text-zinc-400 text-[15px] leading-relaxed">
                          To get started, please provide your Google Gemini API key. This is stored securely in your browser session.
                      </p>
                  </div>
                  <div className="space-y-4">
                      <input
                          type="password"
                          value={keyInput}
                          onChange={(e) => setKeyInput(e.target.value)}
                          placeholder="Paste your API key here..."
                          className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                      />
                      <button
                          onClick={handleSaveKey}
                          aria-label="Save API Key"
                          className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl py-4 text-[15px] font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/20"
                      >
                          Start Chatting
                      </button>
                  </div>
              </motion.div>
          </div>
      );
  }

  return (
    <div className="h-full flex flex-col bg-[#12121a] border-l border-white/5 relative">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-[#12121a]/90 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shadow-inner">
            <Sparkles size={24} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">Vanguard AI</h3>
            <span className="text-xs text-indigo-400/80 font-medium tracking-wide uppercase">Powered by Gemini</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar z-10 scroll-smooth">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-5 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-indigo-500 text-white rounded-br-sm'
                  : 'bg-[#1a1a24] text-zinc-200 border border-white/5 rounded-bl-sm'
              }`}
            >
              {msg.role === 'user' ? (
                msg.text
              ) : (
                <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-[#0a0a0f] prose-pre:border prose-pre:border-white/10 prose-a:text-indigo-400">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#1a1a24] border border-white/5 px-5 py-4 rounded-3xl rounded-bl-sm flex gap-2 items-center h-12">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Suggestions + Input */}
      <div className="p-6 border-t border-white/5 bg-[#12121a]/90 backdrop-blur-xl z-20">
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-full text-[13px] font-medium text-zinc-400 hover:text-white transition-all hover:-translate-y-0.5"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask anything about the elections..."
            className="w-full bg-[#1a1a24] border border-white/10 rounded-2xl px-6 py-4 text-[16px] text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-[#1f1f2e] transition-all pr-16 shadow-inner"
          />
          <button
            onClick={() => handleSend(input)}
            aria-label="Send message"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:bg-white/5 flex items-center justify-center transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-indigo-500/20 group-focus-within:bg-indigo-500"
          >
            <Send size={20} className="text-white disabled:text-zinc-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatAssistant);
