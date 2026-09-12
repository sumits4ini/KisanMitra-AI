# KisanMitra AI

> **"From Crop Health to Better Markets"**

[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 1. Overview

**KisanMitra AI** is an AI-powered agricultural assistance platform designed to help farmers make better decisions from crop health to market selling. It combines AI-based crop disease diagnosis, treatment and prevention guidance, crop health tracking, market comparison, transportation-aware return estimation, and intelligent sell-now-or-wait recommendations in one farmer-friendly platform.

Built with a mobile-first, bilingual (English and Hindi) design, KisanMitra AI bridges the critical gap between on-field agronomy and post-harvest market economics for smallholder and commercial farmers.

---

## 2. Problem

Indian farmers face two disconnected bottlenecks that severely impact their livelihood:

1. **Agronomic Risk:** Crop diseases and pests are often diagnosed too late, leading to improper chemical applications, excessive input costs, crop loss, and reduced produce quality.
2. **Market Asymmetry & Inefficient Selling:** Farmers typically sell at the nearest local mandi without visibility into prices at regional terminal markets, unaware of whether higher quoted rates will offset the cost of transport, handling, and market charges. Furthermore, lack of price trend forecasts causes farmers to panic-sell immediately upon harvest rather than timing sales for optimal return.

---

## 3. Solution

KisanMitra AI unites agronomy and agricultural economics into a seamless, 5-step decision cycle:

$$\text{Detect Crop Problems} \longrightarrow \text{Protect the Crop} \longrightarrow \text{Find Best Market} \longrightarrow \text{Maximize Net Return}$$

By combining image-based crop pathology with transportation-adjusted market analytics and shelf-life-aware selling strategies, KisanMitra AI ensures farmers protect their yields and keep the highest possible net profit in hand.

---

## 4. Key Features

### 🩺 Crop Doctor AI
- **Crop Leaf Image Analysis:** Upload or snap high-resolution leaf photos.
- **Disease Detection:** Identifies early blight, stripe rust, leaf spots, and physiological stresses.
- **Confidence & Severity Scoring:** Transparent neural diagnostic confidence percentage and severity classification (Mild, Moderate, High, Severe).
- **Crop Health Score:** Real-time numerical health score out of 100.
- **Diagnostic Transparency:** Expandable explanation detailing leaf symptoms and contributing weather factors (e.g., humidity, rainfall).
- **Actionable Treatment & Prevention:** Immediate cultural hygiene, approved biological treatments, and protective foliar sprays.
- **Recheck Reminders:** Schedule 3-day follow-up leaf inspections.

### 📊 Market Intelligence
- **Multi-Market Comparison:** Compare benchmark rates across multiple local and regional APMC mandis simultaneously.
- **Distance & Freight Calculation:** Transparent vehicle-specific freight deductions (pickup, tractor-trolley) based on road distance.
- **Net Return Optimization:** Emphasizes **Best Estimated Return** after transport, handling, and mandi fees—not merely highest nominal price.
- **Interactive Simulation:** Adjust crop type, harvest volume (quintals), and farm origin to see instant recalculations.

### 💡 Sell Smart AI
- **"Should I Sell Now?" Decision Engine:** Evaluates current spot rates, projected 24–48h price trends, perishability/shelf life, on-farm storage, freight costs, and wholesale demand.
- **Dynamic Advice:** Provides clear strategic recommendations: `SELL NOW`, `WAIT 1–2 DAYS`, or `WAIT 1–2 DAYS (OR PARTIAL SALE)`.
- **Smart Selling Plan:** Generates multi-phase dispatch schedules (e.g., 60% sold today for immediate cash flow; 40% held 1–2 days for peak terminal auction).
- **Return Differential:** Displays estimated current return vs. optimized return and calculates the potential net profit gain.

### 🤖 KisanMitra AI Assistant
- **Bilingual Agronomic Companion:** Conversational assistance in both English and natural, respectful Hindi.
- **Context-Aware Responses:** Integrates the farmer's active crops, recent pathology detections, and local mandi prices into advice.
- **One-Tap Inquiries:** Instant answers for common farmer questions regarding yellowing leaves, market selection, selling timing, and spray protocols.
- **Extension Hotline Access:** Direct links to the national Kisan Call Centre (Toll-Free 1800-180-1551).

### 🌾 My Crops & Digital Health Record
- **Farm Plot Overview:** Monitor acreage, variety, current health score, and disease risk across all plots.
- **Health Progression Trends:** Visual tracking of plot health over time.
- **Diagnosis & Treatment Log:** Persistent chronological record of past diagnoses, actions taken, and scheduled rechecks.

### 🔔 Notifications & Farm Alerts
- Categorized alerts for disease pathogen risks, sudden mandi price spikes, upcoming weather changes, and scheduled crop check reminders.

---

## 5. How It Works

KisanMitra AI organizes farmer operations into 5 intuitive stages:

```
┌─────────────────┐     ┌──────────────────────┐     ┌───────────────────────┐
│  1. Scan Crop   │ ──> │ 2. Understand Issue  │ ──> │ 3. Get Action Guidance│
│ (Leaf Analysis) │     │ (Severity & Score)   │     │ (Approved Treatments) │
└─────────────────┘     └──────────────────────┘     └───────────────────────┘
                                                                 │
                                                                 ▼
┌─────────────────┐     ┌──────────────────────┐     ┌───────────────────────┐
│  5. Sell Smart  │ <── │  4. Compare Mandis   │ <── │ Crop Health Restored  │
│ (Max Net Return)│     │(Transport Deductions)│     │  (Grade-A Produce)    │
└─────────────────┘     └──────────────────────┘     └───────────────────────┘
```

1. **Scan Crop:** Snap a leaf photo or pick a sample leaf for instant inspection.
2. **Understand Problem:** AI identifies pathogen, confidence level, severity, and visual symptoms.
3. **Get Action Guidance:** Receive cultural sanitation steps, bio-controls, approved chemical categories, and precautions.
4. **Compare Markets:** Review nearby mandis, freight transport costs, and net returns.
5. **Sell Smarter:** AI recommends whether to sell immediately, wait 1–2 days, or execute a split selling plan.

---

## 6. Product Workflow

```
LOGIN (Farmer Authentication or Instant Sample Farm Experience)
  │
  ▼
FARMER DASHBOARD
  │── Greeting & Farm Summary (e.g. Ramesh Kumar, 5 Acres, Karnal, Haryana)
  │── Crop Health Overview (Health: 82/100, Disease Risk: Medium, Water: Good)
  │── Today's AI Agronomy Advice & Quick Action Grid
  │── Platform Innovation Pathway & 5-Step Guide
  │── Recent Crop Activity Timeline & Urgent Notifications
  │
  ├─► CROP DOCTOR
  │     └── Select Crop ──► Upload/Choose Photo ──► Neural Scanning Animation
  │     └── AI Diagnosis (Disease, Confidence %, Severity, Health Score)
  │     └── Treatment Guidance (Approved Categories, Precautions, Expert Directory)
  │     └── Auto-Save to Crop History & Schedule Recheck Reminder
  │
  ├─► MY CROPS
  │     └── Crop Cards ──► Health Progressions ──► Diagnostic & Treatment Logs
  │
  ├─► MARKET INTELLIGENCE
  │     └── Input Harvest Quantity & Crop ──► Evaluate 3 Mandis
  │     └── Deduct Freight Distance & Mandi Charges ──► Identify Best Net Return
  │
  ├─► SELL SMART
  │     └── Evaluate 7 Agronomic & Market Variables
  │     └── Recommendation: SELL NOW / WAIT / PARTIAL SALE
  │     └── Smart Selling Plan (Phase 1 immediate + Phase 2 held)
  │     └── Net Profit Uplift Calculation (+₹3,200 extra return)
  │
  ├─► AI ASSISTANT
  │     └── Bilingual Chatbot with suggested agronomy questions & action shortcuts
  │
  └─► NOTIFICATIONS & PROFILE
        └── Categorized Alerts (Disease, Weather, Mandi, Reminders)
        └── Profile Settings, Language Preferences, and Sample Data Reset
```

---

## 7. AI Capabilities

### Computer Vision Pathology Engine
- **Pattern Recognition:** Analyzes concentric circular rings (e.g., *Alternaria solani*), yellow chlorotic halos, and rust pustules.
- **Diagnostic Confidence Score:** Calibrated probability model returning confidence metrics (e.g., 93% on standard solanaceous early blight).
- **Severity Classification:** Multi-tier severity scoring based on percentage of leaf surface necrosis.

### Agronomic Decision Heuristics
- Correlates visual symptom detection with ambient humidity, temperature, and harvest stages to suggest cultural sanitation and approved chemical/biological categories without prescribing unsafe dosages.

---

## 8. Market Intelligence & Pricing Engine

Nominal mandi price does not equal farmer profit. KisanMitra AI calculates net realized return using localized transport economics:

$$\text{Net Return} = (\text{Quantity} \times \text{Price per Quintal}) - \text{Transport Cost} - \text{Mandi Handling Charges}$$

### Benchmark Scenario (20 Quintals Tomato):

| Mandi / Market | Wholesale Rate | Road Distance | Transport Cost | Net In-Hand Return | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Market A (Karnal APMC)** | ₹2,000 / qtl | 18 km | ₹2,500 | ₹36,550 | Local Standard |
| **Market B (Azadpur Terminal)** | ₹2,250 / qtl | 45 km | ₹4,000 | **₹39,875** | **🏆 Best Option (+₹3,325 Net)** |
| **Market C (Sonipat Sub-Mandi)** | ₹1,900 / qtl | 10 km | ₹1,500 | ₹35,830 | Lower Return |

*Result:* Even with ₹1,500 higher freight costs, Market B yields **₹3,325 more net profit** for the farmer due to higher terminal market price realization.

---

## 9. Technology Stack

### Frontend Core
- **Framework:** [React 19](https://react.dev/) (Modern functional architecture with Hooks)
- **Build Tool:** [Vite 8](https://vitejs.dev/) (Sub-second HMR and production bundle optimization)
- **Language:** [TypeScript 6](https://www.typescriptlang.org/) (Strict type-safety across all components and data structures)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (Utility-first responsive design, modern typography, mobile-first touch ergonomics)
- **Iconography:** [Lucide React](https://lucide.dev/) (Modern agricultural, navigation, and diagnostic icons)

### Architecture & State Management
- **Context API:** Dedicated providers for bilingual localization (`LanguageContext`) and application state (`AppContext`).
- **Data Persistence:** Local storage synchronization for farm records, diagnoses, and user settings.
- **Routing:** Lightweight SPA state-based router with full responsive history support and deep navigation tabs.

---

## 10. Project Structure

```
kisanmitra-ai/
├── public/                     # Static assets and sample leaf photographs
│   ├── favicon.svg             # Application logo favicon
│   └── images/                 # High-resolution pathology sample imagery
├── src/
│   ├── assets/                 # Brand assets and graphics
│   ├── components/
│   │   ├── ai-assistant/       # Bilingual conversational AI assistant
│   │   │   └── AIAssistantView.tsx
│   │   ├── auth/               # Commercial login and signup pages
│   │   │   └── LoginPage.tsx
│   │   ├── common/             # Shared layout components
│   │   │   ├── BottomNavigation.tsx   # Mobile bottom navigation bar
│   │   │   ├── LanguageSwitcher.tsx   # Instant EN/HI toggle
│   │   │   ├── LegalModal.tsx         # Privacy, Terms, Contact dialogs
│   │   │   └── Navbar.tsx             # Desktop top navigation & info banner
│   │   ├── crop-doctor/        # AI Crop Doctor scanning & diagnosis suite
│   │   │   ├── CropDoctorView.tsx
│   │   │   ├── CropSelector.tsx
│   │   │   ├── DiagnosisCard.tsx
│   │   │   ├── FindExpertModal.tsx
│   │   │   ├── ImageDropzone.tsx
│   │   │   ├── ScanningOverlay.tsx
│   │   │   └── TreatmentProtectionGuidance.tsx
│   │   ├── dashboard/          # Farmer dashboard components
│   │   │   ├── CropHealthOverview.tsx
│   │   │   ├── DashboardAlerts.tsx
│   │   │   ├── DashboardView.tsx
│   │   │   ├── FarmSummaryHeader.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── QuickActionsGrid.tsx
│   │   │   ├── RecentActivitySection.tsx
│   │   │   └── TodaysAdviceCard.tsx
│   │   ├── market/             # Market intelligence & mandi comparisons
│   │   │   ├── BestMarketCard.tsx
│   │   │   ├── MandiCard.tsx
│   │   │   ├── MarketComparisonTable.tsx
│   │   │   ├── MarketInputsBar.tsx
│   │   │   ├── MarketView.tsx
│   │   │   ├── ProfitCalculatorModal.tsx
│   │   │   └── SellingPlanModal.tsx
│   │   ├── my-crops/           # Digital crop health records & history
│   │   │   ├── CropHealthDetailModal.tsx
│   │   │   └── MyCropsView.tsx
│   │   ├── notifications/      # Alert center (Disease, Weather, Market)
│   │   │   └── NotificationsView.tsx
│   │   ├── profile/            # Farmer profile & farm data management
│   │   │   └── ProfileView.tsx
│   │   └── sell-smart/         # Intelligent selling decisions & split plans
│   │       ├── SellSmartInputsCard.tsx
│   │       ├── SellSmartView.tsx
│   │       ├── ShouldISellHeroCard.tsx
│   │       └── SmartSellingPlanCard.tsx
│   ├── context/
│   │   ├── AppContext.tsx      # Main application state & farmer data provider
│   │   └── LanguageContext.tsx # Bilingual translation provider
│   ├── data/
│   │   └── demoFarmer.ts       # Baseline farm profile (Ramesh Kumar, Haryana)
│   ├── locales/
│   │   ├── en.ts               # Complete English dictionary
│   │   └── hi.ts               # Complete natural Hindi dictionary
│   ├── services/
│   │   ├── aiChatService.ts             # Agronomic conversational engine
│   │   ├── cropDoctorService.ts         # Pathology database & scanning service
│   │   ├── marketIntelligenceService.ts # Freight & net return calculations
│   │   └── sellSmartService.ts          # 7-factor selling decision engine
│   ├── types/
│   │   └── index.ts            # TypeScript definitions for all domains
│   ├── App.tsx                 # Root layout, notifications, and routing
│   ├── index.css               # Global Tailwind CSS styles and theme tokens
│   └── main.tsx                # React application entry point
├── .env.example                # Environment configuration template
├── .gitignore                  # Git exclusions (credentials, node_modules)
├── index.html                  # HTML5 entry point with SEO metadata & fonts
├── package.json                # Project dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel SPA routing rewrite configuration
└── vite.config.ts              # Vite configuration with Tailwind CSS v4
```

---

## 11. Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- `npm` or `yarn`

---

## 12. Environment Variables

KisanMitra AI is designed to run out of the box with zero required external API keys using its built-in benchmark engines.

To configure custom endpoints or keys:

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Configure variables as needed:
   ```ini
   # Application Details
   VITE_APP_NAME="KisanMitra AI"
   VITE_APP_TAGLINE="From Crop Health to Better Markets"
   VITE_APP_VERSION="1.0.0"


---

## 13. Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/kisanmitra-ai.git
   cd kisanmitra-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to explore KisanMitra AI.

---

## 14. Production Build

To compile a minified, production-ready bundle:

```bash
npm run build
```

To locally preview the production build:

```bash
npm run preview
```

---


## 15. Backend & Architecture Integration

KisanMitra AI frontend operates autonomously with high-performance client-side pathology and mandi intelligence modules. When connecting to production microservices (e.g., Python FastAPI for custom PyTorch/TensorFlow models or e-NAM Government API gateways), simply point `VITE_API_BASE_URL` to your backend server.

---

## 16. Safety & Responsible Agricultural Use

- **Pesticide & Treatment Disclaimer:**  
  Treatment and pesticide guidance provided by KisanMitra AI is intended strictly for informational decision support. Farmers must only use products approved for their specific crop and agro-climatic region by national and state agricultural authorities. Always follow the product label instructions for application timing, PPE, and dilution. Consult a certified local agricultural extension officer or Krishi Vigyan Kendra (KVK) specialist before chemical applications.
- **Market & Financial Disclaimer:**  
  Market price trends, freight estimates, and net return calculations are informational estimates and are not guaranteed. Actual spot auction rates at APMC mandis depend on real-time arrival volumes, produce moisture levels, grading, and merchant bidding dynamics.

---


## 17. Future Roadmap

- [ ] **Live Government e-NAM / Agmarknet API Integration** for 2,000+ real-time mandi feeds.
- [ ] **Satellite NDVI Field Health Monitoring** via Sentinel-2 satellite imagery.
- [ ] **Hyperlocal Micro-Weather Forecasting** for rainfall, frost, and spray timing.
- [ ] **Voice Interaction in Regional Indian Dialects** (Bhojpuri, Haryanvi, Punjabi, Marathi).
- [ ] **FPO & Farmer Aggregation Hub** enabling collective bulk transport bookings.
- [ ] **Direct Buyer Connection** linking farmers to institutional buyers and food processors.

---

## 18. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

**KisanMitra AI** &bull; *Empowering Indian Agriculture From Crop Health to Better Markets.*
