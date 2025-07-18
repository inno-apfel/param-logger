function HeroSection(){
    return (
        <div className='h-screen bg-white'>
            <div className='h-18 bg-black'>
            </div>
            <div className="flex flex-col items-center">
                <div  className="flex flex-row items-center py-37">
                <header className="space-y-2  max-w-lg">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        The AI workspace that works for you.
                        </h1>
                        <h2 className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                        One place where teams find every answer, automate the busywork, and get projects done.
                        </h2>
                    </header>
                    <video width="600">
                        <source src="https://www.notion.com/front-static/nosey/hero/noseyHeroV2.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className="bg-neutral-500 w-6xl h-120 rounded-xl">
                    {/* features examples */}
                </div>
            </div>
    </div>
    )
}

export { HeroSection }