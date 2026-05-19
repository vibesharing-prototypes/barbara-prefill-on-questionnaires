import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useQuestionnaireContext } from '../../context/QuestionnaireContext';
import BuildingTab from './tabs/BuildingTab';
import LogicTab from './tabs/LogicTab';
import PrefillTab from './tabs/PrefillTab';
import PublishingTab from './tabs/PublishingTab';

function QuestionnaireBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuestionnaire, setActiveQuestionnaire } = useQuestionnaireContext();
  const [activeTab, setActiveTab] = useState(2); // Start at Prefill tab for demo
  const questionnaire = getQuestionnaire(id);

  useEffect(() => {
    if (questionnaire) {
      setActiveQuestionnaire(questionnaire);
    }
  }, [questionnaire, setActiveQuestionnaire]);

  if (!questionnaire) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Questionnaire not found</Typography>
      </Container>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleBack}
            sx={{ mr: 2 }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {questionnaire.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {questionnaire.description}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Version: {questionnaire.version}
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper sx={{ borderRadius: 0 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Building" />
          <Tab label="Logic" />
          <Tab label="Prefill" />
          <Tab label="Publishing" />
        </Tabs>
      </Paper>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {activeTab === 0 && <BuildingTab questionnaire={questionnaire} />}
        {activeTab === 1 && <LogicTab questionnaire={questionnaire} />}
        {activeTab === 2 && <PrefillTab questionnaire={questionnaire} />}
        {activeTab === 3 && <PublishingTab questionnaire={questionnaire} />}
      </Container>
    </Box>
  );
}

export default QuestionnaireBuilder;
