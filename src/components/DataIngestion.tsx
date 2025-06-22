
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Database, FileText, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface DataFile {
  name: string;
  size: number;
  type: string;
  content?: any;
  issues?: string[];
}

const DataIngestion = () => {
  const [uploadedFiles, setUploadedFiles] = useState<DataFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          let content;
          let detectedIssues: string[] = [];

          if (file.name.endsWith('.json')) {
            content = JSON.parse(e.target?.result as string);
            // Simulate data quality analysis
            detectedIssues = [
              'Mixed ID formats detected',
              'Inconsistent field naming',
              'Null values found in critical fields'
            ];
          } else if (file.name.endsWith('.csv')) {
            content = e.target?.result as string;
            detectedIssues = [
              'Multiple date formats detected',
              'Data type inconsistencies',
              'Duplicate records found'
            ];
          }

          const newFile: DataFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            content,
            issues: detectedIssues
          };

          setUploadedFiles(prev => [...prev, newFile]);
          toast.success(`${file.name} uploaded and analyzed`);
        } catch (error) {
          toast.error(`Error processing ${file.name}`);
        }
      };
      reader.readAsText(file);
    });
  };

  const runDataAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success('Data quality analysis completed');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Data Ingestion & Quality Assessment</h2>
        <p className="text-gray-600">Upload your messy datasets and let's discover the data quality issues</p>
      </div>

      <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <div className="space-y-4">
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload Customer, Order, Product, or Reconciliation datasets
                  </span>
                  <span className="text-xs text-gray-500">Supports JSON and CSV files</span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple
                  accept=".json,.csv"
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </div>
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedFiles.map((file, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">{file.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    Size: {(file.size / 1024).toFixed(1)} KB
                  </p>
                  {file.issues && (
                    <div>
                      <p className="text-xs font-medium text-red-600 mb-1">Data Quality Issues:</p>
                      <ul className="text-xs text-red-500 space-y-1">
                        {file.issues.map((issue, i) => (
                          <li key={i}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={runDataAnalysis} 
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Database className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Run Full Analysis'}
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default DataIngestion;
