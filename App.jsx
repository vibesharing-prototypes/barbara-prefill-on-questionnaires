import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import QuestionnaireBuilder from './components/questionnaire/QuestionnaireBuilder';
import QuestionnaireCompare from './components/questionnaire/comparison/QuestionnaireCompare';
import PrefillStandalone from './components/questionnaire/PrefillStandalone';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Hero />
            <About />
            <Contact />
          </div>
        }
      />
      <Route
        path="/questionnaire/:id/prefill"
        element={<PrefillStandalone />}
      />
      <Route
        path="/questionnaire/:id/compare/:compareId"
        element={<QuestionnaireCompare />}
      />
      <Route
        path="/questionnaire/:id"
        element={<QuestionnaireBuilder />}
      />
    </Routes>
  );
}

export default App;
