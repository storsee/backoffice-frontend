export interface CountryCodeOption {
  iso: string;
  dial: string;
  name: string;
  flag: string;
}

export const DEFAULT_COUNTRY_DIAL = '91';

function isoToFlag(iso: string): string {
  const code = String(iso || '').toUpperCase();
  if (code.length !== 2) return '';
  return [...code].map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('');
}

const RAW_COUNTRIES: Omit<CountryCodeOption, 'flag'>[] = [
  { iso: 'IN', dial: '91', name: 'India' },
  { iso: 'US', dial: '1', name: 'United States' },
  { iso: 'GB', dial: '44', name: 'United Kingdom' },
  { iso: 'AE', dial: '971', name: 'United Arab Emirates' },
  { iso: 'AU', dial: '61', name: 'Australia' },
  { iso: 'BD', dial: '880', name: 'Bangladesh' },
  { iso: 'BH', dial: '973', name: 'Bahrain' },
  { iso: 'CA', dial: '1', name: 'Canada' },
  { iso: 'CN', dial: '86', name: 'China' },
  { iso: 'DE', dial: '49', name: 'Germany' },
  { iso: 'FR', dial: '33', name: 'France' },
  { iso: 'HK', dial: '852', name: 'Hong Kong' },
  { iso: 'ID', dial: '62', name: 'Indonesia' },
  { iso: 'IT', dial: '39', name: 'Italy' },
  { iso: 'JP', dial: '81', name: 'Japan' },
  { iso: 'KW', dial: '965', name: 'Kuwait' },
  { iso: 'LK', dial: '94', name: 'Sri Lanka' },
  { iso: 'MY', dial: '60', name: 'Malaysia' },
  { iso: 'NP', dial: '977', name: 'Nepal' },
  { iso: 'NL', dial: '31', name: 'Netherlands' },
  { iso: 'NZ', dial: '64', name: 'New Zealand' },
  { iso: 'OM', dial: '968', name: 'Oman' },
  { iso: 'PK', dial: '92', name: 'Pakistan' },
  { iso: 'PH', dial: '63', name: 'Philippines' },
  { iso: 'QA', dial: '974', name: 'Qatar' },
  { iso: 'SA', dial: '966', name: 'Saudi Arabia' },
  { iso: 'SG', dial: '65', name: 'Singapore' },
  { iso: 'ZA', dial: '27', name: 'South Africa' },
  { iso: 'KR', dial: '82', name: 'South Korea' },
  { iso: 'ES', dial: '34', name: 'Spain' },
  { iso: 'CH', dial: '41', name: 'Switzerland' },
  { iso: 'TH', dial: '66', name: 'Thailand' },
  { iso: 'TR', dial: '90', name: 'Turkey' },
  { iso: 'VN', dial: '84', name: 'Vietnam' },
];

export const COUNTRY_CODES: CountryCodeOption[] = RAW_COUNTRIES.map((c) => ({
  ...c,
  flag: isoToFlag(c.iso),
}));

export function getCountryByDial(dial?: string | null): CountryCodeOption | undefined {
  const normalized = String(dial || DEFAULT_COUNTRY_DIAL).replace(/\D/g, '') || DEFAULT_COUNTRY_DIAL;
  return COUNTRY_CODES.find((c) => c.dial === normalized);
}

export function formatPhoneDisplay(countryCode?: string | null, phone?: string | null): string {
  const cc = String(countryCode || DEFAULT_COUNTRY_DIAL).replace(/\D/g, '') || DEFAULT_COUNTRY_DIAL;
  const num = String(phone || '').trim();
  return num ? `+${cc} ${num}` : '-';
}

export function phoneMaxLength(countryCode?: string | null): number {
  const cc = String(countryCode || DEFAULT_COUNTRY_DIAL).replace(/\D/g, '') || DEFAULT_COUNTRY_DIAL;
  return cc === '91' ? 10 : 15;
}

export function normalizeLocalPhone(phone?: string | null, countryCode?: string | null): string {
  const cc = String(countryCode || DEFAULT_COUNTRY_DIAL).replace(/\D/g, '') || DEFAULT_COUNTRY_DIAL;
  const digits = String(phone || '').replace(/\D/g, '');
  return cc === '91' ? digits.slice(-10) : digits.slice(0, 15);
}

export function isValidLocalPhone(phone?: string | null, countryCode?: string | null): boolean {
  const normalized = normalizeLocalPhone(phone, countryCode);
  const cc = String(countryCode || DEFAULT_COUNTRY_DIAL).replace(/\D/g, '') || DEFAULT_COUNTRY_DIAL;
  if (cc === '91') return normalized.length === 10;
  return normalized.length >= 4 && normalized.length <= 15;
}
