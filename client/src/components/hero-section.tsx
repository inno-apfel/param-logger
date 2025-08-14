import { Activity, List, Bot } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import ReactLogo from '../assets/react_logo.svg';
import ExampleOne from '../assets/landing_parameters_example.png';
import ExampleTwo from '../assets/landing_my_tanks_example.png';

function HeroSection(){
    return (
        <div className='h-screen bg-white'>
            <div className='h-16 bg-black'>
            </div>
            
            <div className="flex flex-col items-center">
                
                {/* Statement */}
                <div  className="flex flex-row items-center mt-25 mb-35">
                    <header className="space-y-2  max-w-lg">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-5xl/none">
                            The AI-powered tank assistant for you.
                        </h1>
                        <h2 className="max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                            Track your parameters. 
                            Share your tanks. 
                            Access AI-powered insights. 
                            Anytime. Anywhere. Across all your devices.
                        </h2>
                    </header>
                    {/* Statement Graphic */}
                    <div className="flex items-center gap-2 ">
                        {/* Droplet */}
                        <svg 
                            transform="scale(-1, 1)" xmlns="http://www.w3.org/2000/svg" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-droplets-icon lucide-droplets"
                        >
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" className="stroke-landing_svg_accent"/>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
                        </svg>
                        {/* Test Tube */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-droplets-icon lucide-droplets"
                        >
                            <path d="M12 16 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4 L4 16 H12 Z" className="fill-landing_svg_accent stroke-landing_svg_accent"/>
                            <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4 L17 3"/>
                            <path d="m16 2 6 6"/>
                        </svg>
                        {/* Book */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-droplets-icon lucide-droplets"
                        >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
                            <path d="m9 9.5 2 2 4-4" className="stroke-landing_svg_accent"/>
                        </svg>
                    </div>
                    <div>

                    </div>
                </div>
                
                <div className="w-6xl pb-10">
                    {/* Tech Stack */}
                    <div className="flex items-center h-5">
                        <p className="mr-10 text-sm text-neutral-500">
                            Powered by:
                        </p>
                        <img alt="" loading="eager" decoding="async" src={ReactLogo}
                            className="h-10 mr-10">
                        </img>
                        <img alt="" loading="eager" decoding="async" className="h-20 mr-10"
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg"
                        >
                        </img>
                        <img alt="" loading="eager" decoding="async" className="h-10 mr-10"
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain-wordmark.svg"
                        >
                        </img>
                    </div>

                    <div className="flex gap-5">

                        {/* Example: My Tanks List */}
                        <div className="p-8 rounded-xl bg-red-50 border-transparent border-2 hover:border-red-100   relative overflow-hidden  w-full h-115 mt-7">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                                <List className="w-3.5 h-3.5 stroke-red-500 text-bold"  strokeWidth={3} />
                                </div>
                                
                                <span className="text-sm font-medium text-gray-700">Multi-Tank Tracking</span>
                                <span className="text-xs bg-gray-50 text-gray-500 font-bold px-2 py-1 rounded-full">New</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                Keep track of all your tanks.
                            </h2>

                            <img alt="" loading="eager" decoding="async"
                                    src={ExampleTwo}
                                    className="absolute -bottom-49 -right-8 rounded-xl"
                                >
                            </img>
                            <div className="pointer-events-none absolute -bottom-70 left-0 right-0 h-100 bg-gradient-to-t from-white to-transparent rounded-b-md"></div>
                        </div>

                        {/* Example: Custom Parameters */}
                        <div className="p-8 rounded-xl bg-blue-50 border-transparent border-2 hover:border-blue-100 relative overflow-hidden w-full h-115 mt-7">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                                <Activity className="w-3.5 h-3.5 stroke-blue-500 text-bold"  strokeWidth={3} />
                                </div>
                                
                                <span className="text-sm font-medium text-gray-700">Custom Parameter Tracking</span>
                                <span className="text-xs bg-gray-50 text-gray-500 font-bold px-2 py-1 rounded-full">New</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                Track your tank’s health, your way.
                            </h2>

                            <img alt="" loading="eager" decoding="async"
                                src={ExampleOne}
                                className="absolute -bottom-10 -right-5 w-[120%]"
                            />
                            <div className="pointer-events-none absolute -bottom-70 left-0 right-0 h-100 bg-gradient-to-t from-white to-transparent rounded-b-md"></div>
                        </div>

                        
                    </div>
                    {/* Example: Custom Parameters */}
                        <div className="p-8 rounded-xl bg-orange-50 border-transparent border-2 hover:border-orange-100 relative overflow-hidden w-full h-115 mt-7">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                                <Bot className="w-3.5 h-3.5 stroke-orange-500 text-bold"  strokeWidth={3} />
                                </div>
                                
                                <span className="text-sm font-medium text-gray-700">AI-Powered Tank Assistant</span>
                                <span className="text-xs bg-gray-50 text-gray-500 font-bold px-2 py-1 rounded-full">New</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                Get personalized insights and advice.
                            </h2>

                            {/* <img alt="" loading="eager" decoding="async"
                                src={ExampleOne}
                                className="absolute -bottom-10 -right-5 w-[120%]"
                            /> */}
                            <div className="pointer-events-none absolute -bottom-70 left-0 right-0 h-100 bg-gradient-to-t from-white to-transparent rounded-b-md"></div>
                        </div>
                    


                        
                </div>
            </div>
            {/* footer */}
            <hr></hr>
            <SiteFooter />
            
    </div>
    )
}

export { HeroSection }