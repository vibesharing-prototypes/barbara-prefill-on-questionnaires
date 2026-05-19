import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import {
  History as HistoryIcon,
  Dashboard as DashboardIcon,
  UploadFile as UploadFileIcon,
  Link as LinkIcon,
  CheckCircle as CheckCircleIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import { usePrefillSource } from '../../../hooks/usePrefillSource';
import { red } from '@mui/material/colors';

function SourceSelector({ questionnaire, onSourceSelected }) {
  const { questionnaires } = useQuestionnaireContext();
  const {
    activePrefillSource,
    isProcessing,
    error,
    selectQuestionnaireSource,
    selectBoardSource,
    parseCSVFile,
    parseURLSource,
    selectManualSource,
  } = usePrefillSource();

  const [sourceType, setSourceType] = useState('previous');
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState('');
  const [url, setUrl] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      try {
        await parseCSVFile(acceptedFiles[0]);
      } catch (err) {
        console.error('Error parsing file:', err);
      }
    }
  }, [parseCSVFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
  });

  const handleSourceTypeChange = (event) => {
    setSourceType(event.target.value);
  };

  const handleQuestionnaireSelect = (event) => {
    const id = event.target.value;
    setSelectedQuestionnaireId(id);
    selectQuestionnaireSource(id);
  };

  const handleBoardSelect = () => {
    selectBoardSource();
  };

  const handleURLSubmit = async () => {
    if (url) {
      try {
        await parseURLSource(url);
      } catch (err) {
        console.error('Error fetching URL:', err);
      }
    }
  };

  const handleManualPrefill = () => {
    // Create a special "manual" source that bypasses field matching
    const manualSource = selectManualSource();
    // This will signal to skip the matching step
    if (onSourceSelected) {
      onSourceSelected(manualSource);
    }
  };

  const availableQuestionnaires = questionnaires.filter(q => q.id !== questionnaire.id);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select Prefill Source
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose where to load prefill data from. You can select from previous questionnaires,
        board information, upload a file, or fetch from a URL.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <FormControl component="fieldset" fullWidth>
        <RadioGroup value={sourceType} onChange={handleSourceTypeChange}>
          <Stack spacing={2}>
            {/* Previous Questionnaire */}
            <Card variant="outlined">
              <CardActionArea onClick={() => setSourceType('previous')}>
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, flex: 1 }}>
                    <FormControlLabel
                      value="previous"
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <HistoryIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">Previous Questionnaire</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reuse data from a previous questionnaire version
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
              {sourceType === 'previous' && (
                <CardContent sx={{ p: 0 }}>
                  <Divider sx={{ mb: 2 }} />
                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedQuestionnaireId}
                      onChange={handleQuestionnaireSelect}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select a questionnaire</em>
                      </MenuItem>
                      {availableQuestionnaires.map((q) => (
                        <MenuItem key={q.id} value={q.id}>
                          {q.title} ({q.version})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              )}
            </Card>

            {/* Board Information */}
            <Card variant="outlined">
              <CardActionArea onClick={() => { setSourceType('board'); handleBoardSelect(); }}>
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, flex: 1 }}>
                    <FormControlLabel
                      value="board"
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <DashboardIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box sx={{ flex: 1}}>
                      <Typography variant="h6">Board Information</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pull data from your board management system
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>

            {/* Upload File */}
            <Card variant="outlined">
              <CardActionArea onClick={() => setSourceType('file')}>
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, flex: 1 }}>
                    <FormControlLabel
                      value="file"
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <UploadFileIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">Upload File</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload a CSV or Excel file with prefill data
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
              {sourceType === 'file' && (
                <CardContent sx={{ p: 0 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Paper
                    {...getRootProps()}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      border: '2px dashed',
                      borderColor: isDragActive ? 'primary.main' : 'divider',
                      backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                      cursor: 'pointer',
                    }}
                  >
                    <input {...getInputProps()} />
                    <UploadFileIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                    {isDragActive ? (
                      <Typography>Drop the file here...</Typography>
                    ) : (
                      <Typography>
                        Drag & drop a file here, or click to select
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Supported formats: CSV, XLS, XLSX
                    </Typography>
                  </Paper>
                </CardContent>
              )}
            </Card>

            {/* URL */}
            <Card variant="outlined">
              <CardActionArea onClick={() => setSourceType('url')}>
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, flex: 1 }}>
                    <FormControlLabel
                      value="url"
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <LinkIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">URL</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fetch data from an external URL or API
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
              {sourceType === 'url' && (
                <CardContent sx={{ p: 0 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="https://example.com/data.json"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleURLSubmit} disabled={!url || isProcessing}>
                      Fetch
                    </Button>
                  </Stack>
                </CardContent>
              )}
            </Card>

            {/* Manual Prefill */}
            <Card variant="outlined">
              <CardActionArea onClick={() => { setSourceType('manual'); handleManualPrefill(); }}>
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, flex: 1 }}>
                    <FormControlLabel
                      value="manual"
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <EditIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">Manual Prefill</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Enter prefill data manually without importing
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </RadioGroup>
      </FormControl>

      {activePrefillSource && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{ mt: 3 }}
          action={
            <Button color="inherit" size="small" onClick={onSourceSelected}>
              Next: Match Fields
            </Button>
          }
        >
          <Typography variant="body2">
            <strong>Source selected:</strong> {activePrefillSource.name}
          </Typography>
          <Typography variant="caption">
            {activePrefillSource.data?.fields?.length || 0} fields available for matching
          </Typography>
        </Alert>
      )}
    </Box>
  );
}

export default SourceSelector;
