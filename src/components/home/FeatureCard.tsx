
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  linkText: string;
}

const FeatureCard = ({ title, description, icon, linkTo, linkText }: FeatureCardProps) => {
  return (
    <Card className="h-full flex flex-col animate-fade-in">
      <CardHeader>
        <div className="p-3 bg-primary/10 rounded-full w-fit mb-3">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button variant="outline" asChild className="w-full">
          <Link to={linkTo} className="flex items-center justify-center">
            {linkText} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
