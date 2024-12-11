const formatDateByCountry = ({
  date,
  time = false,
  locale = 'ko-KR',
  options,
}: {
  date: Date;
  time?: boolean;
  locale?: string | string[];
  options?: Intl.DateTimeFormatOptions;
}) => {
  if (time) {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  }

  if (options) {
    return new Intl.DateTimeFormat(locale, { ...options }).format(date);
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const isToday = (date1: Date, date2: Date) =>
  formatDateByCountry({date: date1}) === formatDateByCountry({date: date2});

export { formatDateByCountry, isToday };
