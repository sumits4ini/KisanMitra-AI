import type { NavigationTab } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  textEn: string;
  textHi: string;
  timestamp: string;
  actionButtons?: {
    labelEn: string;
    labelHi: string;
    actionTab?: NavigationTab;
    externalAction?: string;
  }[];
  badgeEn?: string;
  badgeHi?: string;
}

export const SUGGESTED_FARMER_QUESTIONS = [
  {
    id: 'q_yellow_leaves',
    textHi: 'मेरी फसल में पीले पत्ते क्यों हो रहे हैं?',
    textEn: 'Why are my crop leaves turning yellow?',
    topic: 'disease'
  },
  {
    id: 'q_best_mandi',
    textHi: 'मेरे टमाटर के लिए कौन सी मंडी सबसे अच्छी है?',
    textEn: 'Which market is best for my tomato crop?',
    topic: 'market'
  },
  {
    id: 'q_when_to_sell',
    textHi: 'मेरी फसल कब बेचनी चाहिए?',
    textEn: 'When should I sell my crop?',
    topic: 'sell_smart'
  },
  {
    id: 'q_early_blight_action',
    textHi: 'अगेती झुलसा (Early Blight) मिलने पर क्या करना चाहिए?',
    textEn: 'What should I do after detecting early blight?',
    topic: 'treatment'
  }
];

export const INITIAL_BOT_GREETING: ChatMessage = {
  id: 'msg_welcome',
  sender: 'bot',
  textEn:
    'Namaste Ramesh ji! 🙏 I am your KisanMitra AI Assistant. I have loaded your farm profile (5 Acres Tomato in Karnal, Haryana & Current Health 82/100). Ask me anything about crop diseases, mandi net returns, or the best day to sell.',
  textHi:
    'नमस्ते रमेश जी! 🙏 मैं आपका किसानमित्र AI सहायक हूँ। मैंने आपके खेत का विवरण (5 एकड़ टमाटर, करनाल, हरियाणा & स्वास्थ्य 82/100) लोड कर लिया है। आप मुझसे फसल रोग, मंडी के शुद्ध मुनाफे या बेचने के सही समय के बारे में कभी भी पूछ सकते हैं।',
  timestamp: 'Just now',
  badgeEn: 'FARM COMPANION ACTIVE',
  badgeHi: 'किसान साथी सक्रिय',
  actionButtons: [
    { labelEn: '📷 Scan Crop Leaf', labelHi: '📷 पत्ता स्कैन करें', actionTab: 'crop-doctor' },
    { labelEn: '📊 Compare Mandis', labelHi: '📊 मंडी भाव देखें', actionTab: 'market' },
    { labelEn: '💡 Smart Selling Plan', labelHi: '💡 स्मार्ट बिक्री योजना', actionTab: 'sell-smart' }
  ]
};

/**
 * Generate intelligent context-aware responses using the application state
 */
export function getAICompanionResponse(query: string): ChatMessage {
  const lower = query.toLowerCase();

  // 1. Question: Yellow Leaves / पीले पत्ते
  if (
    lower.includes('पीले पत्ते') ||
    lower.includes('yellow') ||
    lower.includes('yellowing') ||
    lower.includes('leaves')
  ) {
    return {
      id: 'resp_' + Date.now(),
      sender: 'bot',
      textEn:
        'Ramesh ji, on your 5-acre Tomato field, our AI Crop Doctor recently detected Early Blight (Alternaria solani) with concentric brown rings and yellow halos on bottom leaves.\n\nKey Observations:\n• Morning relative humidity (84%) in Karnal is spreading fungal spores.\n• Soil splash during irrigation is wetting the lower canopy.\n\nImmediate Recommendation:\n1. Prune and destroy yellowing lower leaves (do not leave in field).\n2. Apply protective contact spray (Mancozeb 75% WP @ 2g/L) or organic bio-fungicide (Trichoderma viride).\n3. Keep foliage dry using drip lines.',
      textHi:
        'रमेश जी, आपके 5 एकड़ टमाटर के खेत में हाल ही में AI डॉक्टर द्वारा निचले पत्तों पर अगेती झुलसा (Early Blight) के संकेंद्रित छल्ले और पीलापन दर्ज किया गया है।\n\nमुख्य कारण:\n• करनाल में सुबह की उच्च नमी (84%) के कारण फंगल बीजाणु फैल रहे हैं।\n• मिट्टी से छिटकने वाले पानी से नीचे के पत्ते लगातार गीले रह रहे हैं।\n\nतुरंत करने योग्य कार्य:\n1. रोगग्रस्त पीले पत्तों को काटकर खेत से बाहर सुरक्षित नष्ट करें।\n2. अनुमोदित मैंकोजेब (Mancozeb 75% WP @ 2g/L) या जैविक ट्राइकोडर्मा विरिडी का सुरक्षात्मक छिड़काव करें।\n3. ड्रिप से सिंचाई करें ताकि पत्ते सूखे रहें।',
      timestamp: 'Just now',
      badgeEn: 'DIAGNOSIS CONTEXT: TOMATO (EARLY BLIGHT)',
      badgeHi: 'रोग संदर्भ: टमाटर (अगेती झुलसा)',
      actionButtons: [
        { labelEn: '📷 Scan Leaf with AI Doctor', labelHi: '📷 AI डॉक्टर से पत्ता स्कैन करें', actionTab: 'crop-doctor' },
        { labelEn: '🌿 View Safe Treatments', labelHi: '🌿 सुरक्षित उपचार देखें', actionTab: 'crop-doctor' }
      ]
    };
  }

  // 2. Question: Best Market / मंडी
  if (
    lower.includes('market') ||
    lower.includes('mandi') ||
    lower.includes('मंडी') ||
    lower.includes('भाव') ||
    lower.includes('which market')
  ) {
    return {
      id: 'resp_' + Date.now(),
      sender: 'bot',
      textEn:
        'For your 20 quintals of Tomato from Karnal, Market B (Azadpur Terminal Mandi, Delhi) is your highest net profit option! 🏆\n\nNet Return Comparison:\n• Azadpur Mandi: ₹2,250/qtl (45 km, Transport ₹4,000) → Net In-Hand: ₹39,875 (₹1,994/qtl)\n• Karnal Mandi: ₹2,000/qtl (18 km, Transport ₹2,500) → Net In-Hand: ₹36,550 (₹1,828/qtl)\n• Sonipat Mandi: ₹1,900/qtl (10 km, Transport ₹1,500) → Net In-Hand: ₹35,830 (₹1,792/qtl)\n\nVerdict: Even after ₹4,000 transport, Azadpur yields +₹3,325 MORE net profit in your pocket than Karnal Mandi!',
      textHi:
        'रमेश जी, आपके 20 क्विंटल टमाटर के लिए मंडी ख (आज़ादपुर टर्मिनल मंडी, दिल्ली) सबसे अधिक शुद्ध कमाई का विकल्प है! 🏆\n\nशुद्ध कमाई की तुलना:\n• आज़ादपुर मंडी: ₹2,250/क्विंटल (45 किमी, ढुलाई ₹4,000) → शुद्ध प्राप्ति: ₹39,875 (₹1,994/क्विंटल)\n• करनाल मंडी: ₹2,000/क्विंटल (18 किमी, ढुलाई ₹2,500) → शुद्ध प्राप्ति: ₹36,550 (₹1,828/क्विंटल)\n• सोनीपत मंडी: ₹1,900/क्विंटल (10 किमी, ढुलाई ₹1,500) → शुद्ध प्राप्ति: ₹35,830 (₹1,792/क्विंटल)\n\nनिष्कर्ष: ₹4,000 ढुलाई खर्च घटाने के बाद भी आज़ादपुर मंडी में आपको स्थानीय करनाल मंडी से +₹3,325 अधिक शुद्ध मुनाफा मिलता है!',
      timestamp: 'Just now',
      badgeEn: 'MARKET INTELLIGENCE CONTEXT',
      badgeHi: 'मंडी समझदारी संदर्भ',
      actionButtons: [
        { labelEn: '📊 Open Market Comparison', labelHi: '📊 मंडी तुलना स्क्रीन खोलें', actionTab: 'market' },
        { labelEn: '💰 Calculate Farm Profit', labelHi: '💰 शुद्ध मुनाफे की गणना करें', actionTab: 'market' }
      ]
    };
  }

  // 3. Question: When to Sell / कब बेचना चाहिए
  if (
    lower.includes('कब बेच') ||
    lower.includes('when should i sell') ||
    lower.includes('sell now') ||
    lower.includes('wait') ||
    lower.includes('बेचनी')
  ) {
    return {
      id: 'resp_' + Date.now(),
      sender: 'bot',
      textEn:
        'AI Sell Smart Recommendation: WAIT 1–2 DAYS (OR PARTIAL SALE) ⚖\n\nRecommended 2-Phase Strategy (20 Quintals Tomato):\n• Batch 1 (12 Quintals): Sell today at Azadpur Mandi at ₹2,250/qtl to secure ₹23,625 immediate cash flow and avoid storage congestion.\n• Batch 2 (8 Quintals): Hold in shaded ventilated crates for 24–48 hours. Terminal arrivals drop mid-week, projected to push prices to ₹2,430+ for +₹3,200 additional profit!\n\nNote: Market forecasts are estimates and are not guaranteed. Keep harvested crates well-ventilated.',
      textHi:
        'AI स्मार्ट बिक्री सिफारिश: 1–2 दिन रुकें (आंशिक बिक्री) ⚖\n\n2-किश्त वितरण रणनीति (20 क्विंटल टमाटर):\n• किश्त 1 (12 क्विंटल): आज ही आज़ादपुर मंडी में ₹2,250/क्विंटल पर बेचें ताकि तुरंत ₹23,625 नकदी मिले और भंडारण का जोखिम न रहे।\n• किश्त 2 (8 क्विंटल): छायादार हवादार क्रेट्स में 24-48 घंटे रोकें। सप्ताह के मध्य में आवक घटने से भाव ₹2,430+ होने का अनुमान है, जिससे +₹3,200 अतिरिक्त लाभ मिलेगा!\n\nसूचना: बाजार पूर्वानुमान अनुमानित हैं। क्रेट्स को छाया में हवादार रखें।',
      timestamp: 'Just now',
      badgeEn: 'SELL SMART STRATEGY',
      badgeHi: 'स्मार्ट बिक्री रणनीति',
      actionButtons: [
        { labelEn: '💡 View Smart Selling Plan', labelHi: '💡 स्मार्ट बिक्री योजना देखें', actionTab: 'sell-smart' },
        { labelEn: '🚚 Confirm Schedule', labelHi: '🚚 शेड्यूल तय करें', actionTab: 'sell-smart' }
      ]
    };
  }

  // 4. Question: What to do after early blight / अगेती झुलसा
  if (
    lower.includes('early blight') ||
    lower.includes('झुलसा') ||
    lower.includes('blight') ||
    lower.includes('after detecting')
  ) {
    return {
      id: 'resp_' + Date.now(),
      sender: 'bot',
      textEn:
        'Step-by-Step Recovery Protocol for Early Blight:\n\n1. Immediate Sanitation: Clip off infected bottom leaves and dispose far from the plot.\n2. Spray Guidance: Apply contact protective fungicide (Mancozeb 75% WP @ 2.0 g/L) or systemic azoxystrobin under expert advisory.\n3. Safety Notice: Always wear gloves and mask. Strictly adhere to approved label dosage and waiting period before harvest (7 days PHI).\n4. Schedule Recheck: Rescan foliage with Crop Doctor in 3 days.\n\nNeed personalized advice? You can call Kisan Call Centre toll-free at 1800-180-1551.',
      textHi:
        'अगेती झुलसा (Early Blight) नियंत्रण के आवश्यक कदम:\n\n1. स्वच्छता: जमीन को छूने वाले रोगग्रस्त पत्तों को सावधानीपूर्वक तोड़कर खेत से दूर नष्ट करें।\n2. छिड़काव सलाह: लेबल निर्देशानुसार मैंकोजेब (Mancozeb 75% WP @ 2.0 ग्राम/लीटर) या जैव-कवकनाशी ट्राइकोडर्मा का छिड़काव करें।\n3. सुरक्षा सूचना: छिड़काव के समय मास्क और दस्ताने पहनें। तुड़ाई से कम से कम 7 दिन पहले छिड़काव बंद करें।\n4. पुनः जांच: 3 दिन बाद नए पत्तों का AI डॉक्टर से दोबारा फोटो खींचें।\n\nनिःशुल्क विशेषज्ञ सहायता के लिए किसान कॉल सेंटर 1800-180-1551 पर कॉल कर सकते हैं।',
      timestamp: 'Just now',
      badgeEn: 'AGRONOMIC PROTOCOL',
      badgeHi: 'कृषि रक्षा प्रोटोकॉल',
      actionButtons: [
        { labelEn: '🩺 Open Treatment Plan', labelHi: '🩺 उपचार योजना खोलें', actionTab: 'crop-doctor' },
        { labelEn: '📞 Call Kisan Call Centre', labelHi: '📞 किसान कॉल सेंटर (1800-180-1551)', externalAction: 'tel:18001801551' }
      ]
    };
  }

  // 5. Default Friendly Agricultural Companion Response
  return {
    id: 'resp_' + Date.now(),
    sender: 'bot',
    textEn:
      `Thank you for asking, Ramesh ji! For your 5 acres of Tomato in Karnal, I am tracking your crop health (82/100), the upcoming rain alert in 36 hours, and Azadpur Mandi rates (₹2,250/qtl).\n\nFeel free to tap any of the suggested topics below or ask about specific fertilizer schedules, pest symptoms, or freight calculations!`,
    textHi:
      `पूछने के लिए धन्यवाद, रमेश जी! करनाल में आपके 5 एकड़ टमाटर के लिए मैं फसल स्वास्थ्य (82/100), 36 घंटों में संभावित बारिश और आज़ादपुर मंडी भाव (₹2,250/क्विंटल) की लगातार निगरानी कर रहा हूँ।\n\nआप नीचे दिए गए किसी भी सुझाव को दबा सकते हैं या खाद की मात्रा, कीट लक्षण अथवा मालभाड़ा गणना के बारे में पूछ सकते हैं!`,
    timestamp: 'Just now',
    badgeEn: 'KISANMITRA AI ACTIVE',
    badgeHi: 'किसानमित्र AI सक्रिय',
    actionButtons: [
      { labelEn: '📷 Diagnose Leaves', labelHi: '📷 पत्ता जांचें', actionTab: 'crop-doctor' },
      { labelEn: '📊 Best Mandi Rates', labelHi: '📊 मंडी भाव जांचें', actionTab: 'market' },
      { labelEn: '💡 Sell Smart Plan', labelHi: '💡 बिक्री योजना', actionTab: 'sell-smart' }
    ]
  };
}
