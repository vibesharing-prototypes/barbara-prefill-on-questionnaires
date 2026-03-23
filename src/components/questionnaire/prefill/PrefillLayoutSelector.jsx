import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from '@mui/material';
import {
  ViewDay as ViewDayIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from '@mui/icons-material';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';

function PrefillLayoutSelector() {
  const { prefillLayout, setPrefillLayout } = useQuestionnaireContext();

  const handleLayoutChange = (event) => {
    setPrefillLayout(event.target.value);
  };

  const layouts = [
    {
      value: 'default',
      title: 'Default',
      description: 'Single answer applies to all participants',
      icon: <ViewDayIcon sx={{ fontSize: 40 }} />,
    },
    {
      value: 'by-person',
      title: 'Individual by Person',
      description: 'Navigate through each participant',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
    },
    {
      value: 'by-question',
      title: 'Individual by Question',
      description: 'See all participants for each question',
      icon: <QuestionAnswerIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Prefill Layout
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose how you want to view and manage prefilled answers
      </Typography>

      <RadioGroup value={prefillLayout} onChange={handleLayoutChange}>
        <Grid container spacing={2}>
          {layouts.map((layout) => (
            <Grid item xs={12} md={4} key={layout.value}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  borderColor: prefillLayout === layout.value ? 'primary.main' : 'divider',
                  borderWidth: prefillLayout === layout.value ? 2 : 1,
                }}
              >
                <CardActionArea onClick={() => setPrefillLayout(layout.value)}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <FormControlLabel
                        value={layout.value}
                        control={<Radio />}
                        label=""
                        sx={{ m: 0 }}
                      />
                      <Box sx={{ color: 'primary.main' }}>
                        {layout.icon}
                      </Box>
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {layout.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {layout.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Box>
  );
}

export default PrefillLayoutSelector;
