import { ref } from 'vue';

export default function useLoading(initValue = false) {
  const loading = ref(initValue);

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  return {
    loading,
    setLoading,
  };
}
