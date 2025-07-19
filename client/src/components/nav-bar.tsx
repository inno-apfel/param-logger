import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"

import { Link } from "react-router-dom";

import { useUser } from '../hooks/useUser';

import { useNavigate } from 'react-router-dom';


function Navbar({ variant }: { variant: "landing" | "dashboard" | "tanks-list"}) {

    const { user, logout } = useUser();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }
    
    let scrollBorderLimit = 0;
    if (variant === 'dashboard'){
        scrollBorderLimit = 150
    }

    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const onScroll = () => {
        setScrolled(window.scrollY > scrollBorderLimit);
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const logo = {
        src: "https://www.svgrepo.com/show/216069/coral.svg",
        alt: "logo",
        title: "ParamLogger",
    }

    return (
        <section className={`py-4 fixed w-full z-50 
                            ${(scrolled || (variant !== 'dashboard') ) ? "bg-white text-black" : "bg-transparent text-white"}
                            ${(scrolled) ? "border-b border-gray-200" : ""}`}>
            <div className="px-6">

                {/* Desktop Menu */}
                <nav className="hidden justify-between sm:flex">

                    {/* Left Nav */}
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo.src} className={`max-h-10 filter ${scrolled || (variant !== 'dashboard') ? "" : "invert"}`} alt={logo.alt} />
                            <span className="text-2xl font-semibold tracking-tighter text-shadow-xl ">
                                {logo.title}
                            </span>
                        </Link>
                        {variant === 'dashboard' ? (
                            <div className="flex items-center">
                                    <NavigationMenu className="">
                                        <NavigationMenuList>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger className="text-xl">
                                                    <Button asChild variant="outline" size="sm" className="border-none bg-opacity-0 text-xl shadow-none">
                                                        <Link to="/my-tanks">
                                                            Tanks
                                                        </Link>
                                                    </Button>
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <NavigationMenuLink asChild>
                                                        <Link to="/dashboard/25302a04-139c-47ef-8ced-7754aac35c4a">Test Tank</Link>
                                                    </NavigationMenuLink>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </div>
                        ) : null}
                        
                    </div>

                    {/* Right Nav */}
                     {variant === 'landing' ? (
                        <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm" className="border-none bg-opacity-0 text-xl shadow-none">
                                <Link to="/login">
                                    Login
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="border-none bg-opacity-0 text-xl shadow-none">
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </Button>
                        </div>
                     ) : (
                        <div className="flex gap-2">
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src="" />
                                        <AvatarFallback className="text-black">CU</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button  onClick={handleLogout}>
                                            Logout
                                        </button >
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                     )}
                    

                </nav>

            </div>
        </section>
        
    )
}

export { Navbar }