// Mock questionnaires for POC demonstration

export const mockQuestionnaires = [
  {
    id: 'demo-esg-2025',
    title: '2025 ESG Questionnaire',
    description: 'Annual Environmental, Social, and Governance questionnaire for 2025',
    version: '2025.1',
    createdDate: new Date('2025-01-15'),
    pages: [
      {
        id: 'page-1',
        title: 'Company Information',
        order: 1,
        questions: [
          {
            id: 'q1',
            text: 'What is your company name?',
            type: 'text',
            pageId: 'page-1',
            required: true,
          },
          {
            id: 'q2',
            text: 'What is your primary industry sector?',
            type: 'dropdown',
            pageId: 'page-1',
            required: true,
            options: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Other'],
          },
          {
            id: 'q3',
            text: 'Number of employees',
            type: 'number',
            pageId: 'page-1',
            required: true,
          },
        ],
      },
      {
        id: 'page-2',
        title: 'Environmental Metrics',
        order: 2,
        questions: [
          {
            id: 'q4',
            text: 'Total greenhouse gas emissions (Scope 1 + 2) in metric tons CO2e',
            type: 'number',
            pageId: 'page-2',
            required: true,
          },
          {
            id: 'q5',
            text: 'Do you have a climate change strategy?',
            type: 'dropdown',
            pageId: 'page-2',
            required: true,
            options: ['Yes', 'No', 'In Development'],
          },
          {
            id: 'q6',
            text: 'Describe your renewable energy initiatives',
            type: 'multiline',
            pageId: 'page-2',
            required: false,
          },
          {
            id: 'q7',
            text: 'Water consumption in cubic meters',
            type: 'number',
            pageId: 'page-2',
            required: true,
          },
        ],
      },
      {
        id: 'page-3',
        title: 'Social Responsibility',
        order: 3,
        questions: [
          {
            id: 'q8',
            text: 'What percentage of your workforce is female?',
            type: 'number',
            pageId: 'page-3',
            required: true,
          },
          {
            id: 'q9',
            text: 'Do you have a diversity and inclusion policy?',
            type: 'dropdown',
            pageId: 'page-3',
            required: true,
            options: ['Yes', 'No', 'In Development'],
          },
          {
            id: 'q10',
            text: 'Employee turnover rate (%)',
            type: 'number',
            pageId: 'page-3',
            required: true,
          },
          {
            id: 'q11',
            text: 'Describe your employee health and safety programs',
            type: 'multiline',
            pageId: 'page-3',
            required: false,
          },
        ],
      },
      {
        id: 'page-4',
        title: 'Governance',
        order: 4,
        questions: [
          {
            id: 'q12',
            text: 'Does your board have an ESG committee?',
            type: 'dropdown',
            pageId: 'page-4',
            required: true,
            options: ['Yes', 'No', 'Planned'],
          },
          {
            id: 'q13',
            text: 'Date of last board ESG review',
            type: 'date',
            pageId: 'page-4',
            required: true,
          },
          {
            id: 'q14',
            text: 'Number of independent board members',
            type: 'number',
            pageId: 'page-4',
            required: true,
          },
          {
            id: 'q15',
            text: 'Describe your anti-corruption policies',
            type: 'multiline',
            pageId: 'page-4',
            required: true,
          },
        ],
      },
    ],
    participants: [],
    answers: [
      // Simulate some prefilled answers that have been updated by users
      { questionId: 'q1', participantId: 'default', value: 'Acme Corporation Inc.', isPrefilled: false }, // Updated: was 'Acme Corporation'
      { questionId: 'q2', participantId: 'default', value: 'Technology', isPrefilled: true }, // Unchanged
      { questionId: 'q3', participantId: 'default', value: '1280', isPrefilled: false }, // Updated: was '1250'
      { questionId: 'q4', participantId: 'default', value: '5620', isPrefilled: false }, // Updated: was '5420'
      { questionId: 'q5', participantId: 'default', value: 'Yes', isPrefilled: true }, // Unchanged
      { questionId: 'q7', participantId: 'default', value: '13200', isPrefilled: false }, // Updated: was '12500'
      { questionId: 'q8', participantId: 'default', value: '44', isPrefilled: false }, // Updated: was '42'
      { questionId: 'q9', participantId: 'default', value: 'Yes', isPrefilled: true }, // Unchanged
      { questionId: 'q10', participantId: 'default', value: '7.8', isPrefilled: false }, // Updated: was '8.5'
      { questionId: 'q12', participantId: 'default', value: 'Yes', isPrefilled: true }, // Unchanged
      { questionId: 'q13', participantId: 'default', value: '2025-02-20', isPrefilled: false }, // Updated: was '2024-06-15'
      { questionId: 'q14', participantId: 'default', value: '6', isPrefilled: false }, // Updated: was '5'
    ],
  },
  {
    id: 'demo-esg-2024',
    title: '2024 ESG Questionnaire',
    description: 'Annual Environmental, Social, and Governance questionnaire for 2024',
    version: '2024.1',
    createdDate: new Date('2024-01-15'),
    pages: [
      {
        id: 'page-1',
        title: 'Company Information',
        order: 1,
        questions: [
          {
            id: 'q1-2024',
            text: 'What is your company name?',
            type: 'text',
            pageId: 'page-1',
            required: true,
          },
          {
            id: 'q2-2024',
            text: 'What is your industry sector?',
            type: 'dropdown',
            pageId: 'page-1',
            required: true,
            options: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Other'],
          },
          {
            id: 'q3-2024',
            text: 'Number of full-time employees',
            type: 'number',
            pageId: 'page-1',
            required: true,
          },
        ],
      },
      {
        id: 'page-2',
        title: 'Environmental Metrics',
        order: 2,
        questions: [
          {
            id: 'q4-2024',
            text: 'Total CO2 emissions in metric tons',
            type: 'number',
            pageId: 'page-2',
            required: true,
          },
          {
            id: 'q5-2024',
            text: 'Climate strategy in place?',
            type: 'dropdown',
            pageId: 'page-2',
            required: true,
            options: ['Yes', 'No', 'In Progress'],
          },
          {
            id: 'q7-2024',
            text: 'Water usage in cubic meters',
            type: 'number',
            pageId: 'page-2',
            required: true,
          },
        ],
      },
      {
        id: 'page-3',
        title: 'Social Metrics',
        order: 3,
        questions: [
          {
            id: 'q8-2024',
            text: 'Female workforce percentage',
            type: 'number',
            pageId: 'page-3',
            required: true,
          },
          {
            id: 'q9-2024',
            text: 'Diversity policy status',
            type: 'dropdown',
            pageId: 'page-3',
            required: true,
            options: ['Yes', 'No', 'In Development'],
          },
          {
            id: 'q10-2024',
            text: 'Turnover rate percentage',
            type: 'number',
            pageId: 'page-3',
            required: true,
          },
        ],
      },
      {
        id: 'page-4',
        title: 'Governance',
        order: 4,
        questions: [
          {
            id: 'q12-2024',
            text: 'ESG committee exists?',
            type: 'dropdown',
            pageId: 'page-4',
            required: true,
            options: ['Yes', 'No'],
          },
          {
            id: 'q13-2024',
            text: 'Last ESG board review date',
            type: 'date',
            pageId: 'page-4',
            required: true,
          },
          {
            id: 'q14-2024',
            text: 'Independent directors count',
            type: 'number',
            pageId: 'page-4',
            required: true,
          },
        ],
      },
    ],
    participants: [],
    answers: [
      // Pre-filled answers from 2024
      { questionId: 'q1-2024', participantId: 'default', value: 'Acme Corporation', isPrefilled: true },
      { questionId: 'q2-2024', participantId: 'default', value: 'Technology', isPrefilled: true },
      { questionId: 'q3-2024', participantId: 'default', value: '1250', isPrefilled: true },
      { questionId: 'q4-2024', participantId: 'default', value: '5420', isPrefilled: true },
      { questionId: 'q5-2024', participantId: 'default', value: 'Yes', isPrefilled: true },
      { questionId: 'q7-2024', participantId: 'default', value: '12500', isPrefilled: true },
      { questionId: 'q8-2024', participantId: 'default', value: '42', isPrefilled: true },
      { questionId: 'q9-2024', participantId: 'default', value: 'Yes', isPrefilled: true },
      { questionId: 'q10-2024', participantId: 'default', value: '8.5', isPrefilled: true },
      { questionId: 'q12-2024', participantId: 'default', value: 'Yes', isPrefilled: true },
      { questionId: 'q13-2024', participantId: 'default', value: '2024-06-15', isPrefilled: true },
      { questionId: 'q14-2024', participantId: 'default', value: '5', isPrefilled: true },
    ],
  },
  {
    id: 'demo-compliance-2025',
    title: '2025 Regulatory Compliance Questionnaire',
    description: 'Annual regulatory and compliance assessment',
    version: '2025.1',
    createdDate: new Date('2025-02-01'),
    pages: [
      {
        id: 'page-1',
        title: 'Basic Information',
        order: 1,
        questions: [
          {
            id: 'c1',
            text: 'Organization legal name',
            type: 'text',
            pageId: 'page-1',
            required: true,
          },
          {
            id: 'c2',
            text: 'Primary regulatory body',
            type: 'dropdown',
            pageId: 'page-1',
            required: true,
            options: ['SEC', 'FCA', 'MAS', 'FINRA', 'Other'],
          },
        ],
      },
    ],
    participants: [],
    answers: [],
  },
];

export default mockQuestionnaires;
