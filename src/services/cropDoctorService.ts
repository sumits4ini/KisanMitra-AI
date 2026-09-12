import type { DiagnosisResult } from '../types';

export const SUPPORTED_CROPS = [
  { id: 'Tomato', nameEn: 'Tomato', nameHi: 'टमाटर', icon: '🍅' },
  { id: 'Wheat', nameEn: 'Wheat', nameHi: 'गेहूं', icon: '🌾' },
  { id: 'Rice', nameEn: 'Rice', nameHi: 'धान (चावल)', icon: '🌱' },
  { id: 'Cotton', nameEn: 'Cotton', nameHi: 'कपास', icon: '☁️' },
  { id: 'Mustard', nameEn: 'Mustard', nameHi: 'सरसों', icon: '🌼' },
  { id: 'Potato', nameEn: 'Potato', nameHi: 'आलू', icon: '🥔' },
] as const;

export interface SampleLeaf {
  id: string;
  nameEn: string;
  nameHi: string;
  crop: 'Tomato' | 'Wheat' | 'Rice' | 'Cotton' | 'Mustard' | 'Potato';
  expectedDiseaseEn: string;
  expectedDiseaseHi: string;
  imageUrl: string;
  tag: string;
}

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample_tomato_early_blight',
    nameEn: 'Tomato - Early Blight Disease',
    nameHi: 'टमाटर - अगेती झुलसा रोग',
    crop: 'Tomato',
    expectedDiseaseEn: 'Early Blight',
    expectedDiseaseHi: 'अगेती झुलसा (Early Blight)',
    imageUrl: '/images/leaf_early_blight.jpg',
    tag: 'Fungal Infection',
  },
  {
    id: 'sample_wheat_rust',
    nameEn: 'Wheat - Stripe Rust Disease',
    nameHi: 'गेहूं - पीला रतुआ (Stripe Rust)',
    crop: 'Wheat',
    expectedDiseaseEn: 'Stripe Rust',
    expectedDiseaseHi: 'पीला रतुआ (Stripe Rust)',
    imageUrl: '/images/leaf_wheat_rust.jpg',
    tag: 'Fungal Infection',
  },
  {
    id: 'sample_tomato_healthy',
    nameEn: 'Tomato - Healthy Clean Leaf',
    nameHi: 'टमाटर - स्वस्थ निरोगी पत्ता',
    crop: 'Tomato',
    expectedDiseaseEn: 'Healthy Leaf',
    expectedDiseaseHi: 'स्वस्थ पत्ता (कोई रोग नहीं)',
    imageUrl: '/images/leaf_healthy.jpg',
    tag: 'Disease Free',
  },
];

export const DIAGNOSIS_DATABASE: Record<string, DiagnosisResult> = {
  'Tomato_EarlyBlight': {
    id: 'diag_tomato_early_blight',
    crop: 'Tomato',
    cropHindi: 'टमाटर',
    disease: 'Early Blight',
    diseaseHindi: 'अगेती झुलसा (Early Blight)',
    scientificName: 'Alternaria solani',
    confidence: 93,
    severity: 'Moderate',
    severityHindi: 'मध्यम',
    healthScore: 68,
    symptomsEn: [
      'Dark brown circular necrotic spots with distinct concentric rings (target-board pattern)',
      'Yellow chlorotic halo surrounding the lesions',
      'Lower and older leaves affected first, progressing upward',
      'Premature leaf drop causing sunscald risk on exposed fruits'
    ],
    symptomsHi: [
      'निचले पत्तों पर गहरे भूरे रंग के गोल छल्लेदार धब्बे (टारगेट बोर्ड की तरह)',
      'धब्बों के चारों ओर पीला घेरा (क्लोरोसिस)',
      'पुराने व निचले पत्ते पहले प्रभावित होते हैं, फिर रोग ऊपर बढ़ता है',
      'पत्ते झड़ने से धूप के कारण फलों के खराब होने का खतरा'
    ],
    contributingConditionsEn: [
      'High ambient relative humidity (>80%) accompanied by warm temperatures (24°C - 29°C)',
      'Extended leaf wetness from morning dew or overhead sprinkler irrigation',
      'Poor canopy air circulation in densely planted tomato rows',
      'Soil splash transferring overwintered fungal spores onto lower leaves'
    ],
    contributingConditionsHi: [
      'अधिक वातावरणीय आर्द्रता (>80%) व गर्म तापमान (24°C - 29°C)',
      'सुबह की ओस या फव्वारा सिंचाई के कारण पत्तों पर देर तक पानी टिकना',
      'घने पौधों के बीच हवा का उचित प्रवाह न होना',
      'सिंचाई या बारिश के छींटों से मिट्टी में मौजूद फफूंद का पत्तों पर आना'
    ],
    whyAiDetectedEn: 'The neural diagnostic model detected characteristic concentric rings (target spots) isolated on foliar tissue with a 93% match to Alternaria solani pathological signatures, along with marginal chlorosis and typical lower-canopy distribution.',
    whyAiDetectedHi: 'AI मॉडल ने पत्ते की सतह पर विशिष्ट गोल छल्लेदार नेक्रोटिक धब्बों (टारगेट पैटर्न) और पीले घेरे की पहचान की, जो 93% सटीकता के साथ अल्टरनेरिया सोलानी (अगेती झुलसा फफूंद) के लक्षणों से मेल खाता है।',
    imageUrl: '/images/leaf_early_blight.jpg',
    timestamp: new Date().toLocaleDateString(),
    
    // Phase 4: Treatment & Prevention
    whatHappenedEn: 'A fungal pathogen (Alternaria solani) has entered the lower foliage. It attacks older leaves first and spreads upward rapidly during warm, humid weather if left unchecked.',
    whatHappenedHi: 'अल्टरनेरिया नामक फफूंद ने पौधे के निचले पत्तों में प्रवेश कर लिया है। यह गर्म और नम मौसम में तेजी से ऊपर के स्वस्थ पत्तों और फलों में फैलता है।',
    immediateActionsEn: [
      'Prune severely infected lower leaves immediately and dispose of them outside the field (burn or deeply bury, do not compost).',
      'Sterilize pruning shears with mild antiseptic solution between plants to prevent mechanical spore transfer.',
      'Cease all overhead watering or sprinkler irrigation immediately; switch exclusively to ground drip.'
    ],
    immediateActionsHi: [
      'अधिक संक्रमित निचले पत्तों को तुरंत काटकर खेत से दूर नष्ट करें या जमीन में दबा दें (इन्हें खाद के गड्ढे में न डालें)।',
      'काटने वाले औजारों को साफ रखें ताकि रोग एक पौधे से दूसरे पौधे में न फैले।',
      'ऊपरी फव्वारा सिंचाई तुरंत बंद करें; केवल जड़ में ड्रिप द्वारा पानी दें ताकि पत्ते सूखे रहें।'
    ],
    preventionEn: [
      'Maintain 60cm row-to-row spacing and stake plants to ensure adequate ventilation and sunlight penetration.',
      'Apply organic straw or plastic mulch around plant bases to prevent soil-splash from reaching foliage during rain.',
      'Practice crop rotation next season with non-solanaceous crops (such as maize, wheat, or legumes).'
    ],
    preventionHi: [
      'पौधों के बीच उचित दूरी (60 सेमी) रखें और पौधों को सहारा दें ताकि धूप और हवा का आवागमन बना रहे।',
      'जड़ों के पास पुआल या मल्चिंग बिछाएं ताकि बारिश के छींटों से मिट्टी के फफूंद पत्तों तक न पहुंचें।',
      'अगले मौसम में फसल चक्र अपनाएं (टमाटर की जगह मक्का, गेहूं या दलहनी फसलें लगाएं)।'
    ],
    treatmentGuidance: [
      {
        categoryEn: 'Contact Protective Fungicide (Copper / Mancozeb Group)',
        categoryHi: 'संपर्क सुरक्षात्मक फफूंदनाशक (कॉपर या मेंकोजेब समूह)',
        purposeEn: 'Creates a preventive protective shield over healthy foliage to stop new fungal spore germination.',
        purposeHi: 'स्वस्थ पत्तों की सतह पर एक सुरक्षात्मक परत बनाता है जिससे नए फफूंद बीजाणु अंकुरित नहीं हो पाते।',
        applicationGuidanceEn: 'Use only a locally approved product according to its label. Spray during calm morning or late afternoon hours. Thoroughly coat both upper and lower leaf surfaces.',
        applicationGuidanceHi: 'केवल उत्पाद लेबल के अनुसार अनुमोदित ब्रांड का उपयोग करें। सुबह या शाम के समय छिड़काव करें और पत्तों के दोनों तरफ अच्छी तरह दवा पहुंचाएं।',
        precautionsEn: 'Wear protective gloves and mask. Avoid spraying if rain is expected within 24-48 hours. Observe the pre-harvest interval (PHI) mentioned on the bottle.',
        precautionsHi: 'दवा छिड़कते समय दस्ताने और मास्क अवश्य पहनें। बारिश की संभावना हो तो छिड़काव न करें। फसल तुड़ाई से पहले लेबल पर दी गई प्रतीक्षा अवधि का पालन करें।',
      },
      {
        categoryEn: 'Systemic Curative Fungicide (Azoxystrobin or Difenoconazole Group)',
        categoryHi: 'अन्तर्प्रवाही उपचारक फफूंदनाशक (एजॉक्सीस्ट्रोबिन या डाइफेनोकोनाजोल समूह)',
        purposeEn: 'Penetrates leaf tissues to halt active fungal mycelium growth inside moderately affected plant foliage.',
        purposeHi: 'पत्ते के आंतरिक ऊतकों में पहुंचकर सक्रिय फफूंद की वृद्धि को रोकता है।',
        applicationGuidanceEn: 'Use only a locally approved product according to its label. Consult your local agricultural extension officer for regional approval and resistance rotation.',
        applicationGuidanceHi: 'केवल उत्पाद लेबल पर दिए गए निर्देशों के अनुसार उपयोग करें। क्षेत्रीय अनुशंसा और दवा के प्रति प्रतिरोधक क्षमता से बचने के लिए कृषि अधिकारी से सलाह लें।',
        precautionsEn: 'Do not use more than twice successively to prevent fungal resistance. Keep spray tanks clean and rinse thoroughly.',
        precautionsHi: 'लगातार दो बार से अधिक एक ही वर्ग की दवा न डालें। स्प्रे पंप को छिड़काव के बाद अच्छी तरह साफ करें।',
      },
      {
        categoryEn: 'Organic / Bio-Control Alternative (Trichoderma / Neem Oil Extract)',
        categoryHi: 'जैविक / बायो-कंट्रोल विकल्प (ट्राइकोडर्मा / नीम तेल अर्क)',
        purposeEn: 'Natural antagonistic bio-agent that suppresses fungal pathogens organically without chemical residues.',
        purposeHi: 'प्राकृतिक सूक्ष्मजीवी जो रासायनिक अवशेष के बिना फफूंद को स्वाभाविक रूप से दबाते हैं।',
        applicationGuidanceEn: 'Use certified bio-fungicide according to label instructions. Mix with clean, non-chlorinated water.',
        applicationGuidanceHi: 'प्रमाणित जैविक फफूंदनाशक का लेबल अनुसार उपयोग करें। साफ पानी में मिलाकर छिड़कें।',
        precautionsEn: 'Do not mix bio-agents directly with chemical fungicides in the same tank.',
        precautionsHi: 'जैविक एजेंटों को रासायनिक फफूंदनाशक के साथ एक ही टंकी में न मिलाएं।',
      },
    ],
    recheckDays: 3,
    recheckGuidanceEn: 'Re-inspect the lower canopy after 3 days. Check if lesions have dried into dark brown margins with no new yellow halos on upper leaves.',
    recheckGuidanceHi: '3 दिन बाद निचले पत्तों की पुनः जांच करें। देखें कि क्या धब्बे सूख गए हैं और ऊपर के नए पत्तों पर कोई पीला घेरा तो नहीं बन रहा।',
    recommendedActionEn: 'Prune infected lower leaves and spray approved contact protective fungicide as per product label.',
    recommendedActionHi: 'संक्रमित पत्ते काटकर हटाएं और अनुमोदित फफूंदनाशक का लेबल अनुसार छिड़काव करें।',
  },

  'Wheat_StripeRust': {
    id: 'diag_wheat_stripe_rust',
    crop: 'Wheat',
    cropHindi: 'गेहूं',
    disease: 'Stripe Rust (Yellow Rust)',
    diseaseHindi: 'पीला रतुआ (Stripe Rust)',
    scientificName: 'Puccinia striiformis',
    confidence: 92,
    severity: 'Moderate',
    severityHindi: 'मध्यम',
    healthScore: 71,
    symptomsEn: [
      'Linear bright yellow-orange pustules arranged in parallel stripes along leaf veins',
      'Powdery yellow spores rubbing off easily on fingertips',
      'Leaf chlorosis and rapid desiccation under warm sunny conditions'
    ],
    symptomsHi: [
      'पत्ते की नसों के समानांतर पीली-नारंगी धारियों में छोटे उभरे हुए दाने (पस्ट्यूल्स)',
      'उंगलियों से छूने पर पीला चूर्ण आसानी से हाथ पर लगना',
      'धूप निकलने पर पत्ते का तेजी से सूखना और पीला पड़ना'
    ],
    contributingConditionsEn: [
      'Cool temperatures (10°C - 15°C) followed by intermittent sunny periods',
      'Frequent fog, heavy dew, or prolonged moisture on wheat canopy'
    ],
    contributingConditionsHi: [
      'ठंडा मौसम (10°C - 15°C) और लगातार कोहरा या ओस',
      'खेत में नमी का लंबे समय तक रुकना'
    ],
    whyAiDetectedEn: 'AI visual pattern matching detected linear stripe formations of fungal uredinia with 92% similarity to Puccinia striiformis infection vectors.',
    whyAiDetectedHi: 'AI ने गेहूं की पत्ती पर समानांतर धारियों में फैले पीले फफूंद बीजाणुओं की पहचान 92% सटीकता के साथ पीले रतुआ रोग के रूप में की।',
    imageUrl: '/images/leaf_wheat_rust.jpg',
    timestamp: new Date().toLocaleDateString(),

    whatHappenedEn: 'Airborne fungal spores of Stripe Rust (Puccinia striiformis) have settled and produced linear pustules on the wheat leaves. If the weather remains cool and humid, it can rapidly reduce grain filling capacity.',
    whatHappenedHi: 'पीले रतुआ के बीजाणु हवा के जरिए गेहूं के पत्तों पर फैल गए हैं। यदि मौसम ठंडा व नम रहा तो यह दानों के भराव को काफी कम कर सकता है।',
    immediateActionsEn: [
      'Identify isolated yellow spots in the field immediately to prevent wide-scale airborne spore dissemination.',
      'Avoid high doses of top-dressed nitrogen fertilizer which makes foliar tissues more succulent and susceptible.',
      'Check irrigation scheduling to prevent excess field dampness during foggy spells.'
    ],
    immediateActionsHi: [
      'खेत में जहां शुरुआती पीले धब्बे दिखें, उस हिस्से की तुरंत पहचान करें ताकि हवा से बीजाणु पूरे खेत में न फैलें।',
      'यूरिया का अत्यधिक छिड़काव न करें, क्योंकि अधिक नाइट्रोजन से पत्ते कोमल होकर रोग के प्रति अधिक संवेदनशील हो जाते हैं।',
      'कोहरे के समय अधिक पानी देने से बचें।'
    ],
    preventionEn: [
      'Plant certified rust-resistant wheat varieties (such as HD-3086, DBW-187, DBW-303) recommended for your agro-climatic zone.',
      'Adhere strictly to recommended sowing windows to avoid late-season humidity overlap.',
      'Maintain regular field scoutings during January and February.'
    ],
    preventionHi: [
      'अपने क्षेत्र के लिए अनुशंसित पीला रतुआ प्रतिरोधी किस्में (जैसे HD-3086, DBW-187, DBW-303) ही बोएं।',
      'समय पर बुवाई करें ताकि फसल देर की नमी और कोहरे की चपेट में न आए।',
      'जनवरी व फरवरी माह में खेत की नियमित निगरानी रखें।'
    ],
    treatmentGuidance: [
      {
        categoryEn: 'Systemic Triazole Fungicide Group (Propiconazole / Tebuconazole)',
        categoryHi: 'अन्तर्प्रवाही ट्रायजोल फफूंदनाशक समूह (प्रोपिकोनाजोल या टेबुकोनाजोल)',
        purposeEn: 'Halts fungal spore germination and rapidly halts stripe pustule expansion across the leaf flag.',
        purposeHi: 'बीजाणुओं के अंकुरण को रोकता है और पत्तों पर पीली धारियों के फैलाव को तुरंत थामता है।',
        applicationGuidanceEn: 'Use only locally approved product according to its label. Spray uniformly with 200 liters of water per acre using a flat-fan nozzle.',
        applicationGuidanceHi: 'केवल उत्पाद लेबल के अनुसार स्वीकृत उत्पाद का उपयोग करें। प्रति एकड़ 200 लीटर पानी में फ्लैट-फैन नोजल से समान रूप से छिड़कें।',
        precautionsEn: 'Do not spray during strong winds to prevent drift. Wear personal protective equipment. Respect the waiting period before harvest.',
        precautionsHi: 'तेज हवा में छिड़काव न करें। सुरक्षा चश्मा व मास्क पहनें। कटाई पूर्व प्रतीक्षा अवधि का ध्यान रखें।',
      }
    ],
    recheckDays: 4,
    recheckGuidanceEn: 'Re-inspect wheat flag leaves after 4 days. Active powdery yellow pustules should turn into inactive dark brown dry streaks.',
    recheckGuidanceHi: '4 दिन बाद झंडा पत्ती (Flag leaf) की जांच करें। सक्रिय पीला चूर्ण सूखकर गहरे भूरे रंग की निष्प्रभावी धारियों में बदल जाना चाहिए।',
    recommendedActionEn: 'Spray approved triazole fungicide as per product label instructions at first sign of stripe rust.',
    recommendedActionHi: 'लक्षण दिखते ही उत्पाद लेबल के अनुसार अनुमोदित ट्रायजोल फफूंदनाशक का छिड़काव करें।',
  },

  'Tomato_Healthy': {
    id: 'diag_tomato_healthy',
    crop: 'Tomato',
    cropHindi: 'टमाटर',
    disease: 'Healthy Foliage',
    diseaseHindi: 'स्वस्थ पत्ता (कोई रोग नहीं)',
    confidence: 97,
    severity: 'None (Healthy)',
    severityHindi: 'उत्तम (रोगमुक्त)',
    healthScore: 94,
    symptomsEn: [
      'Vibrant deep green coloration with intact cellular margins',
      'No chlorotic lesions, necrotic spots, or curling observed',
      'Clear, clean vascular leaf veins and healthy turgor pressure'
    ],
    symptomsHi: [
      'पत्ता पूर्णतः गहरा हरा और स्वस्थ है',
      'किसी प्रकार का पीलापन, धब्बे या पत्ता मुड़ने के लक्षण नहीं हैं',
      'नसें स्वच्छ और पूर्ण विकसित हैं'
    ],
    contributingConditionsEn: [
      'Optimal plant nutrition with balanced N-P-K and micronutrients',
      'Good field drainage and proper drip irrigation schedule',
      'Adequate air circulation preventing fungal spore incubation'
    ],
    contributingConditionsHi: [
      'संतुलित खाद व सूक्ष्म पोषक तत्वों का उचित स्तर',
      'खेत में उत्तम जल निकासी और ड्रिप सिंचाई व्यवस्था',
      'पर्याप्त धूप और पौधों के बीच खुली हवा'
    ],
    whyAiDetectedEn: 'Color distribution analysis and edge-detection neural filters identified 97.4% uniform chlorophyll saturation without necrotic micro-lesions, confirming healthy foliar tissue.',
    whyAiDetectedHi: 'AI इमेज फिल्टर ने 97% से अधिक समान क्लोरोफिल घनत्व और स्वच्छ बनावट पाई, जिससे पुष्टि होती है कि पत्ता पूरी तरह निरोगी है।',
    imageUrl: '/images/leaf_healthy.jpg',
    timestamp: new Date().toLocaleDateString(),

    whatHappenedEn: 'Your crop leaf is healthy and in peak condition with no pathological infections detected.',
    whatHappenedHi: 'आपकी फसल का पत्ता पूरी तरह स्वस्थ है और किसी भी रोग या कीट का कोई लक्षण नहीं है।',
    immediateActionsEn: [
      'No chemical spray or intervention needed. Continue regular balanced farm practices.',
      'Maintain standard drip irrigation according to weather conditions.'
    ],
    immediateActionsHi: [
      'किसी भी रासायनिक छिड़काव की आवश्यकता नहीं है। सामान्य कृषि क्रियाएं जारी रखें।',
      'मौसम के अनुसार नियमित ड्रिप सिंचाई बनाए रखें।'
    ],
    preventionEn: [
      'Continue proactive weekly crop scouting to catch any early signs of pests or disease.',
      'Keep field borders free of weeds that could harbor virus vectors like whiteflies.'
    ],
    preventionHi: [
      'साप्ताहिक निरीक्षण जारी रखें ताकि किसी भी कीट या रोग के शुरुआती लक्षण तुरंत पकड़े जा सकें।',
      'खेत की मेड़ों को खरपतवार मुक्त रखें।'
    ],
    treatmentGuidance: [],
    recheckDays: 7,
    recheckGuidanceEn: 'Conduct standard routine inspection after 7 days.',
    recheckGuidanceHi: '7 दिन बाद सामान्य नियमित निरीक्षण करें।',
    recommendedActionEn: 'Maintain regular field management. No fungicide treatment required.',
    recommendedActionHi: 'नियमित देखभाल जारी रखें। किसी फफूंदनाशक की आवश्यकता नहीं है।',
  },
};

export async function analyzeCropImage(
  crop: 'Tomato' | 'Wheat' | 'Rice' | 'Cotton' | 'Mustard' | 'Potato',
  imageUrl: string
): Promise<DiagnosisResult> {
  await new Promise(resolve => setTimeout(resolve, 1200));

  if (imageUrl.includes('wheat') || crop === 'Wheat') {
    return {
      ...DIAGNOSIS_DATABASE['Wheat_StripeRust'],
      imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  if (imageUrl.includes('healthy')) {
    return {
      ...DIAGNOSIS_DATABASE['Tomato_Healthy'],
      crop,
      imageUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }

  return {
    ...DIAGNOSIS_DATABASE['Tomato_EarlyBlight'],
    crop,
    cropHindi: crop === 'Tomato' ? 'टमाटर' : crop,
    imageUrl,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
