import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  SUGGESTED_FARMER_QUESTIONS,
  INITIAL_BOT_GREETING,
  getAICompanionResponse,
  type ChatMessage,
} from '../../services/aiChatService';
import {
  Bot,
  Send,
  Mic,
  Sparkles,
  ArrowRight,
  User,
  Info,
  X,
  Phone,
} from 'lucide-react';


export const AIAssistantView: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, setTab } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_GREETING]);
  const [inputQuery, setInputQuery] = useState('');
  const [showVoiceNotice, setShowVoiceNotice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    // 1. Add User message
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      textEn: query,
      textHi: query,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // 2. Generate intelligent response using application context
    setTimeout(() => {
      const botResponse = getAICompanionResponse(query);
      setMessages(prev => [...prev, botResponse]);
    }, 450);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-12">
      {/* 1. Header with Farm Context */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {t.aiAssistant.title}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-stone-600 mt-0.5">
                {t.aiAssistant.subtitle}
              </p>
            </div>
          </div>

          {/* Connected Context Badge */}
          <div className="flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full self-start sm:self-auto text-xs font-black text-emerald-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {user?.name || 'Ramesh Kumar'} &bull; {user?.landSizeAcres || 5}A Tomato &bull; Karnal
            </span>
          </div>
        </div>
      </div>

      {/* 2. Suggested Farmer Questions (Explicitly prompt required) */}
      <div className="space-y-2.5">
        <div className="flex items-center space-x-2 px-1">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-black text-stone-500 uppercase tracking-wider">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (क्लिक करें):' : 'Suggested Farmer Questions (Tap to ask):'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SUGGESTED_FARMER_QUESTIONS.map(q => {
            const label = language === 'hi' ? q.textHi : q.textEn;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSendMessage(label)}
                className="p-3.5 bg-white border border-stone-200 hover:border-indigo-500 hover:bg-indigo-50/40 rounded-2xl text-xs font-bold text-stone-800 shadow-2xs transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <span>"{label}"</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Honest Voice Placeholder Alert (Triggered when clicking Mic) */}
      {showVoiceNotice && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start justify-between gap-3 text-amber-950 animate-fadeIn">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-xs font-black uppercase tracking-wider text-amber-900">
                {language === 'hi' ? '🎙 आवाज इनपुट (भविष्य की सुविधा):' : '🎙 Voice Assistant (Upcoming Feature):'}
              </p>
              <p className="text-xs font-medium text-amber-900 leading-relaxed">
                {language === 'hi'
                  ? 'हिंदी और क्षेत्रीय बोलियों में आवाज पहचान सुविधा अगले संस्करण में आ रही है। फिलहाल आप लिखकर या ऊपर दिए गए सुझावों को दबाकर सवाल पूछ सकते हैं।'
                  : 'Voice input in Hindi and regional dialects is planned for the next release. Currently, you can type questions or tap any suggested query above.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowVoiceNotice(false)}
            className="text-amber-700 hover:text-amber-900 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4. Chat Area Box */}
      <div className="bg-white border border-stone-200 rounded-3xl shadow-xs overflow-hidden flex flex-col min-h-[480px]">
        {/* Messages Feed */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 max-h-[560px]">
          {messages.map(msg => {
            const isBot = msg.sender === 'bot';
            const text = language === 'hi' ? msg.textHi : msg.textEn;
            const badge = language === 'hi' ? msg.badgeHi : msg.badgeEn;

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Bot Avatar */}
                {isBot && (
                  <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-xl rounded-3xl p-4 sm:p-5 text-sm leading-relaxed shadow-xs space-y-2.5 ${
                    isBot
                      ? 'bg-stone-50 border border-stone-200 text-stone-900 rounded-tl-none'
                      : 'bg-indigo-600 text-white rounded-tr-none'
                  }`}
                >
                  {/* Badge */}
                  {badge && (
                    <span className="inline-block bg-indigo-100 text-indigo-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {badge}
                    </span>
                  )}

                  {/* Message Content */}
                  <p className="whitespace-pre-line font-medium">{text}</p>

                  {/* Contextual Action Buttons */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2 border-t border-stone-200/60">
                      {msg.actionButtons.map((btn, bIdx) => {
                        const btnLabel = language === 'hi' ? btn.labelHi : btn.labelEn;
                        return (
                          <button
                            key={bIdx}
                            type="button"
                            onClick={() => {
                              if (btn.actionTab) {
                                setTab(btn.actionTab);
                              } else if (btn.externalAction) {
                                window.location.href = btn.externalAction;
                              }
                            }}
                            className="bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-black px-3 py-1.5 rounded-xl shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer"
                          >
                            <span>{btnLabel}</span>
                            <ArrowRight className="w-3 h-3 text-stone-400" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <span
                    className={`block text-[10px] font-bold text-right pt-0.5 ${
                      isBot ? 'text-stone-400' : 'text-indigo-200'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {/* User Avatar */}
                {!isBot && (
                  <div className="w-9 h-9 rounded-2xl bg-stone-900 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-1">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* 5. Input Bar with Microphone Placeholder and Send Button */}
        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <div className="flex items-center space-x-2">
            {/* Microphone Button (Voice Placeholder) */}
            <button
              type="button"
              onClick={() => setShowVoiceNotice(true)}
              title={language === 'hi' ? 'आवाज इनपुट (भविष्य की सुविधा)' : 'Voice input placeholder (Click for info)'}
              className="p-3 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 rounded-2xl transition-all flex items-center justify-center cursor-pointer shadow-2xs hover:scale-105"
            >
              <Mic className="w-5 h-5 text-stone-600" />
            </button>

            {/* Query Input */}
            <input
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                language === 'hi'
                  ? 'अपनी फसल, रोग या मंडी भाव संबंधी सवाल यहाँ पूछें...'
                  : 'Ask about crop health, treatments, or mandi prices...'
              }
              className="flex-1 bg-white border border-stone-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-stone-900 font-bold text-sm rounded-2xl px-4 py-3 outline-none transition-all shadow-2xs"
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-md transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Helpline Link */}
          <div className="flex items-center justify-between mt-2.5 px-2 text-[11px] text-stone-500 font-semibold">
            <span>
              {language === 'hi'
                ? 'AI सलाह सामान्य मार्गदर्शिका है। गंभीर समस्याओं पर कृषि वैज्ञानिक से संपर्क करें।'
                : 'AI advisory provides general agronomic guidance. Consult extension officers for critical issues.'}
            </span>
            <a
              href="tel:18001801551"
              className="text-indigo-700 hover:underline flex items-center space-x-1 flex-shrink-0 font-bold"
            >
              <Phone className="w-3 h-3" />
              <span>Kisan Helpline: 1800-180-1551</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
