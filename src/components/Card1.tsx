export function Card1({ input, index }: { input: any; index: number }) {
    
    return (
      <div className="flex items-center w-full gap-x-4 px-3 py-2 rounded-xl hover:bg-white/5">
        <div className={index==0?"text-sm text-green-400":"text-sm text-neutral-400"}>
            {index+1}
        </div>
        <div className="flex items-center gap-x-4">
            <div>
                <img className="rounded-2xl h-[50px] w-[50px]" src={input.image.url} alt="unable to load image" />
            </div>
            <div className={index==0?"font-medium whitespace-nowrap overflow-hidden text-ellipsis text-green-400":"font-medium whitespace-nowrap overflow-hidden text-ellipsis"}>
                {input.name}
            </div>
            
        </div>
      
        
      </div>
    );
}
  