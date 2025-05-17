
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeatureCard from '@/components/home/FeatureCard';
import { BarChart3, FileText, Calendar, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      title: "Crear un Plan Financiero",
      description: "Ingresa tus datos financieros para recibir un plan personalizado y recomendaciones adaptadas a tu actividad agrícola.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      linkTo: "/plan/new",
      linkText: "Crear plan"
    },
    {
      title: "Dashboard Financiero",
      description: "Visualiza tu situación financiera con gráficos interactivos y métricas clave para tomar decisiones informadas.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      linkTo: "/dashboard",
      linkText: "Ver dashboard"
    },
    {
      title: "Calendario Agrícola",
      description: "Organiza tus actividades agrícolas y asegúrate de optimizar tus finanzas según las temporadas de siembra y cosecha.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
      linkTo: "/calendar",
      linkText: "Ver calendario"
    },
    {
      title: "Gestión de Préstamos",
      description: "Administra tus préstamos y recibe alertas sobre vencimientos y recomendaciones para optimizar tu financiamiento.",
      icon: <PiggyBank className="h-6 w-6 text-primary" />,
      linkTo: "/loans",
      linkText: "Gestionar préstamos"
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto space-y-10 py-6">
        <HeroSection />

        <section className="py-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-agri-primary">¿Qué te gustaría hacer hoy?</h2>
            <p className="text-muted-foreground">Selecciona una opción para comenzar a optimizar tus finanzas agrícolas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                linkTo={feature.linkTo}
                linkText={feature.linkText}
              />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-10">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-agri-primary mb-2">¿Necesitas ayuda para empezar?</h2>
              <p className="text-gray-600 max-w-2xl">
                Nuestro sistema te guiará paso a paso para crear un plan financiero adaptado a tus necesidades. 
                También puedes ver nuestros tutoriales para sacar el máximo provecho de la plataforma.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/help">Ver tutoriales</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Contactar soporte</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
