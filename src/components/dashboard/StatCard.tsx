import { Card } from '@/components/common';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon,
  color = 'blue' 
}: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    red: 'text-red-600 bg-red-100',
    yellow: 'text-yellow-600 bg-yellow-100'
  };

  const isPositiveChange = change !== undefined && change > 0;
  const isNegativeChange = change !== undefined && change < 0;

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositiveChange && (
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
              )}
              {isNegativeChange && (
                <ArrowDownIcon className="w-4 h-4 text-red-500" />
              )}
              <span className={cn(
                'text-sm font-medium ml-1',
                isPositiveChange && 'text-green-600',
                isNegativeChange && 'text-red-600',
                change === 0 && 'text-gray-600'
              )}>
                {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-sm text-gray-500 ml-2">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={cn('p-3 rounded-lg', colorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
}