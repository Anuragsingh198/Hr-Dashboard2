"use client";

import { useState, useMemo } from "react";

export default function useSearch(users) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    departments: [],
  });

  const filteredUsers = useMemo(() => {
  return users.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();

    const firstName = user.firstName?.toLowerCase() ?? "";
    const lastName = user.lastName?.toLowerCase() ?? "";
    const email = user.email?.toLowerCase() ?? "";

    const department = (user.department?? "").toLowerCase();
  
    const searchMatch =
      searchTerm === "" ||
      firstName.includes(searchTermLower) ||
      lastName.includes(searchTermLower) ||
      email.includes(searchTermLower) ||
      department.includes(searchTermLower);

    const departmentMatch =
      filters.departments.length === 0 ||
      filters.departments.some(
        (dept) => dept.toLowerCase() === department
      );

    return searchMatch && departmentMatch;
  });
}, [users, searchTerm, filters]);


  const updateSearchTerm = (term) => setSearchTerm(term);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      departments: Array.isArray(newFilters.departments)
        ? newFilters.departments
        : prev.departments,
    }));
  };

  const clearFilters = () => {
    setFilters({ departments: [] });
    setSearchTerm("");
  };

  return {
    searchTerm,
    filters,
    filteredUsers,
    updateSearchTerm,
    updateFilters,
    clearFilters,
  };
}
