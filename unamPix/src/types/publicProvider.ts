import type { Publics } from "./public";
export interface PublicProviderProps {
  children: React.ReactNode;
}

export interface PublicContextType {
  loading: boolean;
  loadingUserPublications: boolean;
  loadingPublic: boolean
  createdPublication: boolean;
  errors: string[];
  clearErrors: () => void;
  filterPublications: Publics[];
  createPublic: (data: FormData) => Promise<void>;
  publicationUser: Publics[];
  publicationOne: Publics | null
  fetchPublicOne: (idPublicacion: string) => Promise<void>
}
