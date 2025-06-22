// src/components/file-upload/FileUploader.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useInvoiceStore } from '../../hooks/useInvoiceStore';
import { apiClient } from '../../api/apiClient';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import FileItem from './FileItem';

const FileUploader: React.FC = () => {
  const { files, addFile, updateFileProgress, updateFileStatus } = useInvoiceStore();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    for (const file of acceptedFiles) {
      try {
        // Add file to store with initial state
        const newFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          totalSize: file.size,
          progress: 0,
          status: 'uploading' as const
        };
        
        addFile(newFile);
        
        // Start upload with progress tracking
        const uploadedFile = await apiClient.uploadFile(file);
        updateFileStatus(newFile.id, 'completed');
      } catch (error: any) {
        // Handle upload error
        updateFileStatus(
          error.id, 
          'error', 
          error.errorMessage || 'Upload failed'
        );
      }
    }
    
    setIsUploading(false);
  }, [addFile, updateFileProgress, updateFileStatus]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/json': ['.json']
    }
  });

  const handleSubmit = () => {
    if (files.length > 0 && !files.some(file => file.status === 'uploading')) {
      navigate('/fields');
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gray-100 rounded-full p-3">
          <Upload className="text-gray-500" size={24} />
        </div>
        <h2 className="text-xl ml-2">Upload files</h2>
      </div>
      
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {files.length === 0 ? (
          <>
            <div className="flex justify-center mb-4">
              <Upload className="text-gray-500" size={32} />
            </div>
            <p>Choose a file or drag & drop it here</p>
            <p className="text-gray-500 text-sm mt-1">PDF, XLS, JSON formats.</p>
            <div className="mt-4">
              <Button variant="outline" className="bg-white border-gray-300">
                Browse File
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {files.map((file) => (
              <FileItem key={file.id} file={file} />
            ))}
            <div className="flex justify-center">
              <Button variant="outline" className="text-sm">
                Add Files
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={files.length === 0 || files.some(file => file.status === 'uploading')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;