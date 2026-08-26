import companiesJson from "@/data/companies.json";

export interface Address {
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
}

export interface Company {
  id: string;
  name: string;
  owner: string;
  address: Address;
  mailingAddress: Address;
  phone: string | null;
  branches: number | null;
  membership: string | null;
  sizeRange: string | null;
  priority: string | null;
  productTypes: string[];
  notes: string | null;
  lat: number;
  lng: number;
}

export const companies: Company[] = companiesJson as Company[];

export function getCompany(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function formatAddress(a: Address): string {
  return [a.street, `${a.city ?? ""}, ${a.state ?? ""} ${a.zip ?? ""}`.trim()]
    .filter(Boolean)
    .join(", ");
}
