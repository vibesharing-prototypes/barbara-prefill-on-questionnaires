import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useQuestionnaireContext } from '../../context/QuestionnaireContext';
import PrefillLayoutSelector from './prefill/PrefillLayoutSelector';
import DefaultPrefillView from './prefill/DefaultPrefillView';
import IndividualByPerson from './prefill/IndividualByPerson';
import IndividualByQuestion from './prefill/IndividualByQuestion';

function PrefillStandalone() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getQuestionnaire,
    setActiveQuestionnaire,
    prefillLayout,
  } = useQuestionnaireContext();
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

  const handleClose = () => {
    window.close();
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Prefill Data - {questionnaire.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {questionnaire.description}
            </Typography>
          </Box>
          <IconButton
            edge="end"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <PrefillLayoutSelector />
        </Paper>

        <Box>
          {prefillLayout === 'default' && (
            <DefaultPrefillView questionnaire={questionnaire} />
          )}
          {prefillLayout === 'by-person' && (
            <IndividualByPerson questionnaire={questionnaire} />
          )}
          {prefillLayout === 'by-question' && (
            <IndividualByQuestion questionnaire={questionnaire} />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default PrefillStandalone;
