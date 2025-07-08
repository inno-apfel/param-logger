import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"

import { Link } from "react-router-dom";

function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    const logo = {
    url: "https://www.google.com",
    src: "https://www.svgrepo.com/show/216069/coral.svg",
    alt: "logo",
    title: "ParamLogger",
  }

    return (
        <section className={`py-4 fixed w-full z-50 ${scrolled ? "bg-white text-black" : "bg-transparent text-white"}`}>
            <div className="px-6">
                {/* Desktop Menu */}
                <nav className="hidden justify-between sm:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <img src={logo.src} className={`max-h-10 filter ${scrolled ? "" : "invert"}`} alt={logo.alt} />
                            <span className="text-2xl font-semibold tracking-tighter text-shadow-xl ">
                                {logo.title}
                            </span>
                        </a>
                        {/* Left Nav */}
                        <div className="flex items-center">
                            <NavigationMenu className="">
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="text-xl">Tanks</NavigationMenuTrigger>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                        {/* Right Nav */}
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
                    </nav>
            </div>
        </section>
    )
}

export { Navbar }