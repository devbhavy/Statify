import DarkVeil from "@/components/DarkVeil";
import { LandingNavbar } from "@/components/landingNavbar";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import FadeContent from "@/components/FadeContent";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/ui/aurora-text";
import { ArrowRight, BrainCircuit, Globe, LogIn, ShieldCheck } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Safari } from "@/components/ui/safari";
import Temp from "../assets/Dashboard.png"
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { useNavigate } from "react-router";



export function Landing(){
    const {data} = authClient.useSession();
    const navigate = useNavigate();
    
    async function handleLogin(){
        await authClient.signIn.social({
          provider : "spotify",
          callbackURL : `${import.meta.env.VITE_FRONTEND_URL}/`,
          errorCallbackURL : import.meta.env.VITE_FRONTEND_URL,
          
          
    
        })
    
    }
    function handleSubmit(e:any){
      e.preventDefault();
      navigate(`/dashboard/${timeFrame}`)
      
    }
    
      
  
    const [timeFrame,setTimeFrame] = useState("short_term")
    
    return(
        <div className="min-h-dvh max-w-dvw bg-black">
            <div className="relative w-full">
                <DarkVeil hueShift={95}></DarkVeil>
                <LandingNavbar data={data?.user}></LandingNavbar>
                <div className="relative pt-45 z-10 text-white pb-20">
                    <FadeContent blur={true} duration={1000} ease="ease-out" initialOpacity={0} className="flex flex-col  items-center z-20">
                    <Button variant={"default"} size={"sm"} className="m-7">
                  <ArrowRight/>Now with Ai persona Analysis

                </Button>
                <div className="font-medium text-7xl text-neutral-50">Your music DNA,</div>
                <AuroraText className="font-medium text-7xl" colors={["#1DB954","#1ED760","#2EBD85","#169C46"]}>fully decoded.</AuroraText>
                <div className="flex flex-col items-center font-light text-gray-200 pt-15 pb-10">
                  <p>Unlock deep insights into your listening habits. From obscure</p>
                  <p>genres to daily rhythms, see what makes your taste unique with our</p>
                  <p>privacy-first analytics.</p>
                </div>
                
                <div>
                  {
                    data!=null ? 
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                      <div  className="flex flex-row px-7 py-4 bg-neutral-900/90 rounded-4xl gap-5">
                        <div onClick={()=>{
                          setTimeFrame("short_term")
                        }} className={timeFrame=="short_term"?"bg-white text-black p-2 rounded-3xl text-sm font-medium" : "p-2 rounded-3xl text-sm font-medium"}>
                          4 weeks
                        </div>
                        <div onClick={()=>{
                          setTimeFrame("medium_term")
                        }} className={timeFrame=="medium_term"?"bg-white text-black p-2 rounded-3xl text-sm font-medium" : "p-2 rounded-3xl text-sm font-medium"}>
                          6 months
                        </div>
                        <div onClick={()=>{
                          setTimeFrame("long_term")
                        }} className={timeFrame=="long_term"?"bg-white text-black p-2 rounded-3xl text-sm font-medium" : "p-2 rounded-3xl text-sm font-medium"}>
                          12 months
                        </div> 
                      </div>

                      <div className="mt-5">
                        <ShimmerButton type="submit">
                          Generate wrap
                        </ShimmerButton>
                      </div> 

                    </form> : <div>
                    <button onClick={handleLogin} className="flex bg-green-500 text-black rounded-3xl p-3 gap-x-2 hover:bg-green-600 cursor-pointer ">
                      <div>
                        <LogIn/>
                      </div>
                      <div className="font-medium">
                      Connect Spotify
                      </div>
                    
                    </button>



                    </div>
                  }



                  
                </div>

                    </FadeContent>
                </div>
                
            </div>
            <div className="bg-black flex justify-center border-b-2 border-neutral-600/20">
                <div className="w-3/4 py-20 ">
            
                    <Safari className="w-full h-full m-0" url="statify.app/dashboard" imageSrc={Temp}></Safari>
          
          
                </div>
            </div>
            <div className="flex flex-col justify-center items-center p-20 border-b-2 border-neutral-800/45">
                <div className="text-2xl font-medium mb-3 text-white">More than just a wrap</div>
                <div className="mb-8 text-sm text-neutral-500">
                    Live data updates, custom time ranges, and deeper analysis.
                </div>
          <div className="w-full flex justify-center gap-x-7">
            <div className="bg-black rounded-xl border-2 border-neutral-800/50 p-10 hover:bg-neutral-900">
              <div className="mb-2 bg-green-400/20 inline-block rounded-md p-2">
                <BrainCircuit color="#46d312" />
              </div>
              <div className="text-sm font-medium text-white mb-2">
                Ai-Powered Personas
              </div>
              <div className="text-xs text-neutral-400 leading-relaxed">
              We infer patterns from the artists and genres you listen to most to create a clear, evolving music persona that reflects your overall sound.
              </div>
            </div>
            <div className="bg-black rounded-xl border-2 border-neutral-800/50 p-10 hover:bg-neutral-900">
              <div className="mb-2 bg-blue-600/20 inline-block rounded-md p-2">
                <Globe color="#3d3af8" />
              </div>
              <div className="text-sm font-medium text-white mb-2">
                Cross-Platform
              </div>
              <div className="text-xs text-neutral-400 leading-relaxed">
              View your listening stats seamlessly across devices and time ranges, all organized into one consistent experience.
              </div>
            </div>
            <div className="bg-black rounded-xl border-2 border-neutral-800/50 p-10 hover:bg-neutral-900">
              <div className="mb-2 bg-violet-500/20 inline-block rounded-md p-2">
                <ShieldCheck color="#e209f1" />
              </div>
              <div className="text-sm font-medium text-white mb-2">
                Privacy Focused
              </div>
              <div className="text-xs text-neutral-400 leading-relaxed">
              We use only what’s necessary to generate insights. Your listening data is never sold, shared, or tracked beyond analysis.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center py-20">
          <div className="flex flex-col items-center">
            <div>
            <AvatarCircles
                className="mb-6"
                numPeople={20}
                avatarUrls={[
                  {
                  imageUrl: "https://i.scdn.co/image/ab6775700000ee854ea9458eb199cce218c78a04",
                  profileUrl: "http://open.spotify.com/user/o7d8dj76c0w5upp4nte33lvn0",
                  },
                  
                ]}
                />
            </div>
            <div className="text-3xl font-medium text-white mb-4 tracking-tight">Ready to explore your sound?</div>
            <div className="text-sm text-neutral-400 mb-8">
              Join numerous other music lovers discovering their true audio identity today.
            </div>
            <div>
              <button className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer" onClick={handleLogin}>Get started for free</button>
            </div>
          </div>
        </div>
            
            
                    

            

            
            

        </div>
        
    )
}