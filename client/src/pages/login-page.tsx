import { useUser } from '../hooks/useUser';
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import { LoginForm } from "@/components/login-form"

const LoginPage = () => {

  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user !== null){
      console.log('nav')
      navigate('/my-tanks')
    }
  },[user])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;