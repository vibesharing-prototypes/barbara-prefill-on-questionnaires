# Questionnaire Prefill Feature - POC

A proof-of-concept implementation demonstrating intelligent questionnaire prefilling capabilities with smart field matching, flexible layouts, and side-by-side comparison.

## 🚀 Features

### 🎯 Smart Field Matching
- Automatic field matching using fuzzy search (Fuse.js)
- Confidence scoring (High/Medium/Low)
- Manual override capability
- Real-time statistics and match quality indicators

### 📊 Multiple Data Sources
- **Previous Questionnaire**: Reuse data from prior versions
- **Board Information**: Pull from board management systems
- **File Upload**: CSV/Excel with drag-and-drop
- **URL/API**: Fetch from external sources

### 🔄 Flexible Prefill Layouts
- **Default**: Single answer applies to all participants
- **Individual by Person**: Navigate through each participant's full questionnaire
- **Individual by Question**: View all participants' answers for each question

### 🔍 Comparison & Redlining
- Side-by-side questionnaire comparison
- Visual indicators for new, modified, and removed questions
- Change filtering (show all or only changes)
- Statistics summary

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

## 📖 Demo Flow

### 1. Landing Page
- Navigate to the home page
- Click **"View Demo Questionnaire"** button
- You'll be taken to the 2025 ESG Questionnaire

### 2. Questionnaire Builder Tabs
- **Building**: View questionnaire structure (read-only)
- **Logic**: Coming soon (stub)
- **Prefill**: ⭐ Main feature demonstration
- **Publishing**: Coming soon (stub)

### 3. Prefill Tab - Source Selection (Step 1)

**Option A: Previous Questionnaire**
1. Select "Previous Questionnaire"
2. Choose "2024 ESG Questionnaire" from dropdown
3. Click "Next: Match Fields"

**Option B: Upload CSV**
1. Select "Upload File"
2. Drag & drop a CSV file or click to browse
3. Click "Next: Match Fields"

**Option C: Board Information**
1. Click "Board Information"
2. Click "Next: Match Fields"

### 4. Smart Matching (Step 2)

The system automatically matches fields with confidence scoring:

- **Statistics**: Matched/unmatched counts and average confidence
- **Confidence Badges**:
  - 🟢 Green (High): >80% confidence
  - 🟡 Yellow (Medium): 50-80% confidence
  - 🔴 Red (Low): <50% confidence

**Actions:**
- Re-run Auto Match
- Clear All mappings
- Manual Override via dropdown
- Remove individual mappings

Click **"Next: Configure Prefill"** when satisfied.

### 5. Configure & Review (Step 3)

Choose a layout:

**Default Layout**: Single answer for all participants
**Individual by Person**: Navigate through each participant
**Individual by Question**: See all participants per question

### 6. Comparison Feature

Click **"Compare with Previous Year"** to see:
- Side-by-side layout (2025 vs 2024)
- 🟢 New Questions
- 🟡 Modified Questions
- 🔴 Removed Questions
- Filter: All or Only Changes

## 📁 Project Structure

```
src/
├── components/
│   ├── questionnaire/
│   │   ├── QuestionnaireBuilder.jsx
│   │   ├── tabs/
│   │   │   ├── PrefillTab.jsx           # Main feature
│   │   │   └── ...
│   │   ├── prefill/
│   │   │   ├── SourceSelector.jsx
│   │   │   ├── SmartMatcher.jsx
│   │   │   ├── DefaultPrefillView.jsx
│   │   │   ├── IndividualByPerson.jsx
│   │   │   └── IndividualByQuestion.jsx
│   │   ├── comparison/
│   │   │   └── QuestionnaireCompare.jsx
│   │   └── shared/
│   ├── Hero.jsx
│   └── About.jsx
├── context/
│   └── QuestionnaireContext.jsx
├── hooks/
│   ├── useQuestionnaire.js
│   ├── usePrefillSource.js
│   ├── useSmartMatcher.js
│   └── useComparison.js
├── data/
│   ├── mockQuestionnaires.js
│   ├── mockParticipants.js
│   └── mockPrefillSources.js
└── utils/
```

## 🛠️ Technology Stack

- **React 19**: UI framework
- **Vite 7**: Build tool
- **React Router 7**: Routing
- **MUI v7**: UI components
- **@diligentcorp/atlas-react-bundle**: Design system
- **Fuse.js**: Fuzzy search for smart matching
- **PapaParse**: CSV parsing
- **React Dropzone**: File upload

## ✅ User Stories Demonstrated

✅ Reuse last year's questionnaire
✅ Compare this year vs last year
✅ Redlining changes
✅ Smart matching with confidence scores
✅ Flexible prefill layouts

## ⚠️ POC Limitations

- No backend/API integration
- No authentication
- No real file storage
- Mock data only
- Logic and Publishing tabs are stubs

## 🎨 Atlas Design System

Built with Diligent's Atlas Design System for consistent, accessible UI:
- Atlas React Bundle
- MUI Material components
- Emotion styling
- Responsive design
- ARIA accessibility

## License

Proprietary - Demo purposes only
