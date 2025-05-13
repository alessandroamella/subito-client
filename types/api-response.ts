export interface SubitoApiResponse {
  count_all: number;
  lines: number;
  start: number;
  filters?: Filters;
  checknew?: string;
  ads: Ad[];
}

export interface Filters {
  lim: string;
  q: string;
  qso: string;
  shp: string;
  sort: string;
  start: string;
  t: string;
  urg: string;
}

export interface Ad {
  urn: string;
  type: Type;
  category: Category;
  subject: string;
  body: string;
  dates: Dates;
  images: Image[];
  images_360: unknown[];
  features: Feature[];
  advertiser: Advertiser;
  geo: Geo;
  urls: Urls;
  visibility_options?: VisibilityOptions;
}

export interface Type {
  key: string;
  value: string;
  weight: number;
}

export interface Category {
  key: string;
  value: string;
  friendly_name: string;
  macrocategory_id: string;
  weight: number;
}

export interface Dates {
  display: string;
  expiration: string;
  display_iso8601: string;
  expiration_iso8601: string;
}

export interface Image {
  uri: string;
  base_url: string;
  cdn_base_url: string;
  scale: Scale[];
}

export interface Scale {
  uri: string;
  secureuri: string;
  size: string;
}

export interface Feature {
  type: string;
  uri: string;
  label: string;
  values: Value[];
}

export interface Value {
  key: string;
  value: string;
  weight?: number;
  description?: string;
}

export interface Advertiser {
  user_id: string;
  name: string;
  phone?: string;
  company: boolean;
  type: number;
}

export interface Geo {
  region: Region;
  city: City;
  town: Town;
  uri: string;
  label: string;
  type: string;
}

export interface Region {
  key: string;
  uri: string;
  value: string;
  friendly_name: string;
  label: string;
  level: number;
  neighbors: string;
}

export interface City {
  key: string;
  uri: string;
  value: string;
  label: string;
  friendly_name: string;
  short_name: string;
  level: number;
  istat: string;
  region_id: string;
}

export interface Town {
  key: string;
  uri: string;
  value: string;
  label: string;
  level: number;
  istat: string;
  region_id: string;
  city_id: string;
  has_zone: boolean;
  friendly_name: string;
}

export interface Urls {
  default: string;
  mobile: string;
}

export interface VisibilityOptions {
  gallery: boolean;
  urgent: boolean;
}
