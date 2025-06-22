// src/components/file-upload/FileItem.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { InvoiceFile } from '../../types';
import { useInvoiceStore } from '../../hooks/useInvoiceStore';

interface FileItemProps {
  file: InvoiceFile;
}

const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const { removeFile } = useInvoiceStore();
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
    else return (bytes / 1048576).toFixed(0) + ' MB';
  };
  
  const getFileIcon = () => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return (
        <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded text-red-500 text-xs">
          PDF
        </div>
      );
    } else if (extension === 'xls' || extension === 'xlsx') {
      return (
        <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded text-green-500 text-xs">
          XLS
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded text-orange-500 text-xs">
          JSON
        </div>
      );
    }
  };
  
  return (
    <div className="flex items-center mb-4">
      <div className="mr-3">
        {getFileIcon()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="text-sm font-medium">{file.name}</div>
          <button 
            onClick={() => removeFile(file.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
        <div className="text-xs text-gray-500">
          {formatFileSize(file.size)} of {formatFileSize(file.totalSize)} • 
          {file.status === 'uploading' && ' Uploading...'}
          {file.status === 'completed' && ' Completed'}
          {file.status === 'error' && (
            <span className="text-red-500"> {file.errorMessage || 'Error'}</span>
          )}
        </div>
        <Progress 
          value={file.progress} 
          className="h-1 mt-1" 
          indicatorClassName={
            file.status === 'completed' ? 'bg-blue-500' : 
            file.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }
        />
      </div>
    </div>
  );
};

export default FileItem;