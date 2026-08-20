import React from 'react';
import { Star } from 'lucide-react';

export const Rating = ({ rating = 5, reviewsCount = null, size = 'sm', showValue = true, interactive = false, onChange = null }) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const currentSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className="flex items-center gap-1.5 inline-flex">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform p-0.5' : 'cursor-default'}`}
          >
            <Star
              className={`${currentSize} ${
                star <= Math.round(rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-200 fill-slate-100'
              }`}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-bold text-slate-700">
          {typeof rating === 'number' ? rating.toFixed(1) : rating}
        </span>
      )}
      {reviewsCount !== null && (
        <span className="text-xs text-slate-600">
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
