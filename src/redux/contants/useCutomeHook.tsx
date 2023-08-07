import { useEffect, useState } from 'react';
import { UserId } from '../../types/user.type';

function useCutomeHook() {
  const user = localStorage.getItem('userLogin');
  const [userLogin, setUserLogin] = useState<UserId>();

  useEffect(() => {
    if (user) {
      setUserLogin(JSON.parse(user).user);
    }
  }, [user]);

  return {
    userLogin,
  };
}

export default useCutomeHook;
