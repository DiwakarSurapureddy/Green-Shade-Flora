import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  Leaf
} from 'lucide-react';

export const ChatBot = ({ externalPrompt, onClearExternalPrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: '🌿 Hello! I am PlantMate AI. Ask me anything about plant care, watering, low-light spaces, propagation, or indoor greenery!'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'Best plants for low light?',
    'Why are my leaves yellow?',
    'How often to water Snake Plant?',
    'Best indoor air purifiers?'
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle prompt passed from plant card or page buttons
  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true);
      sendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const sendMessage = async (textToSend) => {
    const message = textToSend || inputMessage.trim();
    if (!message || loading) return;

    // Append user message
    const userMsg = { role: 'user', text: message };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId: 'user_browser_session' })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: data.reply || "I'm here to help with all your plant queries!" }
      ]);
    } catch (err) {
      // Local fallback in case server or Groq is unreachable
      console.warn('Backend chat unreachable, using local botanical fallback', err);
      let reply = "I'm currently running in offline botanical mode. ";
      const low = message.toLowerCase();
      if (low.includes('water')) {
        reply += "General watering rule: stick your finger 1-2 inches into the soil. If it feels dry, give it a deep watering. If damp, wait a few days!";
      } else if (low.includes('yellow')) {
        reply += "Yellow leaves are most often caused by overwatering or poor container drainage. Check if the roots are sitting in damp soil!";
      } else if (low.includes('low light')) {
        reply += "For low light rooms, the Snake Plant, ZZ Plant, and Cast Iron Plant are the champions. They need very little ambient light.";
      } else {
        reply += "For best results with this plant, ensure proper drainage, provide bright indirect light, and let the topsoil dry between waterings.";
      }

      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await fetch('/api/delete-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: 'user_browser_session' })
      });
    } catch {
      // ignore
    }
    setMessages([
      {
        role: 'bot',
        text: 'Chat history cleared. What plant questions can I answer for you today?'
      }
    ]);
  };

  return (
    <div className="chat-widget-floating">
      {!isOpen ? (
        <button
          className="chat-trigger-btn"
          onClick={() => setIsOpen(true)}
          title="Open PlantMate AI Assistant"
        >
          <MessageCircle size={28} />
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '14px',
              height: '14px',
              background: '#40c057',
              borderRadius: '50%',
              border: '2px solid white'
            }}
          />
        </button>
      ) : (
        <div className="chat-panel-container">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-online-dot" />
              <div>
                <div className="chat-header-title">PlantMate AI</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-glow)' }}>
                  Botanical & Nature Specialist
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                style={{ color: 'rgba(255,255,255,0.7)', padding: '4px' }}
                onClick={handleClearHistory}
                title="Clear conversation"
              >
                <RotateCcw size={16} />
              </button>
              <button
                style={{ color: 'white', padding: '4px' }}
                onClick={() => setIsOpen(false)}
                title="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages-area">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.role}`}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  {m.role === 'bot' ? (
                    <Bot size={16} color="var(--primary-green)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  ) : (
                    <User size={16} color="white" style={{ marginTop: '3px', flexShrink: 0 }} />
                  )}
                  <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble bot">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="var(--accent-emerald)" className="animate-spin" />
                  <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>PlantMate is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="chat-chips-row">
            {suggestions.map((prompt, index) => (
              <button
                key={index}
                className="prompt-pill"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            className="chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about watering, light, pests..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              type="submit"
              className="btn-chat-send"
              disabled={loading || !inputMessage.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
