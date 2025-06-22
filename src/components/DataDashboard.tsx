
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, ShoppingCart, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const DataDashboard = () => {
  // Mock data for visualizations
  const salesData = [
    { month: 'Jan', sales: 12500, orders: 245 },
    { month: 'Feb', sales: 15200, orders: 289 },
    { month: 'Mar', sales: 18900, orders: 342 },
    { month: 'Apr', sales: 16700, orders: 318 },
    { month: 'May', sales: 21400, orders: 387 },
    { month: 'Jun', sales: 19800, orders: 356 }
  ];

  const productCategoryData = [
    { name: 'Electronics', value: 35, color: '#8884d8' },
    { name: 'Clothing', value: 28, color: '#82ca9d' },
    { name: 'Books', value: 20, color: '#ffc658' },
    { name: 'Home & Garden', value: 17, color: '#ff7c7c' }
  ];

  const dataQualityMetrics = [
    { metric: 'Records Processed', value: '45,230', change: '+12%', status: 'good' },
    { metric: 'Duplicates Removed', value: '2,847', change: '-5%', status: 'good' },
    { metric: 'Missing Values Fixed', value: '8,392', change: '-15%', status: 'good' },
    { metric: 'Data Quality Score', value: '94.2%', change: '+8%', status: 'excellent' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Business Intelligence Dashboard</h2>
        <p className="text-gray-600">Insights from your cleaned and unified data</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataQualityMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">{metric.value}</p>
                <span className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
          <TabsTrigger value="relationships">Entity Relationships</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Monthly Sales Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Product Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Order Volume Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Data Issues Resolved</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Duplicate Records</span>
                    <Badge className="bg-green-100 text-green-800">2,847 Fixed</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Missing Values</span>
                    <Badge className="bg-blue-100 text-blue-800">8,392 Filled</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">Format Inconsistencies</span>
                    <Badge className="bg-purple-100 text-purple-800">5,129 Standardized</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium">Data Type Errors</span>
                    <Badge className="bg-orange-100 text-orange-800">1,563 Corrected</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schema Normalization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <strong>Before:</strong> 3 inconsistent schemas
                  </div>
                  <div className="text-sm">
                    <strong>After:</strong> 1 unified normalized schema
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-xs font-mono">
                    <div>customers (normalized)</div>
                    <div>├── customer_id (PRIMARY KEY)</div>
                    <div>├── full_name (standardized)</div>
                    <div>├── email (validated)</div>
                    <div>└── created_at (ISO format)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entity Relationship Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-lg mb-3">
                    <Users className="h-8 w-8 mx-auto text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Customers</h3>
                  <p className="text-sm text-gray-600">15,847 records</p>
                  <p className="text-xs text-gray-500">Unified from 3 sources</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-lg mb-3">
                    <ShoppingCart className="h-8 w-8 mx-auto text-green-600" />
                  </div>
                  <h3 className="font-semibold">Orders</h3>
                  <p className="text-sm text-gray-600">28,392 records</p>
                  <p className="text-xs text-gray-500">Linked to customers</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-lg mb-3">
                    <Package className="h-8 w-8 mx-auto text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Products</h3>
                  <p className="text-sm text-gray-600">5,234 records</p>
                  <p className="text-xs text-gray-500">Connected to orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataDashboard;
