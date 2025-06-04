export interface JobFilters {
  search?: string;
  location?: string;
  type?: string;
  level?: string;
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
}

export interface SearchFilters extends JobFilters {
  sortBy?: 'newest' | 'salary' | 'relevance';
  page?: number;
  limit?: number;
}
