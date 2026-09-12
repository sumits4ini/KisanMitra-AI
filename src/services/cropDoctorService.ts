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
  },
};

export async function analyzeCropImage(
  crop: 'Tomato' | 'Wheat' | 'Rice' | 'Cotton' | 'Mustard' | 'Potato',
  imageUrl: string
): Promise<DiagnosisResult> {
  // Simulate AI network/inference latency (1.2 seconds for realistic feel)
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

  // Default to Early Blight for tomato or generic crop demonstration
  return {
    ...DIAGNOSIS_DATABASE['Tomato_EarlyBlight'],
    crop,
    cropHindi: crop === 'Tomato' ? 'टमाटर' : crop,
    imageUrl,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
