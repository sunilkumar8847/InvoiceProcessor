// src/pages/FieldSelectionPage.tsx
import React from 'react';
import FieldSelector from '../components/invoice/FieldSelector';
import Layout from '../components/layout/Layout';

const FieldSelectionPage: React.FC = () => {
  return (
    <Layout>
      <FieldSelector />
    </Layout>
  );
};

export default FieldSelectionPage;