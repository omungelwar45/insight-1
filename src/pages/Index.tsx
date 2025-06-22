
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ProjectOverview from '@/components/ProjectOverview';
import DataIngestion from '@/components/DataIngestion';
import ETLPipeline from '@/components/ETLPipeline';
import DataDashboard from '@/components/DataDashboard';
import DatabaseViewer from '@/components/DatabaseViewer';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ProjectOverview />;
      case 'ingestion':
        return <DataIngestion />;
      case 'pipeline':
        return <ETLPipeline />;
      case 'dashboard':
        return <DataDashboard />;
      case 'database':
        return <DatabaseViewer />;
      default:
        return <ProjectOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
