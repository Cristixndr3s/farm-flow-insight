import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PiggyBank, FileText, BarChart3, AlertCircle, Download, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Mock data for demonstration - in a real app, this would come from an API
const mockFinancialData = {
  summary: {
    initialInvestment: 15000000,
    projectedRevenue: 28000000,
    expectedProfit: 13000000,
    roi: 86.7,
    cashFlowStatus: 'Positivo',
    riskLevel: 'Positivo'
  },
  recommendations: [
    {
      title: 'Diversificar cultivos',
      description: 'Considerar agregar al menos un cultivo adicional para reducir riesgos',
      priority: 'Alta'
    },
    {
      title: 'Refinanciar préstamo actual',
      description: 'Las tasas actuales son más favorables que su préstamo existente',
      priority: 'Media'
    },
    {
      title: 'Optimizar gastos de riego',
      description: 'Implementar sistema de riego por goteo para reducir costos en 20%',
      priority: 'Media'
    }
  ],
  cashFlowData: [
  { "month": "Ene", "ingresos": 2400000, "egresos": 1000000, "balance": 1400000 },
  { "month": "Feb", "ingresos": 2300000, "egresos": 1000000, "balance": 1300000 },
  { "month": "Mar", "ingresos": 2500000, "egresos": 1100000, "balance": 1400000 },
  { "month": "Abr", "ingresos": 2200000, "egresos": 1000000, "balance": 1200000 },
  { "month": "May", "ingresos": 2600000, "egresos": 1100000, "balance": 1500000 },
  { "month": "Jun", "ingresos": 2700000, "egresos": 1000000, "balance": 1700000 },
  { "month": "Jul", "ingresos": 2500000, "egresos": 900000,  "balance": 1600000 },
  { "month": "Ago", "ingresos": 2800000, "egresos": 1200000, "balance": 1600000 },
  { "month": "Sep", "ingresos": 2600000, "egresos": 1000000, "balance": 1600000 },
  { "month": "Oct", "ingresos": 2700000, "egresos": 900000,  "balance": 1800000 },
  ],
};

const FinancialReport = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
const [reportData, setReportData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [cashFlowRes, resultadoRes] = await Promise.all([
        fetch('/data/cashflow.json'),
        fetch('/data/resultado.json'),
      ]);

      const cashFlow = await cashFlowRes.json();
      const resultado = await resultadoRes.json();

      const data = {
        ...mockFinancialData,
        cashFlowData: cashFlow,
        recommendations: resultado.recommendations, // sobrescribe recomendaciones
        riesgo: resultado.riesgo // nuevo campo
      };

      setReportData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error cargando archivos JSON:', error);
      setIsLoading(false);
    }
  };

  fetchData();
}, []);



  const handleDownloadReport = () => {
    // Logic to download the report as PDF would go here
    console.log('Downloading report...');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh] flex-col">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <h2 className="text-xl font-semibold text-agri-primary">Generando su plan financiero...</h2>
          <p className="text-muted-foreground mt-2">Estamos analizando sus datos y preparando recomendaciones personalizadas</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-agri-primary">Su Plan Financiero</h1>
            <p className="text-muted-foreground">Análisis y recomendaciones basadas en sus datos financieros</p>
          </div>
          <Button onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" /> Descargar PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PiggyBank className="h-5 w-5 mr-2 text-green-600" />
                Inversión Inicial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${reportData?.summary.initialInvestment.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Ingresos Proyectados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${reportData?.summary.projectedRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Ganancia Estimada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${reportData?.summary.expectedProfit.toLocaleString()}</div>
              <div className="text-sm text-green-600 font-medium">ROI: {reportData?.summary.roi}%</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
            <TabsTrigger value="cashflow">Flujo de Caja</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones Financieras</CardTitle>
                <CardDescription>
                  Acciones sugeridas para optimizar su plan financiero
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData?.recommendations.map((rec, index) => (
                    <div key={index} className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm">
                      <div className="flex items-start">
                        <div className={`rounded-full p-2 mr-3 ${
                          rec.priority === 'Alta' ? 'bg-red-100' :
                          rec.priority === 'Media' ? 'bg-amber-100' : 'bg-blue-100'
                        }`}>
                          <AlertCircle className={`h-5 w-5 ${
                            rec.priority === 'Alta' ? 'text-red-600' :
                            rec.priority === 'Media' ? 'text-amber-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{rec.title}</h3>
                          <p className="text-gray-600">{rec.description}</p>
                          <div className={`text-xs font-medium mt-2 inline-block px-2 py-1 rounded ${
                            rec.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'Media' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            Prioridad {rec.priority}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cashflow" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Proyección de Flujo de Caja</CardTitle>
                <CardDescription>
                  Estimación mensual de ingresos, egresos y balance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Egresos</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData?.cashFlowData.map((month, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{month.month}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${month.ingresos.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">${month.egresos.toLocaleString()}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${month.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${month.balance.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">Análisis de riesgo</h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>{reportData?.riesgo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" asChild>
            <Link to="/">Volver al Inicio</Link>
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Descargar Informe Completo
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default FinancialReport;