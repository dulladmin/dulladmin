import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { create as authCreate, destroy as authDestroy } from '@/api/auth';
import { setToken, clearToken } from '@/utils/auth';
import type {
  CreateRequestForm as AuthCreateRequestForm,
  CreateRequest as AuthCreateRequest,
  CreateResponseUserInfo as UserInfo,
} from '@/api/auth';

const DEFAULT_USER_INFO = {
  name: 'unknown',
  role: 'unknown',
};

const useUserStore = defineStore('user', () => {
  const info = useStorage<UserInfo>(
    'user.info',
    DEFAULT_USER_INFO,
    localStorage,
    { mergeDefaults: true }
  );

  const login = async (formData: AuthCreateRequestForm) => {
    try {
      const res = await authCreate({ form: formData } as AuthCreateRequest);
      setToken(res.data.token);
      info.value = { ...DEFAULT_USER_INFO, ...res.data.info };
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
