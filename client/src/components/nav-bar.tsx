import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { UserDropdown } from '@/components/user-dropdown'

const logo = {
    src: "https://www.svgrepo.com/show/216069/coral.svg",
    alt: "logo",
    title: "ParamLogger",
}

function Navbar({ variant }: { variant: "landing" | "dashboard" | "tanks-list"}) {

    const [scrolled, setScrolled] = useState(false);

    let scrollBorderLimit = 0;
    if (variant === 'dashboard'){
        scrollBorderLimit = 150
    }

    useEffect(() => {
        const onScroll = () => {
        setScrolled(window.scrollY > scrollBorderLimit);
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navBarStyle = {
        bgColor: (scrolled || (variant !== 'dashboard') ) ? "bg-white text-black" : "bg-transparent text-white",
        textColor: scrolled || (variant !== 'dashboard') ? "" : "invert",
        bottomBorder: (scrolled) ? "border-b border-gray-200" : ""
    }
    
    return (
        <section className={`py-4 fixed w-full z-50 ${navBarStyle.bgColor} ${navBarStyle.bottomBorder}`}>
            <div className="px-6">

                {/* Desktop Menu */}
                <nav className="hidden justify-between sm:flex">

                    {/* Left Nav */}
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo.src} className={`max-h-10 filter ${navBarStyle.textColor}`} alt={logo.alt} />
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
                        <UserDropdown />
                     )}
                    

                </nav>

            </div>
        </section>
        
    )
}

export { Navbar }