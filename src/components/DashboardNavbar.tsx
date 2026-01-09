import { authClient } from "@/lib/auth-client"
import Logo from "../assets/Logo.png"
import { RainbowButton } from "./ui/rainbow-button"
import TiltedCard from "./ui/TiltedCard"
import { useNavigate } from "react-router"




export function DashboardNavbar({data} : {data : any}){
    async function handleLogin(){
        await authClient.signIn.social({
          provider : "spotify",
          callbackURL : `${import.meta.env.VITE_FRONTEND_URL}/dashboard`,
          errorCallbackURL : import.meta.env.VITE_FRONTEND_URL,
          
          
    
        })
    
    }
    const navigate = useNavigate()
    

    return (
        <div className="bg-black/30 z-50 text-white fixed top-0 left-0 right-0 h-15 backdrop-blur-md px-20 flex flex-row justify-between items-center lg:px-50">
    
                <div className="flex flex-row items-center gap-x-2">
                    <div onClick={()=>{
                        navigate("/")
                        
                    }} className="hover:cursor-pointer" >
                        <img src={Logo} className="h-10"></img>

                    </div>
                    <div className="text-sm font-semibold tracking-wider">
                        STATIFY
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    
                    <div>
                        {data==null?
                        <RainbowButton onClick={handleLogin} className="hover:bg-gray-800">Sign in</RainbowButton>
                    :
                    <div className="relative">
                        <img src={data.image} alt="error loading image" className="peer h-10 rounded-4xl hover:cursor-pointer" />
                        <div className="transition-discrete duration-700 absolute top-full left-1/2 -translate-x-1/2 hidden peer-hover:block hover:block">
                            <TiltedCard 
                                imageSrc={data.image}
                                containerHeight="200px"
                                containerWidth="200px"
                                imageHeight="200px"
                                imageWidth="200px"
                                captionText={`@${data.name}`}
                                displayOverlayContent={true}
                                overlayContent={
                                    <p className="bg-gray-400/50 rounded-3xl m-3 p-3 backdrop-blur-sm font-extrabold">
                                         @{data.name}
                                    </p>
                                }


                            ></TiltedCard>
                            

                        </div>
                    </div>
                    }
                        
                    </div>
                </div>
            
        </div>
    )
    
}