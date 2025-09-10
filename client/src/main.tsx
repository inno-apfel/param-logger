import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from '@/context/user/provider';
import routes from "@/router/routes";
import '@/index.css';

const router = createHashRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>
)
