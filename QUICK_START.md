# Quick Start Guide

## 🚀 Get Running in 60 Seconds

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start the dev server
npm run dev

# 3. Open your browser
# Navigate to: http://localhost:5173
```

## 🎯 5-Minute Demo Path

### Step 1: Landing Page (10 seconds)
- You'll see the landing page with feature overview
- Click the **"View Demo Questionnaire"** button

### Step 2: Questionnaire Builder (10 seconds)
- You're now viewing the 2025 ESG Questionnaire
- Notice 4 tabs: Building, Logic, **Prefill**, Publishing
- The **Prefill** tab is pre-selected (main feature)

### Step 3: Select Source (30 seconds)
- You'll see 4 source options
- Click on **"Previous Questionnaire"**
- Select **"2024 ESG Questionnaire (2024.1)"** from the dropdown
- Notice the green success message appears
- Click **"Next: Match Fields"**

### Step 4: Smart Matching (1 minute)
- Watch the auto-match run automatically
- See the statistics dashboard:
  - 12 of 12 fields matched
  - ~85% average confidence
  - Breakdown by High/Medium/Low
- Scroll through the mapping table
- Notice the confidence badges (green/yellow/red)
- **Try this**: Click a dropdown to manually override a mapping
- Click **"Next: Configure Prefill"**

### Step 5: Prefill Layouts (2 minutes)
- You'll see 3 layout options
- **Default Layout** is selected
- Scroll through the questions - notice:
  - Prefilled answers have a blue background
  - Prefill indicator badges
- **Try this**: Click **"Individual by Person"**
  - Select different participants from the dropdown
  - Navigate with Previous/Next buttons
- **Try this**: Click **"Individual by Question"**
  - Select different questions from the dropdown
  - See all participants' answers in a grid

### Step 6: Comparison (1.5 minutes)
- Click **"Compare with Previous Year"** button (top right)
- You'll see side-by-side comparison
- Notice the statistics chips at the top
- Scroll down to see:
  - 🟢 **3 New Questions** (green highlighting)
  - 🟡 **3 Modified Questions** (yellow, side-by-side)
  - Statistics summary
- **Try this**: Toggle the filter to **"Only Changes"**
- Click the back arrow to return

## 🎬 Demo Script for Presentations

### Introduction (30 seconds)
> "This is a proof-of-concept for an intelligent questionnaire prefilling system. It demonstrates how administrators can efficiently reuse data from previous questionnaires, automatically match fields, and compare changes between versions."

### Feature 1: Source Selection (45 seconds)
> "First, you select your data source. We support four types: previous questionnaires, board information systems, CSV file uploads with drag-and-drop, and external APIs. Let me select the 2024 ESG questionnaire as our source..."

### Feature 2: Smart Matching (1 minute)
> "The system automatically matches fields using fuzzy search algorithms. Each match gets a confidence score - green for high confidence, yellow for medium, red for low. You can see we matched 12 out of 12 fields with an 85% average confidence. If the system gets something wrong, you can manually override any mapping using these dropdowns..."

### Feature 3: Flexible Layouts (1.5 minutes)
> "Now we configure how we want to view and edit the prefilled data. There are three layouts:
> - Default: one answer applies to all participants - fastest for baseline data
> - By Person: navigate through each participant's individual questionnaire
> - By Question: see all participants' answers for a specific question in a grid
>
> Notice prefilled answers are highlighted with a blue background..."

### Feature 4: Comparison & Redlining (1 minute)
> "The comparison feature shows exactly what changed between versions. We can see new questions in green, modified questions in yellow with side-by-side views, and removed questions in red. The filter lets us focus on just the changes. This makes reviewing year-over-year updates much faster..."

### Conclusion (30 seconds)
> "This POC demonstrates all the key capabilities needed for intelligent prefilling: smart matching, flexible layouts, and clear comparison. It's built with production-ready patterns using React, Material-UI, and Diligent's Atlas Design System."

## 🎯 Key Features to Highlight

1. **Smart Matching**
   - Automatic with confidence scoring
   - Manual override capability
   - Real-time statistics

2. **Multiple Sources**
   - Previous questionnaires
   - File uploads
   - Board systems
   - External APIs

3. **Flexible Layouts**
   - Default (single answer)
   - By person (individual view)
   - By question (grid view)

4. **Comparison**
   - Side-by-side
   - Visual redlining
   - Change filtering

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is taken:
```bash
npm run dev -- --port 3000
```

### Dependencies Missing
```bash
npm install
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Browser Compatibility
Use latest version of:
- Chrome
- Firefox
- Safari
- Edge

## 📱 Test Scenarios

### Scenario 1: Basic Flow
1. Select previous questionnaire
2. Review auto-matches
3. Apply prefill
4. View in default layout

### Scenario 2: CSV Upload
1. Select "Upload File"
2. Drop a CSV file (headers: Company Name, Industry, Employees, etc.)
3. Review matches
4. Manual override low-confidence matches
5. Apply and review

### Scenario 3: Individual Participant
1. Complete basic flow
2. Switch to "By Person" layout
3. Navigate through all 8 participants
4. Edit individual answers

### Scenario 4: Comparison
1. Click "Compare with Previous Year"
2. Review all changes
3. Filter to "Only Changes"
4. Return and apply learnings

## 🎓 Learning Points

This POC teaches:
1. **Context API** for state management
2. **Custom Hooks** for business logic
3. **Fuzzy Matching** with Fuse.js
4. **CSV Parsing** with PapaParse
5. **File Upload** with React Dropzone
6. **Routing** with React Router v7
7. **Material-UI** component composition
8. **Responsive Design** best practices
9. **Comparison Algorithms** for text diffing
10. **Atlas Design System** usage

## 🏁 Success Checklist

After your demo, verify you showed:
- ✅ All 4 source types
- ✅ Smart matching with confidence scores
- ✅ Manual override capability
- ✅ All 3 prefill layouts
- ✅ Navigation (participants & questions)
- ✅ Comparison view
- ✅ Visual redlining
- ✅ Change filtering
- ✅ Responsive design
- ✅ Clean, intuitive UX

## 💡 Pro Tips

1. **Before Demo**: Restart dev server for fresh state
2. **During Demo**: Use keyboard shortcuts (Tab, Enter)
3. **Show Errors**: Intentionally clear all mappings to show validation
4. **CSV Demo**: Prepare a sample CSV file in advance
5. **Comparison**: Toggle filter multiple times to show flexibility
6. **Layouts**: Switch between all 3 to show versatility

## 🔗 Next Steps

After the demo:
1. Gather feedback
2. Prioritize features
3. Plan backend integration
4. Design database schema
5. Plan production architecture

---

**Need Help?** Check:
- README.md - Full documentation
- IMPLEMENTATION_SUMMARY.md - Technical details
- Inline code comments
