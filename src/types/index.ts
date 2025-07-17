// Quote types
export type QuoteProps = {
  author: string;
  text: string;
  error?: string;
};

// Main page types
export type MainProps = {
  message: string;
  quote: QuoteProps;
};

export interface MainpageProps {
  pageProps: MainProps;
}

// Location types
export type Coords = {
  lat: number;
  lon: number;
};

export type LocationData = {
  city: string;
  stateProvince: string;
  country: string;
};

// Meta types
export type MetaProps = {
  title?: string;
  description?: string;
};

// Weather types
export interface WeatherDataStructure {
  temperature: string;
  unit: string;
}
