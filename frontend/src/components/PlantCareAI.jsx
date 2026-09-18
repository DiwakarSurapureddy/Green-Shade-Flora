import { useEffect, useRef, useState } from 'react';
import { Bot, Leaf, LoaderCircle, MessageCircle, Send, X, Minimize2 } from 'lucide-react';
import { api } from '../services/api';
import './PlantCareAI.css';

const WELCOME_MESSAGE = 'Hello 👋\nI am Plant Care AI.\nAsk me about plants, gardening, watering, fertilizers, indoor plants, outdoor plants, or the Green Shade Flora nursery.';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const question = message.trim();
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
                <span><i /> Green Shade Flora knowledge base</span>
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
                    <p>{item.content}</p>
                  </div>
                ))}
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
                  placeholder="Ask about a plant..."
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