// src/pages/UploadPage.tsx
import React from 'react';
import FileUploader from '../components/file-upload/FileUploader';
import Layout from '../components/layout/Layout';

const UploadPage: React.FC = () => {
  return (
    <Layout>
      <FileUploader />
    </Layout>
  );
};

export default UploadPage;