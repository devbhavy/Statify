import { Progress } from "./ui/progress";

export function Genres({input} : {input : any}){
    function titleCase(s:string) {
        return s.toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
    }

    const temp : any[] = Object.values(input||{});
    let total=0;
    temp.map((data)=>{
        total+=data;
    })
    const items : any[] = Object.entries(input||{});


    return(
        <div className="flex flex-col">
            {
                items.map((data : any,index :number)=>{
                    return (
                        <div className="flex flex-col p-2" key={index} >
                            <div className="flex justify-between text-[14px] font-medium text-white pb-1">
                                <div>
                                {titleCase(data[0])}
                                </div>
                                <div className="text-neutral-500">
                                   {Math.floor((data[1]/total)*100)}%
                                </div>
                                
                            </div>
                            <div className="flex flex-col">
                                
                                <div>
                                    <Progress value={(data[1]/total)*100} ></Progress>
                                    
                                </div>
                                
                            </div>
                        </div>
                    );
                })
            }

        </div>
    )


}