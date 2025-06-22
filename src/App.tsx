// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import FieldSelectionPage from './pages/FieldSelectionPage';
import ResultsPage from './pages/ResultsPage';
import ExportPage from './pages/ExportPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/fields" element={<FieldSelectionPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;