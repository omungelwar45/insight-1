
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, Download, ExternalLink, Upload } from 'lucide-react';

const ProjectOverview = () => {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Data Discovery & Analysis',
      description: 'Jupyter Notebook for exploring datasets and documenting quality issues',
      status: 'ready',
      deliverables: ['Data exploration notebook', 'Quality assessment report', 'Relationship mapping']
    },
    {
      phase: 'Phase 2',
      title: 'ETL Pipeline Development',
      description: 'Robust data cleaning and transformation pipeline',
      status: 'ready',
      deliverables: ['Data cleaning functions', 'Validation & error handling', 'SQLite database design']
    },
    {
      phase: 'Phase 3',
      title: 'Interactive Dashboard',
      description: 'Streamlit-style interface for data exploration and insights',
      status: 'ready',
      deliverables: ['Business KPIs', 'Data visualizations', 'Quality metrics dashboard']
    },
    {
      phase: 'Phase 4',
      title: 'Advanced AI Reconciliation',
      description: 'Gemini AI integration for schema mismatches (Bonus Challenge)',
      status: 'bonus',
      deliverables: ['AI reconciliation strategy', 'Implementation docs', 'Creative solutions']
    }
  ];

  const datasets = [
    { name: 'Customer Dataset', format: 'JSON', issues: '15+ quality issues', status: 'Download Required' },
    { name: 'Order Dataset', format: 'CSV', issues: 'Mixed date formats', status: 'Download Required' },
    { name: 'Product Dataset', format: 'JSON', issues: 'Type inconsistencies', status: 'Download Required' },
    { name: 'Reconciliation Dataset', format: 'CSV', issues: 'Schema mismatches', status: 'Bonus Challenge' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">Ready to Implement</Badge>;
      case 'bonus':
        return <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg">Bonus Challenge</Badge>;
      default:
        return <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="space-y-12 p-8">
        {/* Hero Section */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-800 bg-clip-text text-transparent mb-6">
              TechCorp Data Engineering Challenge
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Transform messy, inconsistent e-commerce data from three acquired platforms into a unified, 
              actionable business intelligence system. This challenge simulates real-world data engineering scenarios.
            </p>
          </div>
        </div>

        {/* Problem Statement */}
        <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-none shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <span className="text-white text-xl">🎯</span>
              </div>
              The Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                TechCorp has acquired three e-commerce platforms, each with different data formats, 
                naming conventions, and quality issues. Your mission is to create a complete ETL pipeline 
                that transforms this chaos into business insights.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Data Quality Issues
                  </h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      Multiple ID systems and formats
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      Inconsistent field naming conventions
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Mixed date formats and data types
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Missing relationships and duplicate records
                    </li>
                  </ul>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h4 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Technical Goals
                  </h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Build robust ETL pipeline
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      Design normalized database schema
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      Create interactive dashboard
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      Implement AI-powered reconciliation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Phases */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Implementation Phases</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {phases.map((phase, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-none shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-blue-700 transition-colors duration-300">
                      {phase.phase}: {phase.title}
                    </CardTitle>
                    {getStatusBadge(phase.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">{phase.description}</p>
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Deliverables
                    </h5>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-center space-x-3 group/item">
                          <CheckCircle className="h-4 w-4 text-green-500 group-hover/item:text-green-600 transition-colors" />
                          <span className="text-gray-600 group-hover/item:text-gray-700 transition-colors">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dataset Information */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Available Datasets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {datasets.map((dataset, index) => (
              <Card key={index} className="group text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-none">
                <CardContent className="pt-8 pb-6">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Download className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{dataset.name}</h4>
                    <Badge variant="outline" className="bg-gray-50 border-gray-200">{dataset.format}</Badge>
                    <p className="text-sm text-gray-600 leading-relaxed">{dataset.issues}</p>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all">
                      <Download className="h-4 w-4 mr-2" />
                      {dataset.status}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Getting Started */}
        <Card className="bg-gradient-to-br from-green-50 via-white to-blue-50 border-none shadow-2xl backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <span className="text-white text-xl">🚀</span>
              </div>
              Ready to Start?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                This workspace provides all the tools you need to complete the data engineering challenge. 
                Navigate through the tabs above to access different phases of the project.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Upload className="h-4 w-4 mr-2" />
                  Start with Data Ingestion
                </Button>
                <Button variant="outline" className="border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectOverview;
