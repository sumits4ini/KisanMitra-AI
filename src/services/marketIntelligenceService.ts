import type { MandiOption, MandiCalculationResult } from '../types';

export interface MarketCropConfig {
  id: string;
  nameEn: string;
  nameHi: string;
  modalBasePrice: number;
  unit: string;
  unitHi: string;
  shelfLifeDays: number;
  shelfLifeNoteEn: string;
  shelfLifeNoteHi: string;
}

export const SUPPORTED_CROPS_FOR_MARKET: MarketCropConfig[] = [
  {
    id: 'Tomato',
    nameEn: 'Tomato',
    nameHi: 'टमाटर',
    modalBasePrice: 2000,
    unit: 'quintal',
    unitHi: 'क्विंटल',
    shelfLifeDays: 3,
    shelfLifeNoteEn: 'Perishable. Recommend selling within 2-3 days under normal storage.',
    shelfLifeNoteHi: 'जल्दी खराब होने वाली फसल। सामान्य भंडारण में 2-3 दिनों के भीतर बेचें।'
  },
  {
    id: 'Wheat',
    nameEn: 'Wheat',
    nameHi: 'गेहूं',
    modalBasePrice: 2350,
    unit: 'quintal',
    unitHi: 'क्विंटल',
    shelfLifeDays: 180,
    shelfLifeNoteEn: 'Non-perishable grain. Can be held for price surges if dry storage is available.',
    shelfLifeNoteHi: 'गैर-नाशवान अनाज। सूखा गोदाम उपलब्ध होने पर भाव बढ़ने तक रोका जा सकता है।'
  },
  {
    id: 'Rice',
    nameEn: 'Rice (Basmati)',
    nameHi: 'चावल (बासमती)',
    modalBasePrice: 3950,
    unit: 'quintal',
    unitHi: 'क्विंटल',
    shelfLifeDays: 360,
    shelfLifeNoteEn: 'Aged grain fetches premium. High flexibility in selling schedule.',
    shelfLifeNoteHi: 'पुराना धान/चावल प्रीमियम दाम दिलाता है। बेचने के समय में पूरी छूट।'
  },
  {
    id: 'Mustard',
    nameEn: 'Mustard',
    nameHi: 'सरसों',
    modalBasePrice: 5600,
    unit: 'quintal',
    unitHi: 'क्विंटल',
    shelfLifeDays: 240,
    shelfLifeNoteEn: 'Oilseed crop. Stable market with MSP support and oil mill demand.',
    shelfLifeNoteHi: 'तिलहन फसल। एमएसपी समर्थन और तेल मिलों की मजबूत मांग।'
  },
  {
    id: 'Potato',
    nameEn: 'Potato',
    nameHi: 'आलू',
    modalBasePrice: 1200,
    unit: 'quintal',
    unitHi: 'क्विंटल',
    shelfLifeDays: 30,
    shelfLifeNoteEn: 'Moderate shelf life. Cold storage extends market window significantly.',
    shelfLifeNoteHi: 'मध्यम भंडारण अवधि। कोल्ड स्टोर में रखने से बिक्री का समय बढ़ जाता है।'
  },
  {
    id: 'Cotton',
    nameEn: 'Cotton',
    nameHi: 'कपास',
    modalBasePrice: 7100,
    unit: 'quintal',
    unitHi: 'क्विंटल',
    shelfLifeDays: 120,
    shelfLifeNoteEn: 'Commercial cash crop. Ginning mills drive local mandi price fluctuations.',
    shelfLifeNoteHi: 'व्यावसायिक नकदी फसल। जिनिंग मिलों की मांग से दैनिक भाव तय होते हैं।'
  }
];

export const DEMO_FARMER_LOCATIONS = [
  'Karnal, Haryana',
  'Kurukshetra, Haryana',
  'Panipat, Haryana',
  'Sonipat, Haryana',
  'Ambala, Haryana',
  'Rohtak, Haryana'
];

/**
 * Returns nearby mandi templates for a chosen crop and location.
 * Uses exact values requested for Tomato 20 quintals:
 * Market A: ₹2,000/qtl, 18 km, Transport ₹2,500
 * Market B: ₹2,250/qtl, 45 km, Transport ₹4,000
 * Market C: ₹1,900/qtl, 10 km, Transport ₹1,500
 */
export function getMandiTemplatesForCrop(cropName: string, _location: string): MandiOption[] {
  const crop = SUPPORTED_CROPS_FOR_MARKET.find(
    c => c.id.toLowerCase() === cropName.toLowerCase()
  ) || SUPPORTED_CROPS_FOR_MARKET[0];

  const basePrice = crop.modalBasePrice;

  // Price ratios relative to Market A (Karnal Mandi)
  // Market A = basePrice (e.g. 2000 for tomato)
  // Market B = basePrice * 1.125 (e.g. 2250 for tomato)
  // Market C = basePrice * 0.95 (e.g. 1900 for tomato)
  const priceA = basePrice;
  const priceB = Math.round(basePrice * 1.125);
  const priceC = Math.round(basePrice * 0.95);

  return [
    {
      id: 'mandi_karnal',
      code: 'Market A',
      codeHindi: 'मंडी क',
      name: 'Karnal APMC Mandi',
      nameHindi: 'करनाल अनाज व सब्जी मंडी',
      distanceKm: 18,
      pricePerQuintal: priceA,
      trend: 'stable',
      trendPercent: 0,
      mandiCessPercent: 1.5,
      handlingPerQuintal: 15,
      fixedTransportBase: 2500 // for 20 quintals
    },
    {
      id: 'mandi_azadpur',
      code: 'Market B',
      codeHindi: 'मंडी ख',
      name: 'Azadpur Terminal Mandi, Delhi',
      nameHindi: 'आज़ादपुर टर्मिनल मंडी, दिल्ली',
      distanceKm: 45,
      pricePerQuintal: priceB,
      trend: 'up',
      trendPercent: 8,
      mandiCessPercent: 1.5,
      handlingPerQuintal: 20,
      fixedTransportBase: 4000 // for 20 quintals
    },
    {
      id: 'mandi_sonipat',
      code: 'Market C',
      codeHindi: 'मंडी ग',
      name: 'Sonipat Sub-Mandi',
      nameHindi: 'सोनीपत उप-मंडी',
      distanceKm: 10,
      pricePerQuintal: priceC,
      trend: 'down',
      trendPercent: -2,
      mandiCessPercent: 1.0,
      handlingPerQuintal: 12,
      fixedTransportBase: 1500 // for 20 quintals
    }
  ];
}

/**
 * Scale transport cost based on quantity.
 * When quantity is exactly 20 quintals, returns the exact fixed base transport:
 * Market A: 2500, Market B: 4000, Market C: 1500.
 */
export function calculateTransportCost(baseTransportFor20Qtl: number, quantity: number): number {
  if (quantity <= 0) return 0;
  if (quantity === 20) return baseTransportFor20Qtl;

  // Economy of scale exponent (freight cost scales with sub-linear power 0.68)
  const scale = Math.pow(quantity / 20, 0.68);
  const rawCost = baseTransportFor20Qtl * scale;
  
  // Round to nearest ₹50 for realistic Indian logistics pricing
  return Math.max(500, Math.round(rawCost / 50) * 50);
}

/**
 * Calculates Gross Revenue, Transport Cost, Other Charges, and Estimated Net Return
 * for each mandi, identifies the best option, and gives clear reasoning.
 */
export function calculateAllMarkets(
  cropName: string,
  quantityQuintals: number,
  location: string
): MandiCalculationResult[] {
  const templates = getMandiTemplatesForCrop(cropName, location);
  const qty = Math.max(1, quantityQuintals);

  // 1. Calculate financial details for each mandi
  const computed: MandiCalculationResult[] = templates.map(t => {
    const grossRevenue = qty * t.pricePerQuintal;
    const transportCost = calculateTransportCost(t.fixedTransportBase, qty);
    
    // Other Estimated Charges: Mandi cess + unloading/handling + weighing slip
    const mandiCess = Math.round(grossRevenue * (t.mandiCessPercent / 100));
    const handlingCost = Math.round(qty * t.handlingPerQuintal);
    const weighingFee = 50; // standard electronic weighbridge slip
    const otherCharges = mandiCess + handlingCost + weighingFee;

    const netReturn = grossRevenue - transportCost - otherCharges;
    const netPerQuintal = Math.round(netReturn / qty);

    return {
      ...t,
      quantityQuintals: qty,
      grossRevenue,
      transportCost,
      mandiCess,
      handlingCost,
      weighingFee,
      otherCharges,
      netReturn,
      netPerQuintal,
      isBestOption: false,
    };
  });

  // 2. Identify the best option based on highest net return
  let bestIndex = 0;
  let highestNet = computed[0].netReturn;

  for (let i = 1; i < computed.length; i++) {
    if (computed[i].netReturn > highestNet) {
      highestNet = computed[i].netReturn;
      bestIndex = i;
    }
  }

  // Find second best for comparison
  const sorted = [...computed].sort((a, b) => b.netReturn - a.netReturn);
  const secondBestNet = sorted[1] ? sorted[1].netReturn : sorted[0].netReturn;
  const additionalProfit = highestNet - secondBestNet;

  // Mark best option and attach bilingual reasoning
  computed[bestIndex].isBestOption = true;
  computed[bestIndex].additionalProfitVsSecondBest = additionalProfit;

  if (computed[bestIndex].code === 'Market B') {
    computed[bestIndex].bestReasonEn =
      'Higher price produces the best estimated net return after transportation.';
    computed[bestIndex].bestReasonHi =
      'ऊंचा भाव मिलने के कारण ढुलाई खर्च घटाने के बाद भी सबसे अधिक शुद्ध कमाई होती है।';
  } else if (computed[bestIndex].code === 'Market A') {
    computed[bestIndex].bestReasonEn =
      'Moderate distance and balanced mandi charges produce the highest net return in hand.';
    computed[bestIndex].bestReasonHi =
      'संतुलित दूरी और कम खर्च के कारण यह मंडी हाथ में सबसे ज्यादा शुद्ध मुनाफा देती है।';
  } else {
    computed[bestIndex].bestReasonEn =
      'Minimal transport distance protects your margins for this harvest volume.';
    computed[bestIndex].bestReasonHi =
      'न्यूनतम ढुलाई दूरी के कारण आपकी अधिकांश कमाई सुरक्षित रहती है।';
  }

  return computed;
}

/**
 * Prototype disclaimer metadata
 */
export const PROTOTYPE_MARKET_NOTICE = {
  badgeEn: 'PROTOTYPE / DEMO MARKET DATA',
  badgeHi: 'प्रोटोटाइप / डेमो मंडी भाव',
  noticeEn:
    'Simulated APMC / e-NAM benchmark data for hackathon demonstration. Live government mandi API feeds are not connected. Do not present or interpret mock prices as verified live prices.',
  noticeHi:
    'हैकाथॉन प्रदर्शन हेतु एपीएमसी व ई-नाम का सिम्युलेटेड मॉडल डेटा। लाइव सरकारी मंडी एपीआई अभी कनेक्टेड नहीं है। इन काल्पनिक दरों को कानूनी रूप से सत्यापित लाइव भाव न मानें।'
};
