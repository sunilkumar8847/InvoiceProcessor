// src/components/invoice/DataTable.tsx
import React from 'react';
import { useInvoiceStore } from '../../hooks/useInvoiceStore';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const DataTable: React.FC = () => {
  const { extractedData, selectedFields } = useInvoiceStore();
  const navigate = useNavigate();
  
  // Get only selected fields
  const visibleFields = selectedFields.filter(field => field.selected);
  
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value || '-';
  };
  
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-xl font-medium mb-6">Extracted Invoice Data</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Invoice Name</th>
              {visibleFields.map((field) => (
                <th key={field.id} className="py-2 px-4 border-b text-left">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {extractedData.map((invoice) => (
              <tr key={invoice.id}>
                <td className="py-2 px-4 border-b">{invoice.name}</td>
                {visibleFields.map((field) => (
                  <td key={field.id} className="py-2 px-4 border-b">
                    {formatValue(invoice[field.id as keyof typeof invoice])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={() => navigate('/export')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
