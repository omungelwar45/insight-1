
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Table, Key, Link, Search, Download } from 'lucide-react';

const DatabaseViewer = () => {
  const [selectedTable, setSelectedTable] = useState('customers');

  const tables = [
    {
      name: 'customers',
      records: 15847,
      columns: [
        { name: 'customer_id', type: 'INTEGER', primary: true, nullable: false },
        { name: 'full_name', type: 'TEXT', primary: false, nullable: false },
        { name: 'email', type: 'TEXT', primary: false, nullable: false },
        { name: 'phone', type: 'TEXT', primary: false, nullable: true },
        { name: 'created_at', type: 'DATETIME', primary: false, nullable: false },
        { name: 'updated_at', type: 'DATETIME', primary: false, nullable: false }
      ]
    },
    {
      name: 'orders',
      records: 28392,
      columns: [
        { name: 'order_id', type: 'INTEGER', primary: true, nullable: false },
        { name: 'customer_id', type: 'INTEGER', primary: false, nullable: false, foreignKey: 'customers.customer_id' },
        { name: 'order_date', type: 'DATETIME', primary: false, nullable: false },
        { name: 'total_amount', type: 'DECIMAL', primary: false, nullable: false },
        { name: 'status', type: 'TEXT', primary: false, nullable: false },
        { name: 'shipping_address', type: 'TEXT', primary: false, nullable: true }
      ]
    },
    {
      name: 'products',
      records: 5234,
      columns: [
        { name: 'product_id', type: 'INTEGER', primary: true, nullable: false },
        { name: 'product_name', type: 'TEXT', primary: false, nullable: false },
        { name: 'category', type: 'TEXT', primary: false, nullable: false },
        { name: 'price', type: 'DECIMAL', primary: false, nullable: false },
        { name: 'stock_quantity', type: 'INTEGER', primary: false, nullable: false },
        { name: 'description', type: 'TEXT', primary: false, nullable: true }
      ]
    },
    {
      name: 'order_items',
      records: 45123,
      columns: [
        { name: 'item_id', type: 'INTEGER', primary: true, nullable: false },
        { name: 'order_id', type: 'INTEGER', primary: false, nullable: false, foreignKey: 'orders.order_id' },
        { name: 'product_id', type: 'INTEGER', primary: false, nullable: false, foreignKey: 'products.product_id' },
        { name: 'quantity', type: 'INTEGER', primary: false, nullable: false },
        { name: 'unit_price', type: 'DECIMAL', primary: false, nullable: false }
      ]
    }
  ];

  const sampleData = {
    customers: [
      { customer_id: 1, full_name: 'John Smith', email: 'john.smith@email.com', phone: '+1-555-0123', created_at: '2024-01-15 10:30:00' },
      { customer_id: 2, full_name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1-555-0124', created_at: '2024-01-16 14:22:00' },
      { customer_id: 3, full_name: 'Mike Davis', email: 'mike.davis@email.com', phone: null, created_at: '2024-01-17 09:15:00' }
    ],
    orders: [
      { order_id: 1001, customer_id: 1, order_date: '2024-02-01 15:30:00', total_amount: 299.99, status: 'shipped' },
      { order_id: 1002, customer_id: 2, order_date: '2024-02-02 11:45:00', total_amount: 149.50, status: 'delivered' },
      { order_id: 1003, customer_id: 1, order_date: '2024-02-03 16:20:00', total_amount: 89.99, status: 'processing' }
    ],
    products: [
      { product_id: 1, product_name: 'Wireless Headphones', category: 'Electronics', price: 79.99, stock_quantity: 150 },
      { product_id: 2, product_name: 'Cotton T-Shirt', category: 'Clothing', price: 24.99, stock_quantity: 200 },
      { product_id: 3, product_name: 'JavaScript Handbook', category: 'Books', price: 39.99, stock_quantity: 75 }
    ],
    order_items: [
      { item_id: 1, order_id: 1001, product_id: 1, quantity: 2, unit_price: 79.99 },
      { item_id: 2, order_id: 1001, product_id: 3, quantity: 1, unit_price: 39.99 },
      { item_id: 3, order_id: 1002, product_id: 2, quantity: 3, unit_price: 24.99 }
    ]
  };

  const selectedTableData = tables.find(table => table.name === selectedTable);
  const currentSampleData = sampleData[selectedTable as keyof typeof sampleData];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Normalized Database Schema</h2>
        <p className="text-gray-600">Clean, structured data with proper relationships and constraints</p>
      </div>

      <Tabs defaultValue="schema" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schema">Schema Design</TabsTrigger>
          <TabsTrigger value="explorer">Data Explorer</TabsTrigger>
          <TabsTrigger value="relationships">Relationships</TabsTrigger>
        </TabsList>

        <TabsContent value="schema" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tables.map((table) => (
              <Card 
                key={table.name}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTable === table.name ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedTable(table.name)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Table className="h-5 w-5" />
                    <span>{table.name}</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{table.records.toLocaleString()} records</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {table.columns.slice(0, 3).map((column) => (
                      <div key={column.name} className="flex items-center justify-between text-xs">
                        <span className="font-mono">{column.name}</span>
                        <div className="flex space-x-1">
                          {column.primary && <Key className="h-3 w-3 text-yellow-500" />}
                          {column.foreignKey && <Link className="h-3 w-3 text-blue-500" />}
                        </div>
                      </div>
                    ))}
                    {table.columns.length > 3 && (
                      <p className="text-xs text-gray-500">+{table.columns.length - 3} more columns</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTableData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Table: {selectedTableData.name}</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {selectedTableData.records.toLocaleString()} records
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Column</th>
                        <th className="text-left p-2 font-medium">Type</th>
                        <th className="text-left p-2 font-medium">Constraints</th>
                        <th className="text-left p-2 font-medium">Relationship</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTableData.columns.map((column) => (
                        <tr key={column.name} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-mono">{column.name}</td>
                          <td className="p-2">{column.type}</td>
                          <td className="p-2">
                            <div className="flex space-x-1">
                              {column.primary && <Badge variant="outline" className="text-xs">PRIMARY KEY</Badge>}
                              {!column.nullable && <Badge variant="outline" className="text-xs">NOT NULL</Badge>}
                            </div>
                          </td>
                          <td className="p-2 text-xs text-blue-600">
                            {column.foreignKey && `→ ${column.foreignKey}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="explorer" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Data Explorer: {selectedTable}</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      {selectedTableData?.columns.map((column) => (
                        <th key={column.name} className="text-left p-3 font-medium">
                          {column.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentSampleData?.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="p-3">
                            {value === null ? (
                              <span className="text-gray-400 italic">null</span>
                            ) : (
                              String(value)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Showing first 3 rows of {selectedTableData?.records.toLocaleString()} total records
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Entity Relationship Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Customers */}
                  <div className="text-center">
                    <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-2">
                      <h3 className="font-bold text-blue-800">CUSTOMERS</h3>
                      <div className="text-xs text-blue-600 mt-2 space-y-1">
                        <div><Key className="inline h-3 w-3 mr-1" />customer_id</div>
                        <div>full_name</div>
                        <div>email</div>
                        <div>phone</div>
                      </div>
                    </div>
                  </div>

                  {/* Orders */}
                  <div className="text-center">
                    <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 mb-2">
                      <h3 className="font-bold text-green-800">ORDERS</h3>
                      <div className="text-xs text-green-600 mt-2 space-y-1">
                        <div><Key className="inline h-3 w-3 mr-1" />order_id</div>
                        <div><Link className="inline h-3 w-3 mr-1" />customer_id</div>
                        <div>order_date</div>
                        <div>total_amount</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="text-center">
                    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 mb-2">
                      <h3 className="font-bold text-yellow-800">ORDER_ITEMS</h3>
                      <div className="text-xs text-yellow-600 mt-2 space-y-1">
                        <div><Key className="inline h-3 w-3 mr-1" />item_id</div>
                        <div><Link className="inline h-3 w-3 mr-1" />order_id</div>
                        <div><Link className="inline h-3 w-3 mr-1" />product_id</div>
                        <div>quantity</div>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="text-center">
                    <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 mb-2">
                      <h3 className="font-bold text-purple-800">PRODUCTS</h3>
                      <div className="text-xs text-purple-600 mt-2 space-y-1">
                        <div><Key className="inline h-3 w-3 mr-1" />product_id</div>
                        <div>product_name</div>
                        <div>category</div>
                        <div>price</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="mb-2">Relationship Summary:</p>
                  <ul className="space-y-1">
                    <li>• Customers → Orders (One-to-Many)</li>
                    <li>• Orders → Order Items (One-to-Many)</li>
                    <li>• Products → Order Items (One-to-Many)</li>
                    <li>• Proper foreign key constraints ensure data integrity</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseViewer;
