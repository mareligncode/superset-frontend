/**
 * Get localized Ethiopian month name
 * @param monthKey - Month key (e.g., 'meskerem', 'hamle')
 * @param t - Translation function from useTranslation()
 * @returns Localized month name
 */
export const getLocalizedMonth = (monthKey: string, t: (key: string) => string): string => {
  const lowerKey = monthKey.toLowerCase().replace(/^\d+-/, ''); // Remove number prefix if present
  return t(lowerKey);
};

/**
 * Get localized month with number prefix
 * @param monthWithNumber - Month with number (e.g., '01-Hamle', '03-Meskerem')
 * @param t - Translation function from useTranslation()
 * @returns Localized month with number prefix (e.g., '01-ሐምሌ', '03-መስከረም')
 */
export const getLocalizedMonthWithNumber = (monthWithNumber: string, t: (key: string) => string): string => {
  const parts = monthWithNumber.split('-');
  if (parts.length === 2) {
    const number = parts[0];
    const monthKey = parts[1].toLowerCase();
    return `${number}-${t(monthKey)}`;
  }
  return monthWithNumber;
};

/**
 * Ethiopian month keys in order
 */
export const ETHIOPIAN_MONTH_KEYS = [
  'meskerem',
  'tikimt',
  'hidar',
  'tahsas',
  'tir',
  'yekatit',
  'megabit',
  'miazia',
  'ginbot',
  'sene',
  'hamle',
  'nehase',
  'pagume',
];
