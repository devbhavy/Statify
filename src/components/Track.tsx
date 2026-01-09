export function Track({ input, index }: { input: any; index: number }) {
    function convertMs(input: number) : string{
        const totalSeconds = Math.floor(input / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;

    }

    return (
      <div className="flex items-center w-full gap-x-4 px-3 py-2 rounded-xl hover:bg-white/5">
  
      
        <div className="flex items-center gap-x-3 flex-1 min-w-0">
  
       
          <div className="text-sm text-neutral-400">
            {index}
          </div>
  
        
          <img
            src={input.album.images[0].url}
            className="h-[50px] w-[50px] shrink-0 rounded object-cover"
          />
  
          
          <div className="flex flex-col min-w-0">
            <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              {input.name}
            </div>
  
            <div className="text-[10px] text-neutral-500 whitespace-nowrap overflow-hidden text-ellipsis">
              {input.artists.map((a: any) => a.name).join(", ")}
            </div>
          </div>
        </div>
  
        
        <div className="min-w-0 text-[11px] text-neutral-400 whitespace-nowrap overflow-hidden text-ellipsis">
            {convertMs(input.duration)}
            
        </div>
      </div>
    );
}
  