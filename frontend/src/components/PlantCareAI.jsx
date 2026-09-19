import { useEffect, useRef, useState } from 'react';
import { Bot, Leaf, LoaderCircle, MessageCircle, Send, X, Minimize2, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import './PlantCareAI.css';

const WELCOME_MESSAGE = 'Hello 👋\nI am Plant Care AI for Green Shade Nursery.\nAsk me about any of our 200+ varieties of flowers, fruits, bonsai, and nursery plants, or how to care for them!';

const SUGGESTIONS = [
  '🌹 Rose plant',
  '🥭 Mango tree',
  '🪴 Ficus bonsai',
  '🌸 Flower varieties',
  '💧 How often to water?',
];

const parseInline = (text) => {
  if (!text) return text;
  const parts = [];
  let lastIndex = 0;
  const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[3]}</em>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length ? parts : text;
};

const renderFormattedMessage = (content) => {
  if (!content) return null;
  const lines = content.split('\n');

  return (
    <div className="plant-care-ai__content-flow">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="plant-care-ai__spacer" />;
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="plant-care-ai__heading">
              {trimmed.replace('### ', '')}
            </h4>
          );
        }
        if (trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="plant-care-ai__bullet">
              <span className="plant-care-ai__bullet-dot">•</span>
              <span>{parseInline(trimmed.replace('- ', ''))}</span>
            </div>
          );
        }
        return <p key={idx}>{parseInline(line)}</p>;
      })}
    </div>
  );
};

export const PlantCareAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', content: WELCOME_MESSAGE }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendQuery = async (queryText) => {
    const question = queryText.trim();
    if (!question || isTyping) return;

    setMessage('');
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: 'user', content: question }
    ]);
    setIsTyping(true);

    try {
      const response = await api.chat(question);
      setMessages((current) => [
        ...current,
        { id: `assistant-${Date.now()}`, role: 'assistant', content: response.answer }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'I could not reach Plant Care AI right now. Please try again in a moment.'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendQuery(message);
  };

  const toggleOpen = () => {
    setIsOpen((current) => !current);
    setIsMinimized(false);
  };

  return (
    <div className="plant-care-ai">
      {isOpen && (
        <section className={`plant-care-ai__panel ${isMinimized ? 'plant-care-ai__panel--minimized' : ''}`} aria-label="Plant Care AI chat">
          <header className="plant-care-ai__header">
            <div className="plant-care-ai__identity">
              <span className="plant-care-ai__avatar"><Leaf size={21} strokeWidth={2.2} /></span>
              <div>
                <strong>Plant Care AI</strong>
                <span><i /> Green Shade Nursery • 200+ Varieties</span>
              </div>
            </div>
            <div className="plant-care-ai__controls">
              <button type="button" onClick={() => setIsMinimized((current) => !current)} aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'} title={isMinimized ? 'Expand chat' : 'Minimize chat'}>
                <Minimize2 size={16} />
              </button>
              <button type="button" onClick={toggleOpen} aria-label="Close Plant Care AI" title="Close chat">
                <X size={17} />
              </button>
            </div>
          </header>

          {!isMinimized && (
            <>
              <div className="plant-care-ai__messages" aria-live="polite">
                {messages.map((item) => (
                  <div className={`plant-care-ai__message plant-care-ai__message--${item.role}`} key={item.id}>
                    {item.role === 'assistant' && <Bot size={14} aria-hidden="true" />}
                    {renderFormattedMessage(item.content)}
                  </div>
                ))}

                {messages.length === 1 && !isTyping && (
                  <div className="plant-care-ai__chips">
                    <span className="plant-care-ai__chips-title"><Sparkles size={12} /> Popular queries:</span>
                    <div className="plant-care-ai__chips-list">
                      {SUGGESTIONS.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="plant-care-ai__chip"
                          onClick={() => sendQuery(s.replace(/^[^\w\s]+/, '').trim())}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isTyping && (
                  <div className="plant-care-ai__message plant-care-ai__message--assistant plant-care-ai__typing">
                    <Bot size={14} aria-hidden="true" />
                    <span><b /><b /><b /></span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form className="plant-care-ai__composer" onSubmit={handleSubmit}>
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Ask about a plant (e.g., rose, mango, bonsai)..."
                  aria-label="Ask Plant Care AI a question"
                  maxLength={1000}
                  disabled={isTyping}
                />
                <button type="submit" aria-label="Send message" title="Send message" disabled={!message.trim() || isTyping}>
                  {isTyping ? <LoaderCircle className="plant-care-ai__spin" size={18} /> : <Send size={17} />}
                </button>
              </form>
            </>
          )}
        </section>
      )}

      <button className={`plant-care-ai__launcher ${isOpen ? 'plant-care-ai__launcher--active' : ''}`} type="button" onClick={toggleOpen} aria-label={isOpen ? 'Close Plant Care AI' : 'Open Plant Care AI'}>
        {isOpen ? <X size={25} /> : <><Leaf size={25} /><span className="plant-care-ai__pulse" /></>}
      </button>
      {!isOpen && <span className="plant-care-ai__label"><MessageCircle size={13} /> Plant Care AI</span>}
    </div>
  );
};

export default PlantCareAI;