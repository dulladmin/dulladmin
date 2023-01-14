import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { create as authCreate, destroy as authDestroy } from '@/api/auth';
import { setToken, clearToken } from '@/utils/auth';
import type {
  CreateRequestForm as AuthCreateRequestForm,
  CreateRequest as AuthCreateRequest,
  CreateResponseUserInfo as UserInfo,
} from '@/api/auth';

const useUserStore = defineStore('user', () => {
  const info = useStorage<UserInfo>(
    'user.info',
    { name: 'unknown', role: 'unknown' },
    localStorage,
    { mergeDefaults: true }
  );

  const login = async (formData: AuthCreateRequestForm) => {
    try {
      const res = await authCreate({ form: formData } as AuthCreateRequest);
      setToken(res.data.token);
      info.value = res.data.info;
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
    info,

    login,
    logout,
  };
});

export default useUserStore;
