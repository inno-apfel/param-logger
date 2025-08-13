import ReactLogo from '../assets/react_logo.svg'
import ExampleOne from '../assets/landing_parameters_example.png'
import ExampleTwo from '../assets/landing_my_tanks_example.png'
import { Activity } from "lucide-react";


function HeroSection(){
    const accent_color = 'blue-300'
    const sub_color = 'black'
    return (
        <div className='h-screen bg-white'>
            <div className='h-16 bg-black'>
            </div>
            
            <div className="flex flex-col items-center">
                
                {/* Statement */}
                <div  className="flex flex-row items-center mt-30 mb-38">
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
                            transform="scale(-1, 1)" xmlns="http://www.w3.org/2000/svg" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className={`lucide lucide-droplets-icon lucide-droplets stroke-${sub_color}`}
                        >
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" className={`stroke-${accent_color}`}/>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" className={sub_color}/>
                        </svg>
                        {/* Test Tube */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className={`lucide lucide-droplets-icon lucide-droplets stroke-${sub_color}`}
                        >
                            <path d="M12 16 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4 L4 16 H12 Z" className={`fill-blue-300 stroke-${accent_color}`}/>
                            <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4 L17 3"/>
                            <path d="m16 2 6 6"/>
                        </svg>
                        {/* Book */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className={`lucide lucide-droplets-icon lucide-droplets stroke-${sub_color}`}
                        >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
                            <path d="m9 9.5 2 2 4-4" className={`stroke-${accent_color}`}/>
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
                                <Activity className="w-3.5 h-3.5 stroke-red-500 text-bold rounded-full"  strokeWidth={3} />
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
                                <Activity className="w-3.5 h-3.5 stroke-blue-500 text-bold rounded-full"  strokeWidth={3} />
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
                    


                        
                </div>
            </div>
            {/* footer */}
            <hr></hr>
            <div className="flex justify-center py-5">
                <div className="w-6xl">
                    <a href="https://github.com/inno-apfel/param-logger" target="_blank" rel="noopener noreferrer" className="flex">
                        <svg viewBox="0 0 128 128" height="20" className="stroke-neutral-500 fill-neutral-500">
                            <g fill="oklch(55.6% 0 0)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path>
                                <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                            </g> 
                        </svg>
                        <p className="text-sm font-bold text-neutral-500 ml-1">
                            Github
                        </p>
                    </a>
                    <p className="text-sm text-neutral-500 mt-2">
                        © 2025 ParamLogger, Inc.
                    </p>
                </div>
            </div>
            
    </div>
    )
}

export { HeroSection }