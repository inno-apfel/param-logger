import { useTank } from '@/hooks/useTank';
import FishBG from '@/assets/reef-bg.jpeg'
import { daysSince } from '@/utils/date'

function TankHeader() {

    const { tank } = useTank();
    if (!tank){
        return null
    }
    const bannerUrl = tank?.banner || FishBG;

    return (
        <>
            <div 
                className="w-full h-75 bg-repeat-x bg-top bg-white bg-[length:auto_18.75rem] relative"
                style={{ backgroundImage: `url("${bannerUrl}")` }}
            >
                <div className="h-75 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,rgba(0,0,0,0.5)_90%)]">
                    <div className="h-75 bg-[linear-gradient(0deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.15)_90%)]">
                        <div className="fixed w-full">
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="flex w-7xl relative">
                    <p className="absolute bottom-6 left-2">
                        <span className="font-semibold text-3xl text-white text-shadow-md">{tank?.name}</span>
                        <br></br>
                        <span className="text-white text-shadow-md">Default signature given to everyone~</span>
                        <div className="h-6" />
                    </p>
                </div>
            </div>

            <div className="flex justify-center bg-white h-14 ">
                <div className="flex justify-center">
                    <div className="flex items-center gap-2 px-2 w-7xl relative">
                        <div className="flex items-center gap-2 px-2 w-full">
                            <Stat label="Gallons" value={tank?.gallons} />
                            <span className="text-sm text-muted-foreground">/</span>
                            <Stat label="Days Old" value={Math.floor(daysSince(tank?.setup_date))} />
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}

function Stat({ label, value }: { label: string; value: number | string | undefined }) {
  return (
    <div className="flex items-center space-x-1">
      <span className="font-semibold text-lg">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export { TankHeader }