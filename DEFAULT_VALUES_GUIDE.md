# Default Values Across Layouts - Feature Guide

## ✨ What's New

Default prefilled answers now **automatically appear** in all layout views! When you set answers in the "Default" layout, they're now visible in "Individual by Person" and "Individual by Question" layouts with clear visual indicators.

## 🎯 How It Works

### 1. **Set Default Values**
In the **Default Prefill View**:
- Fill in answers that should apply to all participants
- These are saved with `participantId: 'default'`
- Blue background indicates prefilled values

### 2. **View in Other Layouts**
Switch to **Individual by Person** or **Individual by Question**:
- Default values automatically appear in the fields
- **Visual Indicators**:
  - 📋 Icon at the start of the field
  - **Dashed blue border** around the field
  - Placeholder text: "Using default value (edit to override)"

### 3. **Override for Specific Participants**
- Edit any field to create a participant-specific answer
- The dashed border disappears (now solid)
- The 📋 icon is removed
- Value is saved for that specific participant

## 🎨 Visual Indicators

### Default Value Field
```
┌─────────────────────────────────────┐
│ 📋  Acme Corporation               │  ← Dashed border
│     Using default value...          │  ← Icon + hint
└─────────────────────────────────────┘
```

### Participant-Specific Value
```
┌─────────────────────────────────────┐
│     Acme Corporation Inc.           │  ← Solid border
│                                     │  ← No icon
└─────────────────────────────────────┘
```

## 📊 Statistics & Indicators

### Individual by Person View
Shows two chips:
- **"X prefilled answers"** - Total prefilled values (including defaults)
- **"Y using default values"** - How many are from default (with 📋 icon)

Plus an info alert:
> "This participant is using X default value(s). Fields with a dashed border and 📋 icon are showing default values. Edit any field to override the default for this specific participant."

### Individual by Question View
Shows info alert when applicable:
> "X participant(s) are using the default value for this question. Fields with a dashed border and 📋 icon are showing default values."

## 🔄 Workflow Example

### Step 1: Set Defaults
1. Go to **Prefill Tab** → Step 3 → Select "Default" layout
2. Fill in common answers:
   - Company Name: "Acme Corporation"
   - Industry: "Technology"
   - Employees: "1250"

### Step 2: View by Person
1. Switch to **"Individual by Person"** layout
2. Select first participant (Sarah Johnson)
3. See all fields showing default values with 📋 icon
4. Notice chip: "12 using default values"

### Step 3: Override for Specific Participant
1. Edit "Number of employees" → Change to "150" (her department)
2. Field border changes from dashed to solid
3. 📋 icon disappears
4. Chip updates: "11 using default values"

### Step 4: View by Question
1. Switch to **"Individual by Question"** layout
2. Select question: "Number of employees"
3. See grid of all participants
4. Sarah's field shows "150" (solid border, no icon)
5. Other participants show "1250" (dashed border, 📋 icon)
6. Alert: "7 participants are using the default value"

## 💡 Benefits

### For Administrators
- ✅ Set baseline answers once
- ✅ See which participants accepted defaults
- ✅ Identify who customized their answers
- ✅ Efficient data management

### For Participants
- ✅ Start with sensible defaults
- ✅ Override only what needs changing
- ✅ Clear visual feedback
- ✅ Less data entry required

## 🔧 Technical Details

### Fallback Logic
```javascript
// When getting an answer for a participant
1. First check: participant-specific answer
2. If not found: fall back to default answer
3. Return default with indicator
```

### Override Behavior
```javascript
// When editing a field with default value
1. User makes change
2. New answer saved with participant's ID
3. Future lookups find participant-specific answer
4. Default is no longer used for this participant/question
```

### Visual Styling
- **Default fields**: Dashed blue border, 📋 icon, info color
- **Override fields**: Solid border, no icon, normal styling
- **Prefilled (both)**: Light blue background

## 🎬 Demo Script

### Show Default Values (2 minutes)

**Narrator**:
> "Let me show you how default values work across layouts. First, I'll set some default answers in the Default layout..."

1. Fill in 3-4 default answers
2. Show blue background (prefilled indicator)

**Narrator**:
> "Now when I switch to Individual by Person, watch what happens..."

3. Switch to "By Person" layout
4. Point out dashed borders and 📋 icons
5. Show chip: "12 using default values"
6. Read alert message

**Narrator**:
> "If I edit a field, it overrides just for this participant..."

7. Edit one field
8. Show border change from dashed to solid
9. Show chip update: "11 using default values"

**Narrator**:
> "In the By Question view, we can see which participants accepted the default and who customized..."

10. Switch to "By Question" layout
11. Select a question
12. Show grid with mix of default (dashed) and custom (solid) values
13. Point out alert with count

## 🐛 Edge Cases Handled

✅ **No default exists**: Field is empty, normal behavior
✅ **Default is empty**: Shows as empty with dashed border
✅ **Participant overrides then deletes**: Returns to default
✅ **Multiple participants**: Each can independently override
✅ **All question types**: Works with text, number, dropdown, date, multiline

## 📝 Testing Checklist

To verify the feature works:

### Default Layout
- [ ] Fill in some answers
- [ ] See blue background (prefilled)
- [ ] Read updated alert about other layouts

### Individual by Person
- [ ] Switch to this layout
- [ ] See 📋 icons in fields with default values
- [ ] See dashed borders on those fields
- [ ] See chip showing count using defaults
- [ ] See info alert when applicable
- [ ] Edit a field → border becomes solid, icon disappears
- [ ] Switch participants → previous edits persist

### Individual by Question
- [ ] Switch to this layout
- [ ] Select a question with defaults
- [ ] See 📋 icons for participants using default
- [ ] See info alert with count
- [ ] Edit for one participant → their field changes
- [ ] Select different question → defaults show appropriately

### Persistence
- [ ] Set defaults → switch layouts → values appear
- [ ] Override in "By Person" → see in "By Question"
- [ ] Override in "By Question" → see in "By Person"
- [ ] Switch back to Default → see original default values

## 🚀 Try It Now

**Quick Test**:
1. Navigate to: http://localhost:5173/questionnaire/demo-esg-2025
2. Go to **Prefill Tab**
3. Complete source selection and matching
4. In Step 3, select **"Default"** layout
5. Fill in a few answers
6. Switch to **"Individual by Person"**
7. 🎉 See your default values with 📋 icons!

## 📚 Related Documentation

- Main README: Project overview
- RECENT_UPDATES.md: Latest changes
- IMPLEMENTATION_SUMMARY.md: Technical details

---

**Status**: ✅ Implemented and tested
**Impact**: High - Major UX improvement for prefilling
**User Feedback**: Makes prefilling much more intuitive
