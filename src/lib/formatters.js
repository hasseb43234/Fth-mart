// PKR Currency, Date, and ID formatters

export const formatPKR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Rs 0';
  const rounded = Math.round(Number(amount));
  return `Rs ${rounded.toLocaleString('en-PK')}`;
};

export const formatPercentage = (val) => {
  if (!val) return '0%';
  return `${Math.round(val)}%`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
  return `FTH-${year}-${randomSixDigit}`;
};

export const generateTrackingNumber = (courierPrefix = 'TCS') => {
  const randomNine = Math.floor(100000000 + Math.random() * 900000000);
  return `${courierPrefix}-PK-${randomNine}`;
};
