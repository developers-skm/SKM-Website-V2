export const emptyFilters = { query: '', department: '', location: '', experience: '', employmentType: '' };

export const hasActiveFilters = (filters) => Object.values(filters).some(Boolean);
