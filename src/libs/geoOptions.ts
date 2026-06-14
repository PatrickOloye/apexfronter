import type { SelectOption } from '@/components/ui/SearchableSelect';

type RestCountry = {
  cca2?: string;
  name?: {
    common?: string;
  };
  flags?: {
    svg?: string;
    png?: string;
  };
  idd?: {
    root?: string;
    suffixes?: string[];
  };
};

// Use our own Next.js API proxy to avoid CORS errors when fetching from the client.
// The proxy fetches restcountries.com server-side and caches the result for 24 hours.
const REST_COUNTRIES_URL = '/api/geo/countries';

const FALLBACK_COUNTRIES: SelectOption[] = [
  { id: 'US', value: 'US', label: 'United States' },
  { id: 'NG', value: 'NG', label: 'Nigeria' },
  { id: 'GB', value: 'GB', label: 'United Kingdom' },
  { id: 'CA', value: 'CA', label: 'Canada' },
  { id: 'GH', value: 'GH', label: 'Ghana' },
  { id: 'KE', value: 'KE', label: 'Kenya' },
  { id: 'ZA', value: 'ZA', label: 'South Africa' },
  { id: 'FR', value: 'FR', label: 'France' },
  { id: 'DE', value: 'DE', label: 'Germany' },
  { id: 'AE', value: 'AE', label: 'United Arab Emirates' },
  { id: 'IN', value: 'IN', label: 'India' },
  { id: 'CN', value: 'CN', label: 'China' },
];

const FALLBACK_PHONE_CODES: SelectOption[] = [
  { id: 'US', value: '+1', label: '+1 United States', shortLabel: '+1', searchText: '+1 United States' },
  { id: 'NG', value: '+234', label: '+234 Nigeria', shortLabel: '+234', searchText: '+234 Nigeria' },
  { id: 'GB', value: '+44', label: '+44 United Kingdom', shortLabel: '+44', searchText: '+44 United Kingdom' },
  { id: 'CA', value: '+1', label: '+1 Canada', shortLabel: '+1', searchText: '+1 Canada' },
  { id: 'GH', value: '+233', label: '+233 Ghana', shortLabel: '+233', searchText: '+233 Ghana' },
  { id: 'KE', value: '+254', label: '+254 Kenya', shortLabel: '+254', searchText: '+254 Kenya' },
  { id: 'ZA', value: '+27', label: '+27 South Africa', shortLabel: '+27', searchText: '+27 South Africa' },
  { id: 'FR', value: '+33', label: '+33 France', shortLabel: '+33', searchText: '+33 France' },
  { id: 'DE', value: '+49', label: '+49 Germany', shortLabel: '+49', searchText: '+49 Germany' },
  { id: 'AE', value: '+971', label: '+971 United Arab Emirates', shortLabel: '+971', searchText: '+971 United Arab Emirates' },
  { id: 'IN', value: '+91', label: '+91 India', shortLabel: '+91', searchText: '+91 India' },
  { id: 'CN', value: '+86', label: '+86 China', shortLabel: '+86', searchText: '+86 China' },
];

let countriesPromise: Promise<RestCountry[]> | null = null;

async function fetchCountries(): Promise<RestCountry[]> {
  if (!countriesPromise) {
    countriesPromise = fetchJson<RestCountry[]>(REST_COUNTRIES_URL).catch((error) => {
      countriesPromise = null;
      throw error;
    });
  }

  return countriesPromise;
}

async function fetchJson<T>(url: string, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      // Use same-origin for our own proxy; omit credentials for external URLs
      credentials: url.startsWith('/') ? 'same-origin' : 'omit',
      // Rely on HTTP Cache-Control headers from the proxy (24h cache)
      cache: 'default',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Country service returned ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

function toCountryOption(country: RestCountry): SelectOption | null {
  const value = country.cca2;
  const label = country.name?.common;

  if (!value || !label) return null;

  return {
    id: value,
    value,
    label,
    image: country.flags?.svg || country.flags?.png,
    searchText: `${label} ${value}`,
  };
}

function toPhoneCodeOption(country: RestCountry): SelectOption | null {
  const id = country.cca2;
  const name = country.name?.common;
  const root = country.idd?.root;

  if (!id || !name || !root) return null;

  const suffixes = country.idd?.suffixes || [];
  const suffix = suffixes.length === 1 ? suffixes[0] : '';
  const code = `${root}${suffix}`;

  if (!/^\+\d+$/.test(code)) return null;

  return {
    id,
    value: code,
    label: `${code} ${name}`,
    shortLabel: code,
    searchText: `${code} ${name} ${id}`,
  };
}

function sortByLabel(left: SelectOption, right: SelectOption) {
  return left.label.localeCompare(right.label);
}

export async function getCountryOptions(): Promise<SelectOption[]> {
  try {
    const countries = await fetchCountries();
    const options = countries
      .map(toCountryOption)
      .filter((option): option is SelectOption => Boolean(option))
      .sort(sortByLabel);

    return options.length ? options : FALLBACK_COUNTRIES;
  } catch {
    return FALLBACK_COUNTRIES;
  }
}

export async function getPhoneCodeOptions(): Promise<SelectOption[]> {
  try {
    const countries = await fetchCountries();
    const options = countries
      .map(toPhoneCodeOption)
      .filter((option): option is SelectOption => Boolean(option))
      .sort((left, right) => {
        const codeSort = left.shortLabel!.localeCompare(right.shortLabel!, undefined, {
          numeric: true,
        });
        return codeSort || left.label.localeCompare(right.label);
      });

    return options.length ? options : FALLBACK_PHONE_CODES;
  } catch {
    return FALLBACK_PHONE_CODES;
  }
}
