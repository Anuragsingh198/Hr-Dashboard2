'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateDepartment, generatePerformanceRating } from '@/lib/utils';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        const enhancedUsers = data.users.map(user => ({
          ...user,
          department: generateDepartment(),
          performanceRating: generatePerformanceRating(),
          promoted: false
        }));

        setUsers(enhancedUsers);
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const promoteUser = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, promoted: true } : user
    ));
  };

  return (
    <UserContext.Provider value={{ users, loading, error, promoteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}
