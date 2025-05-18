
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-agri-light/30 to-white rounded-xl">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="relative px-6 py-12 md:py-16 md:px-10 max-w-5xl mx-auto">
        <div className="text-center md:text-left md:max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-agri-primary tracking-tight">
            Planificación Financiera Inteligente para Agricultores
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Optimiza tus finanzas agrícolas con nuestro sistema inteligente que genera planes personalizados 
            y recomendaciones adaptadas a tu calendario de cultivos y flujo de caja.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <Link to="/financial-report" className="flex items-center">
                Crear Nuevo Plan Financiero
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">
                Ver Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
