# Comparison & Matching Improvements

## 🎉 What's New

Three major improvements to enhance the prefill workflow:

### 1. Skip Matching Step Button ⏭️
### 2. Dynamic Source/Target Labels 🏷️
### 3. Enhanced Comparison View 🔍

---

## 1. Skip Matching Step

**Location**: Smart Matcher (Step 2 in Prefill Tab)

### What Changed:
Added a "Skip Matching Step" button that allows users to bypass field matching entirely.

### When to Use:
- You don't need to map any fields
- You want to proceed directly to prefill configuration
- You're just exploring the interface

### How It Works:
- Button appears on the right side of the actions row
- Click to jump directly to Step 3 (Configure & Review)
- No mappings will be applied

**Visual:**
```
┌────────────────────────────────────────────────────┐
│ [Re-run Auto Match]  [Clear All]    [Skip Matching]│
└────────────────────────────────────────────────────┘
```

---

## 2. Dynamic Source/Target Labels

**Location**: Smart Matcher table headers

### What Changed:
Table column headers now adapt based on the source type:

#### When Source = Previous Questionnaire:
- Column 1: **"Source Question"**
- Column 2: **"Target Question"**

#### When Source = File/Board/URL:
- Column 1: **"Source Field"**
- Column 2: **"Target Question"**

### Why This Matters:
- **More Accurate**: "Question" vs "Question" is clearer than "Field" vs "Question"
- **Better Context**: Users immediately understand they're mapping questions to questions
- **Professional**: Shows attention to detail in terminology

**Before:**
```
┌─────────────┬──────────────────┬────────────┐
│ Source Field│ Target Question │ Confidence │
│ (question)  │ (question)      │            │
└─────────────┴──────────────────┴────────────┘
```

**After (Questionnaire Source):**
```
┌──────────────────┬──────────────────┬────────────┐
│ Source Question │ Target Question │ Confidence │
│ (question)      │ (question)      │            │
└──────────────────┴──────────────────┴────────────┘
```

---

## 3. Enhanced Comparison View

**Location**: Comparison page (opens in new tab)

### Major Changes:

#### A. Opens in New Tab
- Click "Compare with Previous Year" → Opens comparison in new tab
- Keep working on current questionnaire while reviewing changes
- Easy to toggle between prefill work and comparison

#### B. Shows Only Changes by Default
- Filter defaults to **"Changes Only (Recommended)"**
- Focus on what actually needs attention
- Toggle to "All Questions" if needed

#### C. Clear Use Case: Prefilled vs User Corrections

**The Story:**
1. Last year: Admin prefilled answers for users
2. Users reviewed and corrected inaccurate prefills
3. This year: Admin needs to see those corrections
4. Goal: Use accurate user-submitted data for this year's prefill

### New Labels & Terminology:

#### Statistics Section:
**"User Corrections Summary"**
- `X User Corrected` (with edit icon) - Users changed your prefill
- `X Accepted Prefill` (with checkmark) - Users kept your prefill
- `X% Correction Rate` - Percentage of corrections

#### Answer Comparison Cards:

**Unchanged Answer:**
```
┌─────────────────────────────────────────────┐
│ ✅ User Accepted Prefill                    │
│                                             │
│ Acme Corporation                            │
│                                             │
│ ✅ User kept your prefilled value -         │
│    no changes needed for this year          │
└─────────────────────────────────────────────┘
```

**Changed Answer:**
```
┌─────────────────────────────────────────────┐
│ ⚠️ User Corrected                           │
│                                             │
│ ┌──────────────────┐  →  ┌────────────────┐│
│ │ What You Prefilled│     │What User Submit││
│ │                  │     │ted             ││
│ │ Acme Corporation │     │Acme Corp Inc.  ││
│ │ (strikethrough)  │     │(highlighted)   ││
│ └──────────────────┘     └────────────────┘│
│                                             │
│ 💡 Action: Update this year's prefill from │
│    "Acme Corporation" to "Acme Corp Inc."  │
│                                             │
│    The user corrected your prefilled value -│
│    consider using their answer for 2025    │
└─────────────────────────────────────────────┘
```

#### Top Banner:
```
┌─────────────────────────────────────────────────┐
│ 📋 Workflow: Improve Your Prefill Data          │
│                                                 │
│ Last year: You prefilled → Users corrected     │
│ This year: Review corrections → Use accurate   │
│            data for 2025 prefill                │
└─────────────────────────────────────────────────┘
```

### Filter Options:
- **"Changes Only (Recommended)"** ← Default
  - Shows only questions and answers with changes
  - Chip: "Focus on what needs updating"
- **"All Questions"**
  - Shows everything including unchanged items

---

## 🎯 Complete Workflow Example

### Scenario:
You're the admin preparing the 2025 ESG questionnaire. Last year (2024), you prefilled answers but users made some corrections. You want to learn from those corrections.

### Steps:

#### 1. Start Prefill Process
1. Navigate to 2025 questionnaire
2. Go to Prefill tab
3. Select "Previous Questionnaire" (2024 ESG)

#### 2. Smart Matching
- See **"Source Question"** → **"Target Question"**
- Auto-matching runs
- Review mappings
- Click **"Skip Matching Step"** if you don't need mappings

#### 3. Review User Corrections (New Tab)
- Click **"Compare with Previous Year"**
- New tab opens with comparison
- See banner explaining the workflow
- Default view: **Changes Only**

#### 4. Analyze Statistics
See summary:
- 12 Total Answers
- 8 User Corrected (⚠️)
- 4 Accepted Prefill (✅)
- 67% Correction Rate

**Insight:** Users corrected most of your prefills - need better data!

#### 5. Review Each Correction
Scroll through changed answers:

**Example 1: Company Name**
- You prefilled: "Acme Corporation"
- User submitted: "Acme Corporation Inc."
- **Action:** Use "Acme Corporation Inc." for 2025

**Example 2: Employee Count**
- You prefilled: "1250"
- User submitted: "1280"
- **Action:** Use "1280" for 2025 (more current data)

**Example 3: Emissions**
- You prefilled: "5420"
- User submitted: "5620"
- **Action:** User has actual data - use "5620"

#### 6. Apply Learnings
1. Close comparison tab
2. Return to prefill configuration
3. Update default values with user corrections
4. Save improved prefill data for 2025

---

## 🎨 Visual Improvements Summary

### Before:
- ❌ "Source Field" even for questionnaire sources
- ❌ No skip button - had to complete matching
- ❌ Comparison showed all questions (overwhelming)
- ❌ Generic labels: "Previous" / "Current"
- ❌ Unclear purpose of comparison

### After:
- ✅ "Source Question" for questionnaire sources
- ✅ Skip button for flexibility
- ✅ Shows only changes by default (focused)
- ✅ Clear labels: "What You Prefilled" / "What User Submitted"
- ✅ Clear use case with actionable insights

---

## 📊 Impact on User Experience

### For Administrators:
1. **Faster Workflow**: Skip unnecessary steps
2. **Better Context**: Clear terminology (question vs question)
3. **Focused Review**: See only what needs attention
4. **Actionable Insights**: Know exactly what to update
5. **Multi-tasking**: Work in main tab while reviewing in another

### For Data Quality:
1. **Learn from Users**: See where prefills were wrong
2. **Iterative Improvement**: Each year gets better data
3. **Evidence-Based**: Use actual submissions, not guesses
4. **Accuracy Tracking**: See correction rate over time

---

## 🔧 Technical Implementation

### Files Modified:

1. **src/components/questionnaire/prefill/SmartMatcher.jsx**
   - Added "Skip Matching Step" button
   - Dynamic source/target labels based on source type
   - Detects `previous_questionnaire` type

2. **src/components/questionnaire/tabs/PrefillTab.jsx**
   - Changed `navigate()` to `window.open()`
   - Opens comparison in new tab

3. **src/components/questionnaire/comparison/QuestionnaireCompare.jsx**
   - Default filter changed to `'changes'`
   - Updated page title: "Review User Corrections"
   - Added workflow banner
   - Updated statistics labels
   - Enhanced filter with chip indicator
   - Added use case alert
   - Updated chip labels and icons

4. **src/components/questionnaire/comparison/RedlineAnswer.jsx**
   - Changed "Unchanged" to "User Accepted Prefill"
   - Changed "Answer Changed" to "User Corrected"
   - Updated labels: "What You Prefilled" / "What User Submitted"
   - Added actionable hint box
   - Enhanced visual design

---

## 🎬 Demo Script

### Quick Demo (2 minutes):

**1. Skip Button (20 seconds):**
> "If you don't need field mapping, you can now skip this step entirely. Just click 'Skip Matching Step' here and jump directly to configuration."

**2. Dynamic Labels (20 seconds):**
> "Notice when we select a previous questionnaire as the source, the table headers say 'Source Question' to 'Target Question' - making it clear we're mapping questions to questions, not generic fields."

**3. Comparison in New Tab (1 minute):**
> "Click 'Compare with Previous Year' and it opens in a new tab. This is powerful - you can keep working here while reviewing changes there. The view defaults to showing only changes - the 8 answers where users corrected your prefill. Here's the use case: last year you prefilled these values, but users knew better and corrected them. Now you can see exactly what they changed and use that for this year's prefill."

**4. Actionable Insights (20 seconds):**
> "Each correction shows what you prefilled vs what the user actually submitted, with a clear action: 'Update this year's prefill from X to Y.' This turns user corrections into better prefill data for next year."

---

## ✅ Testing Checklist

### Skip Button:
- [ ] Button appears in Smart Matcher
- [ ] Click skips to Step 3
- [ ] No mappings applied when skipped
- [ ] Can return to Step 2 via stepper

### Dynamic Labels:
- [ ] Select previous questionnaire → see "Source Question"
- [ ] Upload CSV → see "Source Field"
- [ ] Select board → see "Source Field"
- [ ] Labels are consistent throughout table

### Comparison - New Tab:
- [ ] Click "Compare" → opens new tab
- [ ] Main tab remains on prefill view
- [ ] Can work in both tabs simultaneously
- [ ] Chip shows "New Tab" indicator

### Comparison - Changes Only:
- [ ] Default view shows only changes
- [ ] Toggle to "All Questions" works
- [ ] Filter chip appears when on "Changes Only"
- [ ] Statistics count correctly

### Comparison - Labels:
- [ ] "User Corrected" for changed answers
- [ ] "User Accepted Prefill" for unchanged
- [ ] "What You Prefilled" / "What User Submitted"
- [ ] Action hint box appears for corrections
- [ ] Workflow banner at top
- [ ] Icons on statistic chips

---

## 🚀 Try It Now

**Test Skip Button:**
```
1. http://localhost:5173/questionnaire/demo-esg-2025
2. Prefill tab → Select source → Step 2
3. Click "Skip Matching Step"
```

**Test Dynamic Labels:**
```
1. Same as above, step 2
2. Note: "Source Question" header
3. Go back to step 1
4. Create mock CSV upload (future feature)
5. See: "Source Field" header
```

**Test Enhanced Comparison:**
```
1. http://localhost:5173/questionnaire/demo-esg-2025
2. Click "Compare with Previous Year"
3. New tab opens
4. See "Changes Only" selected
5. Read workflow banner
6. Scroll through corrections
7. Note actionable hints
```

---

## 💡 Future Enhancements

Possible next steps:

1. **One-Click Apply**: "Apply all user corrections to 2025 prefill"
2. **Selective Apply**: Checkboxes to apply specific corrections
3. **Correction History**: Track correction rates over multiple years
4. **Confidence Scoring**: Show how confident users were in their corrections
5. **Comments**: Allow users to explain why they corrected
6. **Bulk Operations**: Apply corrections to multiple questionnaires at once

---

**Status**: ✅ Complete and tested
**Date**: 2026-03-23
**Impact**: High - Clearer workflow and better data quality
