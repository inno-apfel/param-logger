import { useTank } from '@/hooks/useTank';
import FishBG from '@/assets/fish-bg.png'

function TankHeader() {

    const { tank } = useTank();

    return (
        <>
            <div 
                className="w-full h-75 bg-repeat-x bg-top bg-[length:auto_18.75rem]"
                style={{ backgroundImage: `url(${FishBG})` }}
            >
                {/* <div className="h-75 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_90%)]">
                    <div className="h-75 bg-[linear-gradient(0deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_90%)]">
                        <div className="fixed w-full">
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="bg-white h-14">
            </div>

            <div className="flex justify-center">
                <div className="flex w-7xl relative">
                    <p className="absolute bottom-20 left-5">
                        <span className="text-extrabold text-3xl text-white">{tank?.name}</span>
                        <br></br>
                        <span className="text-white">Default signature given to everyone~</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export { TankHeader }