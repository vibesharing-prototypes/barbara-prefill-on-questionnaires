# View Modes: Survey vs Answers - Feature Guide

## 🎯 Overview

The comparison view now has two distinct modes:
1. **Changes in Survey** - See structural changes (new/modified/removed questions)
2. **Changes in Answers** - See what users changed from prefilled values, with per-user view

## 🔄 View Modes

### Mode 1: Changes in Survey
**Focus**: Questionnaire structure changes

Shows:
- 🟢 **New Questions** - Questions added in current version
- 🟡 **Modified Questions** - Questions changed between versions
- 🔴 **Removed Questions** - Questions deleted from current version
- **Statistics** - Count of each type

**When to Use**:
- Reviewing questionnaire updates
- Understanding structural changes
- Quality control for question wording
- Documentation of survey evolution

---

### Mode 2: Changes in Answers
**Focus**: What users submitted vs what you prefilled

Shows:
- ⚠️ **User Corrected** - Answers users changed
- ✅ **User Accepted** - Answers users kept
- **Per-User View** - Switch between different users
- **Apply Actions** - One-click apply corrections to this year

**When to Use**:
- Improving prefill accuracy
- Learning from user corrections
- Identifying data quality issues
- Updating this year's prefill

## 🎨 User Interface

### Toggle Buttons
```
┌────────────────────────────────────────────────┐
│ Show: [Changes in Survey] [Changes in Answers]│
└────────────────────────────────────────────────┘
```

### Participant Selector (Answers Mode)
```
┌────────────────────────────────────────────────┐
│ View changes for: [All Users (Default Prefill)]│
│                   ▼                            │
│                   Sarah Johnson - CSO          │
│                   Michael Chen - Env Manager   │
│                   Emily Rodriguez - HR Director│
│                   ...                          │
└────────────────────────────────────────────────┘
```

## 📊 Changes in Survey Mode

### Visual Structure:
```
┌──────────────────────────────────────────────┐
│ Survey Structure Changes                      │
│ [3 New] [2 Modified] [1 Removed] [10 Unchanged]│
└──────────────────────────────────────────────┘

🟢 3 New Questions
┌────────────────────────────────────────┐
│ ✨ NEW                                 │
│ Describe your renewable energy         │
│ initiatives                            │
│ Type: multiline                        │
└────────────────────────────────────────┘

🟡 2 Modified Questions
┌──────────────────────┬──────────────────────┐
│ 🔄 Current Version  │ 📋 Previous Version  │
│                     │                      │
│ What is your        │ What is your         │
│ primary industry    │ industry sector?     │
│ sector?             │                      │
└──────────────────────┴──────────────────────┘

🔴 1 Removed Question
┌────────────────────────────────────────┐
│ ❌ REMOVED                             │
│ Old question that was deleted          │
└────────────────────────────────────────┘
```

### Features:
- Side-by-side comparison for modified questions
- Clear color coding
- Question type indicators
- Count statistics

---

## 📝 Changes in Answers Mode

### Default View: All Users
Shows aggregate changes across all users:

```
┌──────────────────────────────────────────────┐
│ View changes for: [All Users (Default Prefill)]│
└──────────────────────────────────────────────┘

💡 Last year you prefilled answers, users corrected them.
   Apply corrections to improve this year's prefill.

┌─────────────────────────────────────────────┐
│ Quick Action: Apply All User Corrections    │
│                      [Apply All (8) →]      │
└─────────────────────────────────────────────┘

⚠️ User Corrected
┌─────────────────────────────────────────────┐
│ What You Prefilled: 1250                     │
│ What User Submitted: 1280                    │
│                                              │
│                [Apply to 2025 →]            │
└─────────────────────────────────────────────┘

✅ User Accepted Prefill
┌─────────────────────────────────────────────┐
│ Technology                                   │
│ ✅ User kept your value - no changes needed │
└─────────────────────────────────────────────┘
```

### Individual User View:
Select a specific user to see their changes:

```
┌──────────────────────────────────────────────┐
│ View changes for: [Sarah Johnson - CSO ▼]   │
│                   [Individual User View]     │
└──────────────────────────────────────────────┘

👤 Viewing changes made by Sarah Johnson
   See what this specific user changed from prefilled values.

⚠️ User Corrected
┌─────────────────────────────────────────────┐
│ Number of employees                          │
│                                              │
│ What You Prefilled: 1250                     │
│ What Sarah Submitted: 150                    │
│                                              │
│ 💡 Sarah manages a department, not full org │
└─────────────────────────────────────────────┘

(Only shows questions where this user made changes)
```

## 🔄 Complete Workflow Examples

### Example 1: Survey Structure Review
**Goal**: Understand what changed in the questionnaire

1. **Open Comparison**
   - Click "Compare with Previous Year"
   - Opens in new tab

2. **Select Survey Mode**
   - Click "Changes in Survey"
   - See structural changes

3. **Review Statistics**
   - 3 New questions
   - 2 Modified questions
   - 1 Removed question

4. **Examine Details**
   - Read new questions
   - Compare modified questions side-by-side
   - Note removed questions

5. **Document Changes**
   - Use for stakeholder communication
   - Update training materials
   - Inform participants of changes

---

### Example 2: Improve Prefill Data
**Goal**: Apply user corrections to this year's prefill

1. **Open Comparison**
   - From Prefill tab
   - New tab opens

2. **Select Answers Mode**
   - Click "Changes in Answers"
   - View: "All Users (Default Prefill)"

3. **Review Statistics**
   - 12 total answers
   - 8 user corrected
   - 4 accepted prefill
   - 67% correction rate (need improvement!)

4. **Apply Corrections**
   - **Option A**: Click "Apply All (8)"
   - **Option B**: Select individual corrections

5. **Verify**
   - Switch back to main tab
   - Check Prefill configuration
   - See updated values

---

### Example 3: Investigate Specific User
**Goal**: Understand why one user made many corrections

1. **Open Comparison** → "Changes in Answers"

2. **Select User**
   - Dropdown: "Sarah Johnson - CSO"
   - See her specific changes

3. **Review Changes**
   ```
   Sarah changed 5 answers:
   - Employees: 1250 → 150 (her department)
   - Emissions: 5420 → 340 (department level)
   - Water: 12500 → 800 (department level)
   - Turnover: 8.5% → 12% (department higher)
   - Female %: 42% → 55% (department differs)
   ```

4. **Insight**
   - Sarah interpreted questions at department level
   - Need to clarify: "Company-wide" vs "Your area"

5. **Action**
   - Update question wording for clarity
   - Add instructions
   - Contact Sarah to confirm intent

---

### Example 4: Multi-User Analysis
**Goal**: See if multiple users made same corrections

1. **Select Answers Mode**

2. **Check Default View**
   - Employee count: 1250 → 1280 (corrected)

3. **Switch Users**
   - Sarah: Didn't change (kept 1250)
   - Michael: Changed to 1280
   - Emily: Changed to 1280
   - David: Changed to 1280

4. **Insight**
   - 3 of 4 users agree: 1280 is correct
   - Sarah's context was different (department)

5. **Action**
   - Apply 1280 to this year's prefill
   - Add note about scope clarification

## 💡 Key Benefits

### For Survey Mode:
- **Documentation** - Track questionnaire evolution
- **Quality Control** - Review question changes
- **Communication** - Share updates with stakeholders
- **Compliance** - Show audit trail of changes

### For Answers Mode:
- **Data Quality** - Improve prefill accuracy
- **Learning** - Understand common corrections
- **Efficiency** - One-click apply changes
- **Insights** - Per-user analysis reveals patterns

## 🎯 When to Use Each Mode

### Use "Changes in Survey" When:
- ✅ Updating questionnaire documentation
- ✅ Training team on new questions
- ✅ Communicating changes to participants
- ✅ Auditing survey modifications
- ✅ Comparing questionnaire versions

### Use "Changes in Answers" When:
- ✅ Preparing this year's prefill data
- ✅ Investigating data quality issues
- ✅ Learning from user corrections
- ✅ Identifying confusing questions
- ✅ Analyzing individual user responses

## 🔧 Technical Details

### State Management:
```javascript
const [viewMode, setViewMode] = useState('answers'); // 'survey' | 'answers'
const [selectedParticipant, setSelectedParticipant] = useState('default');
```

### Conditional Rendering:
```javascript
{viewMode === 'survey' && (
  // Show question structure changes
)}

{viewMode === 'answers' && (
  // Show answer changes with participant selector
)}
```

### Participant Filtering:
```javascript
// Filter answers by selected participant
const currentAnswer = currentQuestionnaire.answers.find(
  a => a.questionId === questionId && a.participantId === selectedParticipant
);

// For individuals, only show changed answers
if (selectedParticipant !== 'default' && !hasChanged) return null;
```

### Files Modified:
1. **src/components/questionnaire/comparison/QuestionnaireCompare.jsx**
   - Added `viewMode` state
   - Added `selectedParticipant` state
   - Changed toggle from filter to viewMode
   - Added participant selector
   - Conditional rendering based on viewMode
   - Per-participant answer filtering
   - Individual user alerts and messaging

## 🎬 Demo Script

### Full Demo (4 minutes):

**Setup (20 seconds):**
> "I'm reviewing the 2024 ESG questionnaire to prepare for 2025. Let me show you the new comparison view with two modes: Survey and Answers."

**Survey Mode (1 minute):**
> "First, 'Changes in Survey' shows structural changes. See - 3 new questions in green, 2 modified in yellow with side-by-side comparison, and 1 removed in red. This is great for documentation and communicating updates to participants."

**Answers Mode - Default View (1.5 minutes):**
> "Now 'Changes in Answers' - this is powerful. I'm viewing 'All Users' - the default prefill. See the statistics: 8 users corrected my prefill, only 4 accepted it. That's a 67% correction rate - I need better data! Here's one: I prefilled 1250 employees, user corrected to 1280. I can click 'Apply to 2025' to use the corrected value, or 'Apply All' to update everything at once."

**Answers Mode - Individual User (1 minute):**
> "But here's the really interesting part - I can switch to individual users. Let me select Sarah Johnson... See? She made 5 corrections. Looking at these, she changed employee count from 1250 to 150, emissions from 5420 to 340... Ah! She answered for her department, not the whole company. That tells me I need to clarify the question scope."

**Conclusion (20 seconds):**
> "Two modes, two purposes: Survey mode for structure changes, Answers mode for improving prefill data. Plus the ability to drill down into individual user corrections to understand patterns and issues."

## ✅ Testing Checklist

### View Mode Toggle:
- [ ] Toggle shows "Changes in Survey" and "Changes in Answers"
- [ ] Default is "Changes in Answers"
- [ ] Clicking switches content
- [ ] State persists during session

### Survey Mode:
- [ ] Shows new questions in green
- [ ] Shows modified questions side-by-side
- [ ] Shows removed questions in red
- [ ] Statistics display correctly
- [ ] No participant selector visible

### Answers Mode - Default:
- [ ] Participant selector shows "All Users (Default Prefill)"
- [ ] Shows corrected and accepted answers
- [ ] "Apply to [Year]" buttons work
- [ ] "Apply All" button appears
- [ ] Success messages display

### Answers Mode - Individual:
- [ ] Can select any participant from dropdown
- [ ] Shows only that participant's changes
- [ ] No "Apply" buttons (can't apply individual to default)
- [ ] "No changes" message if user accepted all
- [ ] Alert shows participant name

### Edge Cases:
- [ ] User with no changes shows info message
- [ ] Switching participants updates view
- [ ] Statistics update per participant
- [ ] Empty states handled gracefully

## 🚀 Try It Now

**Quick Test:**

1. **Open comparison:**
   ```
   http://localhost:5173/questionnaire/demo-esg-2025/compare/demo-esg-2024
   ```

2. **Test Survey Mode:**
   - Click "Changes in Survey"
   - See question structure changes
   - Note statistics

3. **Test Answers Mode - Default:**
   - Click "Changes in Answers"
   - See "All Users (Default Prefill)"
   - Review corrections
   - Try "Apply All"

4. **Test Individual User:**
   - Select "Sarah Johnson" from dropdown
   - See her specific changes
   - Note different data
   - Try other users

---

**Status**: ✅ Implemented and tested
**Date**: 2026-03-23
**Impact**: High - Separates concerns and adds per-user insights
**User Value**: Clear workflows for different use cases
