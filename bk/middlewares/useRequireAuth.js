import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      router.push('/auth/signin');
    } else {
      router.push('/home');
    }
  }, []);
  return <strong>loading..</strong>;
};

export default useRequireAuth;
