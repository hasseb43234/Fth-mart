import React from 'react';
import { useStore } from '../../lib/store';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer = () => {
  const toasts = useStore((state) => state.toasts);
  const removeToast = useStore((state) => state.removeToast);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-emerald-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xl shadow-emerald-500/10';
        let iconColor = 'text-emerald-500';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-red-500 bg-white dark:bg-slate-900 shadow-xl shadow-red-500/10';
          iconColor = 'text-red-500';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderClass = 'border-amber-500 bg-white dark:bg-slate-900 shadow-xl shadow-amber-500/10';
          iconColor = 'text-amber-500';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-sky-500 bg-white dark:bg-slate-900 shadow-xl shadow-sky-500/10';
          iconColor = 'text-sky-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border-l-4 border ${borderClass} shadow-lg transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 -mr-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
