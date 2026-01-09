export function Card2({input} : {input :any}){
    return(
        <div className="flex flex-col p-2 w-[150px] items-center hover:bg-white/5 rounded-4xl">
            <div className="p-2">
                <img className="h-full w-full rounded-3xl" src={input.track.album.images[0].url} alt="some error occurred" />

            </div>

            <div className="font-medium text-[13px] p-2">
                {input.track.name}

            </div>

        </div>
    )
}