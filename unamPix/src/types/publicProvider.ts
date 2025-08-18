import type { Publics } from "./public";
export interface PublicProviderProps {
  children: React.ReactNode;
}

export interface PublicContextType {
  loading: boolean;
  errors: string[];
  clearErrors: () => void;
  filterPublications: Publics[];
  createPublic: (data: FormData) => Promise<void>;
}
