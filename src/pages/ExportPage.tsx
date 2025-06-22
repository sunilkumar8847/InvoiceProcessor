// src/pages/ExportPage.tsx
import React from 'react';
import ExportOptions from '../components/invoice/ExportOptions';
import Layout from '../components/layout/Layout';

const ExportPage: React.FC = () => {
  return (
    <Layout>
      <ExportOptions />
    </Layout>
  );
};

export default ExportPage;