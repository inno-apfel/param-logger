import { useTank } from '@/hooks/useTank';

function TankHeader() {

    const { tank } = useTank();

    return (
        <>
            <div className={`bg-[url("https://t4.ftcdn.net/jpg/08/04/26/01/360_F_804260167_Mj5bjW7tj7tp9b2AJjs8sgmnQHT6mrTW.jpg")] h-75`}>
                <div className="h-75 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_90%)]">
                    <div className="h-75 bg-[linear-gradient(0deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_90%)]">
                        <div className="fixed w-full">
                        </div>
                    </div>
                </div>
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