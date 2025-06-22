
import React from 'react';
import { Button } from '@/components/ui/button';
import { Database, Upload, Cog, BarChart3, FileText } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'overview', label: 'Project Overview', icon: FileText },
    { id: 'ingestion', label: 'Data Ingestion', icon: Upload },
    { id: 'pipeline', label: 'ETL Pipeline', icon: Cog },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'database', label: 'Database', icon: Database }
  ];

  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">TechCorp Data Engineering</h1>
            <p className="text-slate-300 text-sm">Unified E-commerce Data Pipeline</p>
          </div>
          <div className="text-right">
            <p className="text-slate-300 text-sm">Data Engineering Intern Challenge</p>
            <p className="text-blue-400 text-xs">Phase 1-4 Implementation</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
