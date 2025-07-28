import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { LoginForm } from "@/components/login-form"
import { useUser } from '@/hooks/useUser';

const logo = {
    src: "https://www.svgrepo.com/show/216069/coral.svg",
    alt: "logo",
    title: "ParamLogger",
}

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
    <>
      {/* Logo */}
      <section className={`py-4 fixed w-full z-50`}>
        <div className="px-6">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <img src={logo.src} className={`max-h-10 filter `} alt={logo.alt} />
                <span className="text-2xl font-semibold tracking-tighter text-shadow-xl ">
                  {logo.title}
                </span>
              </Link>
            </div>
        </div>
      </section>
      
      <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </>
    
  );
};

export default LoginPage;