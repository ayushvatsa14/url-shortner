import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser=async () => {
      try {
        const res = await getCurrentUser();
        if (res?.user) {
          dispatch(login(res.user));
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
        }
      } catch (err) {
        setIsAuthed(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkUser();
  }, [dispatch]);

  if(!authChecked) return <div>Loading...</div>;

  return isAuthed ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;