import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    primary: 'bg-sky-50 text-sky-700 border-sky-200 font-semibold',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    deal: 'bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold shadow-sm',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
    choice: 'bg-amber-400 text-slate-950 font-black uppercase tracking-tight',
    superdeal: 'bg-red-600 text-white font-black tracking-wider uppercase'
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5 rounded',
    sm: 'text-xs px-2 py-0.5 rounded-md',
    md: 'text-xs px-2.5 py-1 rounded-lg'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 border border-transparent ${variants[variant] || variants.default} ${
        sizes[size] || sizes.sm
      } ${className}`}
    >
      {children}
    </span>
  );
};
