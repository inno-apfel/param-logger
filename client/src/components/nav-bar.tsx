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

type navItem = {
    label: string,
    to_url: string,
    content: {
        label: string,
        to_url: string,
    }[]
}

type Props = {
    authenticatedPage: boolean,
    noLoginSignup?: boolean,
    fontColor: string,
    bgAlwaysSolid: boolean,
    scrollTransitionThreshold?: number,
    navItems?: navItem[],
}

function Navbar({ authenticatedPage, noLoginSignup, fontColor, bgAlwaysSolid, scrollTransitionThreshold=0, navItems=[] }: Props) {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > scrollTransitionThreshold);
            };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navBarStyle = {
        bgColor: (scrolled || bgAlwaysSolid) ? `bg-white` : `bg-transparent`,
        textColor: (scrolled || bgAlwaysSolid) ? 'text-black' : `text-${fontColor}`,
        logoColor: (scrolled || bgAlwaysSolid || (fontColor === 'black')) ? '': 'invert',
        bottomBorder: (scrolled) ? "border-b border-gray-200" : ""
    }
    
    return (
        <section className={`py-4 fixed w-full z-50 ${navBarStyle.bgColor} ${navBarStyle.bottomBorder}`}>
            <div className="px-6">

                {/* Desktop Menu */}
                <nav className={`hidden justify-between sm:flex ${navBarStyle.textColor}`}>

                    {/* Left Nav */}
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo.src} className={`max-h-10 filter ${navBarStyle.logoColor}`} alt={logo.alt} />
                            <span className="text-2xl font-semibold tracking-tighter text-shadow-xl">
                                {logo.title}
                            </span>
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu className="">
                                <NavigationMenuList>
                                    {navItems.map(({ label, to_url, content }) => {
                                        return (
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger className="text-xl">
                                                    <Button asChild variant="outline" size="sm" className="border-none bg-opacity-0 text-xl shadow-none">
                                                        <Link to={to_url}>
                                                            {label}
                                                        </Link>
                                                    </Button>
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    {content.map(({ label, to_url }) => {
                                                        return (
                                                            <NavigationMenuLink asChild>
                                                                <Link to={to_url}>{label}</Link>
                                                            </NavigationMenuLink>
                                                        )
                                                    })}
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    {/* Right Nav */}
                    {noLoginSignup ? null : (
                        <>
                            {authenticatedPage ? (
                                <UserDropdown />
                            ) : (
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
                            )}
                        </>
                    )}
                     
                </nav>
            </div>
        </section>
        
    )
}

export { Navbar }