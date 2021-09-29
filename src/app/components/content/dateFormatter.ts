const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const capitalize = (textToCapitalize: string) =>
  textToCapitalize.charAt(0).toUpperCase() + textToCapitalize.slice(1);

export const parseToEnglishDateString = (
  date: Date,
  shortFormat: boolean
): string => {
  const todayIndicator = isToday(date) && !shortFormat ? 'Today, ' : '';

  const weekday = new Intl.DateTimeFormat('en', {
    weekday: shortFormat ? 'short' : 'long',
  }).format(date);

  const dayOfMonth = new Intl.DateTimeFormat('en', {
    day: 'numeric',
  }).format(date);

  const month = new Intl.DateTimeFormat('en', {
    month: shortFormat ? 'short' : 'long',
  }).format(date);

  return `${todayIndicator}${weekday} ${dayOfMonth} ${month}`;
};

export const parseToSpanishDateString = (
  date: Date,
  shortFormat: boolean
): string => {
  const todayIndicator = isToday(date) ? 'Hoy, ' : '';

  const weekday = new Intl.DateTimeFormat('es', {
    weekday: shortFormat ? 'short' : 'long',
  }).format(date);

  const dayOfMonth = new Intl.DateTimeFormat('es', {
    day: 'numeric',
  }).format(date);

  const month = new Intl.DateTimeFormat('es', {
    month: shortFormat ? 'short' : 'long',
  }).format(date);

  return `${todayIndicator}${capitalize(weekday)} ${dayOfMonth} ${capitalize(
    month
  )}`;
};

export const parseToTimeString = (date: Date): string =>
  new Intl.DateTimeFormat('en', { timeStyle: 'short', hour12: false }).format(
    date
  );

export const addMinutesToDate = (date: Date, minutes: number): Date =>
  new Date(date.getTime() + minutes * 60000);

export const reduceMinutesToDate = (date: Date, minutes: number): Date =>
  new Date(date.getTime() - minutes * 60000);
