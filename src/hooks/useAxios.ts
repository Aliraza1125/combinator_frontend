// src/hooks/useAxios.js
import { useState, useCallback } from 'react';
import axiosInstance from '../lib/axios';

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (config) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance(config);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return {
    isLoading,
    error,
    data,
    execute,
    clearError,
    clearData
  };
};

export default useAxios;