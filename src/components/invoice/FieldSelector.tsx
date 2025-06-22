// src/components/invoice/FieldSelector.tsx
import React from 'react';
import { useInvoiceStore } from '../../hooks/useInvoiceStore';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/apiClient';

const FieldSelector: React.FC = () => {
  const { selectedFields, toggleFieldSelection, files, setExtractedData } = useInvoiceStore();
  const navigate = useNavigate();
  
  const handleExtract = async () => {
    const fileIds = files.filter(f => f.status === 'completed').map(f => f.id);
    const selectedFieldIds = selectedFields.filter(f => f.selected).map(f => f.id);
    
    try {
      const data = await apiClient.extractData(fileIds, selectedFieldIds);
      setExtractedData(data);
      navigate('/results');
    } catch (error) {
      console.error('Extraction failed:', error);
    }
  };
  
  const handleSelectAll = () => {
    selectedFields.forEach(field => {
      if (!field.selected) {
        toggleFieldSelection(field.id);
      }
    });
  };
  
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-medium mb-6 text-center">Invoice fields</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {selectedFields.map((field) => (
          <div key={field.id} className="flex items-center">
            <Checkbox 
              id={field.id}
              checked={field.selected}
              onCheckedChange={() => toggleFieldSelection(field.id)}
              className="border-blue-500 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <label htmlFor={field.id} className="ml-2 text-sm">
              {field.name}
            </label>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="flex items-center">
          <Checkbox 
            id="select-all"
            checked={selectedFields.every(field => field.selected)}
            onCheckedChange={handleSelectAll}
            className="border-gray-300"
          />
          <label htmlFor="select-all" className="ml-2 text-sm text-gray-600">
            Select All
          </label>
        </div>
        
        <Button 
          onClick={handleExtract}
          disabled={!selectedFields.some(field => field.selected)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Extract
        </Button>
      </div>
    </div>
  );
};

export default FieldSelector;