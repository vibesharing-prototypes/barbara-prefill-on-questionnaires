// Mock prefill sources for POC demonstration

export const mockPrefillSources = [
  {
    id: 'source-prev-2024',
    type: 'previous_questionnaire',
    name: '2024 ESG Questionnaire',
    questionnaireId: 'demo-esg-2024',
    data: {
      fields: [
        { key: 'company_name', label: 'Company Name', value: 'Acme Corporation' },
        { key: 'industry', label: 'Industry Sector', value: 'Technology' },
        { key: 'employees', label: 'Number of Employees', value: '1250' },
        { key: 'co2_emissions', label: 'CO2 Emissions', value: '5420' },
        { key: 'climate_strategy', label: 'Climate Strategy', value: 'Yes' },
        { key: 'water_usage', label: 'Water Usage', value: '12500' },
        { key: 'female_workforce', label: 'Female Workforce %', value: '42' },
        { key: 'diversity_policy', label: 'Diversity Policy', value: 'Yes' },
        { key: 'turnover_rate', label: 'Turnover Rate', value: '8.5' },
        { key: 'esg_committee', label: 'ESG Committee', value: 'Yes' },
        { key: 'board_review_date', label: 'Board Review Date', value: '2024-06-15' },
        { key: 'independent_directors', label: 'Independent Directors', value: '5' },
      ],
    },
    uploadedDate: new Date('2024-01-15'),
  },
  {
    id: 'source-board-info',
    type: 'board',
    name: 'Board Information System',
    data: {
      fields: [
        { key: 'company_legal_name', label: 'Legal Name', value: 'Acme Corporation Inc.' },
        { key: 'board_members', label: 'Total Board Members', value: '9' },
        { key: 'independent_members', label: 'Independent Members', value: '5' },
        { key: 'last_meeting', label: 'Last Board Meeting', value: '2025-02-15' },
        { key: 'esg_committee_status', label: 'ESG Committee', value: 'Active' },
      ],
    },
  },
];

// Sample CSV data for file upload testing
export const sampleCSVData = `Company Name,Industry,Employees,CO2 Emissions,Water Usage,Female %,Turnover Rate
Acme Corporation,Technology,1280,5620,13200,44,7.8`;

export default mockPrefillSources;
