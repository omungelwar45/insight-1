
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Database, ArrowRight, Cog } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  duration?: number;
  recordsProcessed?: number;
  issuesFound?: number;
}

const ETLPipeline = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<PipelineStep[]>([
    {
      id: 'extract',
      name: 'Data Extraction',
      description: 'Reading from multiple data sources',
      status: 'pending'
    },
    {
      id: 'validate',
      name: 'Data Validation',
      description: 'Identifying quality issues and inconsistencies',
      status: 'pending'
    },
    {
      id: 'clean',
      name: 'Data Cleaning',
      description: 'Fixing inconsistencies and standardizing formats',
      status: 'pending'
    },
    {
      id: 'transform',
      name: 'Data Transformation',
      description: 'Normalizing and structuring data',
      status: 'pending'
    },
    {
      id: 'load',
      name: 'Data Loading',
      description: 'Loading into SQLite database',
      status: 'pending'
    }
  ]);

  const runPipeline = async () => {
    setIsRunning(true);
    setProgress(0);

    for (let i = 0; i < steps.length; i++) {
      // Update current step to running
      setSteps(prev => prev.map(step => 
        step.id === steps[i].id 
          ? { ...step, status: 'running' as const }
          : step
      ));

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update step to completed with mock data
      setSteps(prev => prev.map(step => 
        step.id === steps[i].id 
          ? { 
              ...step, 
              status: 'completed' as const,
              duration: Math.floor(Math.random() * 5000) + 1000,
              recordsProcessed: Math.floor(Math.random() * 10000) + 1000,
              issuesFound: Math.floor(Math.random() * 50) + 5
            }
          : step
      ));

      setProgress(((i + 1) / steps.length) * 100);
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'running':
        return <Cog className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">ETL Pipeline Execution</h2>
        <p className="text-gray-600">Transform messy data into clean, normalized database records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Pipeline Status</span>
            <Button 
              onClick={runPipeline} 
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? 'Running...' : 'Start Pipeline'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(step.status)}
                    <div className="font-medium">{step.name}</div>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{step.description}</p>
                    {step.status === 'completed' && (
                      <div className="flex space-x-4 mt-2 text-xs text-gray-500">
                        <span>Duration: {step.duration}ms</span>
                        <span>Records: {step.recordsProcessed?.toLocaleString()}</span>
                        <span>Issues Fixed: {step.issuesFound}</span>
                      </div>
                    )}
                  </div>
                  
                  <Badge className={getStatusColor(step.status)}>
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {progress === 100 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Pipeline Completed Successfully!</h3>
                <p className="text-green-600">Your data has been cleaned and loaded into the database.</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <Button variant="outline" className="border-green-300 text-green-700">
                <Database className="h-4 w-4 mr-2" />
                View Database Schema
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Open Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ETLPipeline;
