import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { getCurrentUser } from '../api/user.api';

export const useAuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res?.user) {
          dispatch(login(res.user));
        }
      } catch (err) {
        // No user or token expired — no need to dispatch logout unless you want
      }
    };

    syncUser();
  }, [dispatch]);
};