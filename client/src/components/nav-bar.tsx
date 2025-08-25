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
    content?: {
        label: string,
        to_url: string,
    }[]
}

type Props = {
    authenticatedPage: boolean,
    noLoginSignup?: boolean,
    fontColor: string,
    bgAlwaysSolid: boolean,
    bgAlwaysWhite?: boolean,
    scrollTransitionThreshold?: number,
    navItems?: navItem[],
}

function Navbar({ authenticatedPage, noLoginSignup, fontColor, bgAlwaysSolid, bgAlwaysWhite, scrollTransitionThreshold=0, navItems=[] }: Props) {

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
        textColor: (scrolled || bgAlwaysSolid) ? 'text-black' : `${fontColor}`,
        logoColor: (scrolled || bgAlwaysSolid || (fontColor === 'text-black')) ? '': 'invert',
        bottomBorder: (scrolled || scrollTransitionThreshold < 0) ? "border-b border-gray-200" : "",
        textShadow: (scrolled || bgAlwaysSolid || bgAlwaysWhite) ? `text-shadow-none`: `text-shadow-md`,
        logoShadow: (scrolled || bgAlwaysSolid || bgAlwaysWhite) ? `drop-shadow-none`: `drop-shadow-[1px_1px_0_black] drop-shadow-[1px_1px_0_rgba(0,0,0,0.2)]`,
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
                            <img src={logo.src} className={`max-h-6 filter ${navBarStyle.logoShadow} ${navBarStyle.logoColor}`} alt={logo.alt} />
                            <span className={`text-lg font-semibold tracking-tighter leading-none ${navBarStyle.textShadow}`}>
                                {logo.title}
                            </span>
                        </Link>
                        <div className="flex items-center">
                            <NavigationMenu className="">
                                <NavigationMenuList>
                                    {navItems.map(({ label, to_url, content }) => {
                                        return (
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger 
                                                    underline_color={navBarStyle.bgColor === 'bg-white' ? 'primary' : 'secondary'} 
                                                    className={`text-md ${navBarStyle.textShadow} leading-none`}
                                                    variant="with_underline"
                                                >
                                                    <Link to={to_url}>
                                                        {label}
                                                    </Link>
                                                </NavigationMenuTrigger>
                                                {content && 
                                                <NavigationMenuContent>
                                                    <div className="w-[250px]">
                                                        {content.map(({ label, to_url }) => {
                                                            return (
                                                                <NavigationMenuLink asChild>
                                                                    <Link to={to_url}>
                                                                        {label}
                                                                        <div className="text-muted-foreground">
                                                                            Last Updated: MM/DD/YYYY
                                                                        </div>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            )
                                                        })}
                                                    </div>
                                                </NavigationMenuContent>}
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
                                <div className="flex"> 
                                    <NavigationMenu className="">
                                        <NavigationMenuList>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger
                                                    className="text-md leading-none"
                                                >
                                                    
                                                        <Button variant="secondary" size="sm">
                                                            <Link to="/login">
                                                                Log in
                                                            </Link>
                                                        </Button>
                                                    
                                                </NavigationMenuTrigger>
                                            </NavigationMenuItem>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger 
                                                    className="text-xl leading-none"
                                                >
                                                    
                                                <Button>
                                                    <Link to="/signup">
                                                    Get ParamLogger Free
                                                    </Link>
                                                </Button>
                                                
                                                </NavigationMenuTrigger>
                                            </NavigationMenuItem>
                                        </NavigationMenuList>
                                    </NavigationMenu>
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