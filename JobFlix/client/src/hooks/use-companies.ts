import { useQuery } from "@tanstack/react-query";
import type { Company } from "@shared/schema";

export function useCompanies() {
  return useQuery<Company[]>({
    queryKey: ['/api/companies'],
  });
}

export function useCompany(id: string | number) {
  return useQuery<Company>({
    queryKey: [`/api/companies/${id}`],
    enabled: !!id,
  });
}

export function useFeaturedCompanies() {
  return useQuery<Company[]>({
    queryKey: ['/api/companies/featured'],
  });
}
