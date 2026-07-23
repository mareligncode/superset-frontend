import type { TFunction } from 'i18next';


/**
 * Maps region names (short or full) to their corresponding translation keys in i18n
 */
export const getRegionTranslationKey = (regionName: string): string => {
  const normalized = regionName.trim().toLowerCase();

  if (normalized.includes('addis ababa')) return 'addisAbabaRegion';
  if (normalized.includes('afar')) return 'afarRegion';
  if (normalized.includes('amhara')) return 'amharaRegion';
  if (normalized.includes('benishangul')) return 'benishangulGumuzRegion';
  if (normalized.includes('central ethiop')) return 'centralEthiopianRegion';
  if (normalized.includes('dire dawa')) return 'direDawaRegion';
  if (normalized.includes('gambela')) return 'gambelaRegion';
  if (normalized.includes('harari')) return 'harariRegion';
  if (normalized.includes('oromia')) return 'oromiaRegion';
  if (normalized.includes('sidama')) return 'sidamaRegion';
  if (normalized.includes('somali')) return 'somaliRegion';
  if (normalized.includes('south west ethiop') || normalized.includes('southwest')) return 'southwestEthiopianRegion';
  if (normalized.includes('southern nations') || normalized.includes('south ethiop')) return 'southernNationsRegion';
  if (normalized.includes('tigray')) return 'tigrayRegion';

  return regionName;
};

/**
 * Returns localized region name given a raw region name string and translation function t
 */
export const getLocalizedRegionName = (regionName: string, t: TFunction | ((key: string) => string)): string => {
  if (!regionName) return '';
  const key = getRegionTranslationKey(regionName);
  const translated = t(key);
  return translated !== key ? translated : regionName;
};
