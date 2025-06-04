import { useQuery } from "@tanstack/react-query";
import type { Job } from "@shared/schema";
import type { JobFilters } from "@/lib/types";

export function useJobs(filters: JobFilters = {}) {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  const queryString = queryParams.toString();
  const url = `/api/jobs${queryString ? `?${queryString}` : ''}`;

  return useQuery<Job[]>({
    queryKey: ['/api/jobs', filters],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    },
  });
}

export function useJob(id: string | number) {
  return useQuery<Job>({
    queryKey: [`/api/jobs/${id}`],
    enabled: !!id,
  });
}
