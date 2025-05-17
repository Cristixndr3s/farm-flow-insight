
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface Step {
  title: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: Step[];
  children: React.ReactElement[];
  onComplete?: (data: any) => void;
}

const MultiStepForm = ({ steps, children, onComplete }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const next = (data?: Record<string, any>) => {
    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else if (onComplete) {
      onComplete(formData);
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateData = (data: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Make sure we only render one form step at a time
  const currentChild = React.Children.toArray(children)[currentStep];
  
  // Clone the element to pass the necessary props
  const formStep = React.isValidElement(currentChild) 
    ? React.cloneElement(currentChild, { 
        formData, 
        updateFormData: updateData,
        next,
        previous
      }) 
    : null;

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex-1 relative ${
                index > 0 ? 'before:content-[""] before:absolute before:left-0 before:top-1/2 before:h-0.5 before:w-full before:-translate-x-1/2 before:bg-gray-200 ' : ''
              }${
                index < currentStep ? 'before:bg-primary' : ''
              }`}
            >
              <div className="relative flex flex-col items-center">
                <div 
                  className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    index < currentStep 
                      ? 'bg-primary border-primary text-white' 
                      : index === currentStep 
                        ? 'bg-white border-primary text-primary' 
                        : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span 
                  className={`mt-2 text-xs font-medium hidden sm:block ${
                    index <= currentStep ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="border-gray-200">
        <CardContent className="pt-6">
          {formStep}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={previous}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => next()}
                className="flex items-center ml-auto"
              >
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => onComplete && onComplete(formData)}
                className="bg-agri-primary hover:bg-agri-dark ml-auto"
              >
                Generar Plan Financiero
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiStepForm;
