import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, Send, Mic, Sparkles } from 'lucide-react';

export const AIAssistantView: React.FC = () => {
  const { t, language } = useLanguage();
  const [inputQuery, setInputQuery] = useState('');

  const suggestedQuestions = language === 'hi' ? [
    "मेरी फसल में पीले पत्ते क्यों हो रहे हैं?",
    "टमाटर के लिए कौन सी मंडी सबसे बेहतर है?",
    "फसल को आज बेचें या 2 दिन रुकें?",
    "अगेती झुलसा (Early Blight) के क्या लक्षण हैं?"
  ] : [
    "Why are my tomato leaves turning yellow with spots?",
    "Which nearby mandi gives maximum net return for tomato?",
    "Should I sell my harvest now or wait 2 days?",
    "What precautions should I follow when spraying fungicide?"
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 lg:pb-10">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              {t.aiAssistant.title}
            </h1>
            <p className="text-sm font-medium text-stone-600">
              {t.aiAssistant.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {language === 'hi' ? 'सुझाए गए सवाल' : 'Suggested Questions'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInputQuery(q)}
              className="text-xs font-semibold bg-white border border-stone-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-stone-700 px-3.5 py-2 rounded-xl shadow-2xs transition-all text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area Box */}
      <div className="bg-white border border-stone-200 rounded-3xl shadow-xs p-5 min-h-[300px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-stone-100 text-stone-800 p-3.5 rounded-2xl rounded-tl-none max-w-lg text-sm leading-relaxed">
              {language === 'hi' 
                ? 'नमस्ते किसान साथी! मैं किसानमित्र AI सहायक हूँ। आप मुझसे टमाटर, गेहूं, धान आदि फसलों के रोग, जैविक-रासायनिक उपचार सावधानियों और मंडी भाव के बारे में कभी भी पूछ सकते हैं।'
                : 'Namaste Farmer! I am your KisanMitra AI Assistant. You can ask me about crop diseases, organic and approved treatments, safety precautions, or which mandi gives you the best profit today.'}
            </div>
          </div>
        </div>

        {/* Input Bar with Voice Placeholder */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center space-x-2">
          <button
            type="button"
            title="Voice input coming soon"
            className="p-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-2xl transition-colors touch-target flex items-center justify-center"
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={language === 'hi' ? 'यहाँ अपना सवाल लिखें...' : 'Ask your farming question here...'}
            className="flex-1 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
          />
          <button
            type="button"
            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-md transition-colors touch-target flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
