// src/components/invoice/ExportOptions.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { apiClient } from '../../api/apiClient';

type ExportFormat = 'json' | 'pdf' | 'xls';

const ExportOptions: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [downloading, setDownloading] = useState(false);
  
  const handleDownload = async () => {
    setDownloading(true);
    try {
      const dataUrl = await apiClient.exportData(selectedFormat);
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Invoice.${selectedFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setDownloading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-medium mb-2 text-center">Download files</h2>
      <p className="text-gray-500 text-sm text-center mb-8">Extract your Invoice Details</p>
      
      <RadioGroup 
        value={selectedFormat} 
        onValueChange={(value) => setSelectedFormat(value as ExportFormat)}
        className="space-y-4"
      >
        <div className="flex items-center border rounded-lg p-3">
          <RadioGroupItem value="json" id="json" className="border-gray-300" />
          <div className="ml-4 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded">
              <span className="text-orange-500 text-xs font-bold">JSON</span>
            </div>
            <div className="ml-3">
              <Label htmlFor="json" className="font-medium">Invoice.Json</Label>
              <p className="text-xs text-gray-500">60 KB of 120 KB • File ready</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center border rounded-lg p-3">
          <RadioGroupItem value="pdf" id="pdf" className="border-gray-300" />
          <div className="ml-4 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded">
              <span className="text-red-500 text-xs font-bold">PDF</span>
            </div>
            <div className="ml-3">
              <Label htmlFor="pdf" className="font-medium">Invoice.Pdf</Label>
              <p className="text-xs text-gray-500">60 KB of 120 KB • File ready</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center border rounded-lg p-3">
          <RadioGroupItem value="xls" id="xls" className="border-gray-300" />
          <div className="ml-4 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded">
              <span className="text-green-500 text-xs font-bold">XLS</span>
            </div>
            <div className="ml-3">
              <Label htmlFor="xls" className="font-medium">Invoice.Xls</Label>
              <p className="text-xs text-gray-500">60 KB of 120 KB • File ready</p>
            </div>
          </div>
        </div>
      </RadioGroup>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleDownload}
          disabled={downloading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {downloading ? 'Downloading...' : 'Download'}
        </Button>
      </div>
    </div>
  );
};

export default ExportOptions;