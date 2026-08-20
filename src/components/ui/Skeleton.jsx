import React from 'react';

export const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = 'animate-pulse bg-slate-200';
  const variantClasses = {
    rect: 'rounded-md',
    circle: 'rounded-full',
    card: 'rounded-2xl h-72 w-full'
  };

  return <div className={`${baseClasses} ${variantClasses[variant] || 'rounded-md'} ${className}`} />;
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex flex-col gap-3">
      <Skeleton className="w-full aspect-square rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};
