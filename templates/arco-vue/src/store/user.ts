import { defineStore } from 'pinia';
import { create as authCreate, destroy as authDestroy } from '@/api/auth';
import { setToken, clearToken } from '@/utils/auth';
import type {
  CreateRequestForm as AuthCreateRequestForm,
  CreateRequest as AuthCreateRequest,
} from '@/api/auth';

const useUserStore = defineStore('user', () => {
  const login = async (formData: AuthCreateRequestForm) => {
    try {
      const res = await authCreate({ form: formData } as AuthCreateRequest);
      setToken(res.data.token);
    } catch (err) {
      clearToken();
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authDestroy();
    } finally {
      clearToken();
    }
  };

  return {
    login,
    logout,
  };
});

export default useUserStore;
