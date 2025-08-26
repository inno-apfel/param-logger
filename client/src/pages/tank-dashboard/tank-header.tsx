import { useTank } from '@/hooks/useTank';
import FishBG from '@/assets/reef-bg.jpeg'


function TankHeader() {

    const { tank } = useTank();

    return (
        <>
            <div 
                className="w-full h-75 bg-repeat-x bg-top bg-white bg-[length:auto_18.75rem] relative"
                style={{ backgroundImage: `url(${FishBG})` }}
            >
                <div className="h-75 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,rgba(0,0,0,0.5)_90%)]">
                    <div className="h-75 bg-[linear-gradient(0deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.15)_90%)]">
                        <div className="fixed w-full">
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white h-14">
            </div>

            <div className="flex justify-center">
                <div className="flex w-7xl relative">
                    <p className="absolute bottom-20 left-2">
                        <span className="font-semibold text-3xl text-white text-shadow-md">{tank?.name}</span>
                        <br></br>
                        <span className="text-white text-shadow-md">Default signature given to everyone~</span>
                        <div className="h-6" />
                    </p>
                </div>
            </div>
        </>
    )
}

export { TankHeader }