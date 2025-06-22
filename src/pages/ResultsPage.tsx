// src/pages/ResultsPage.tsx
import React from 'react';
import DataTable from '../components/invoice/DataTable';
import Layout from '../components/layout/Layout';

const ResultsPage: React.FC = () => {
  return (
    <Layout>
      <DataTable />
    </Layout>
  );
};

export default ResultsPage;