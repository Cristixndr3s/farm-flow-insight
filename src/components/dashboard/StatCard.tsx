
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: number;
  className?: string;
}

const StatCard = ({ title, value, icon, description, trend, className }: StatCardProps) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
            {trend !== undefined && (
              <div className={`flex items-center mt-1 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                <span>{trend >= 0 ? '↑' : '↓'}</span>
                <span className="ml-1">{Math.abs(trend)}% desde el mes pasado</span>
              </div>
            )}
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
