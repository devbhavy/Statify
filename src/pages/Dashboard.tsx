import { useEffect, useState } from "react"
import { authClient } from "../lib/auth-client";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { DashboardNavbar } from "@/components/DashboardNavbar";

import { LoaderOne } from "@/components/ui/loader";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Track } from "@/components/Track";
import { Clock4, Disc3 } from "lucide-react";
import { Genres } from "@/components/Genres";
import { Card2 } from "@/components/Card2";
import { Card1 } from "@/components/Card1";

const timeFrames : string[] = ["short_term","medium_term","long_term"]
import { Sparkles } from "lucide-react";


interface Artist {
    name: string;
    popularity: number;
    image: { url: string };
    genres: string[];
}

interface UserData {
    artists: Artist[];
    tracks?: any[];
    genre_cluster?: { [key: string]: number };
    recentlyPlayed?: any[];
    aiReview?: string;
}

export function Dashboard(){
    const {time_frame} = useParams();
    const timeFrame = time_frame || "short_term";

    
    const navigate = useNavigate();
    const {data,isPending} = authClient.useSession();

    interface AiReview {
        persona_headline?: string;
        persona_breakdown?: string;
        decoder_insights?: string[];
        tags?: string[];
    }

    const [aiReview,setAiReview] = useState<AiReview | null>(null)
    useEffect(() => {
        if (!isPending && !data) {
            navigate("/");
        }
    }, [data, isPending, navigate]);

    const [loading,setLoading] = useState(false);
    const [userData,setUserData] = useState<UserData | undefined>(undefined);

    useEffect(() => {
        if (isPending || !data) return;
        
            (async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/user/me/generate-wrap/${timeFrame}`,
                        { withCredentials: true }
                    );
                    setUserData(response.data);
                    const aiReviewResponse = response.data?.aiReview?.response;
                   
                    const parsedReview = typeof aiReviewResponse === "string" ? JSON.parse(aiReviewResponse) : aiReviewResponse;
                    setAiReview(parsedReview || null);
                    
                } catch (error) {
                    console.error("Fetch error:", error);
                }
                finally{
                    setLoading(false)
                }
            })();
        
    }, [timeFrame, isPending]);



    


    return (
        



        <div className="bg-black min-h-dvh pt-25">
            <DashboardNavbar data={data?.user}/>
            {timeFrames.includes(timeFrame)==true ? (
            <div className="px-15">
                <div className="text-white z-20 flex flex-col gap-y-3">
                    <div>
                        <div className="bg-green-700/40 text-green-300 p-2 rounded-2xl inline-flex flex-row items-center gap-2 px-4">
                            <div className="inline-block bg-green-300 rounded-full h-2 w-2"></div>
                            <div>
                                Live analysis
                            </div>
                        </div>
                    </div>
                    <div className="font-medium text-5xl">
                        Your Sound Profile
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-xs text-neutral-400 leading-relaxed">
                            <p> 
                            Explore how your listening habits evolve over different timeframes, with rich AI-powered insights
                            </p>
                            <p>
                            that highlight your unique patterns, preferences, and trends over countless minutes of audio.
                            </p>
                        </div>
                        <div className="font-medium bg-neutral-800 rounded-3xl flex flex-row gap-5 p-2">
                            <div className={timeFrame=="long_term"?"px-5 py-2 rounded-xl bg-neutral-500 hover:cursor-pointer" : "py-2 px-5 rounded-xl text-neutral-400 hover:cursor-pointer "} onClick={()=>navigate("/dashboard/long_term")}>12 months</div>
                            <div className={timeFrame=="medium_term"?"px-5 py-2 rounded-xl bg-neutral-500 hover:cursor-pointer" : "py-2 px-5 rounded-xl text-neutral-400 hover:cursor-pointer "} 
                            onClick={()=>navigate("/dashboard/medium_term")}>6 months</div>
                            <div className={timeFrame=="short_term"?"px-5 py-2 rounded-xl bg-neutral-500 hover:cursor-pointer" : "py-2 px-5 rounded-xl text-neutral-400 hover:cursor-pointer "} onClick={()=>navigate("/dashboard/short_term")}>4 weeks</div>
                        </div>
                    </div>
                    
                </div>
                <div className="text-white py-10 ">
                    {loading?
                    <div className="flex flex-row justify-center p-45">
                        <LoaderOne></LoaderOne>
                    </div>
                    
                    :
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-row p-4">
                                <div className="rounded-3xl bg-[#0A0A0A] flex-2 flex-col p-8 border-2 border-white/10">
                                    <div className="flex gap-x-3 font-medium text-green-300 pb-3 border-b-2 border-white/5">
                                        <Sparkles color="#81C784" /> AI PERSONA

                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-medium pt-10 text-3xl tracking-tight">
                                            {aiReview?.persona_headline}
                                        </div>
                                        <div className="py-5 text-sm text-neutral-400 leading-relaxed">
                                            {aiReview?.persona_breakdown}
                                        </div>
                                        <div className="font-medium py-5 pt-3 text-3xl tracking-tight">
                                            Persona Signals
                                        </div>
                                        <div className="flex flex-col">
                                            {
                                                aiReview?.decoder_insights?.map((data : any)=>{
                                                    return (
                                                        <div className="flex items-start gap-4">
                                                            <span className="mt-2 h-[6px] w-[6px] rounded-full bg-white shrink-0" />
                                                            <p className="text-[15px] leading-relaxed text-neutral-400">
                                                                {data}
                                                            </p>
                                                        </div>

                                                    )
                                                })
                                            }

                                        </div>
                                        <div className="pt-5 flex flex-row gap-x-2">
                                            {
                                                aiReview?.tags?.map((data : any)=>{
                                                    return(
                                                        <div className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-neutral-300">
                                                            {data}

                                                        </div>

                                                    )
                                                    
                                                    

                                                })
                                            }
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-row justify-center">
                                    <div className="bg-black relative">
                                        {userData?.artists?.[0]?.image?.url && (
                                            <DirectionAwareHover className="h-[500px]" imageUrl={userData.artists[0].image.url}>
                                                <></>
                                            </DirectionAwareHover>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 z-20 flex p-4 flex-col">
                                            <div className="inline-flex flex-row gap-x-3 items-center  text-white">
                                                <div className="px-2 py-1 font-medium text-black  bg-green-500 rounded-4xl">
                                                  #1  
                                                </div>
                                                <div className="text-green-400">
                                                    Top Artist
                                                </div>
                                                
                                            </div>
                                            <div className="font-medium text-4xl">
                                                {userData?.artists[0]?.name}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                            <div className=" flex flex-row ">
                                <div className="flex-1 p-4">
                                    <div className="rounded-3xl bg-[#0A0A0A] flex flex-col p-2 border-2 border-white/10">
                                        <div className="flex flex-row gap-x-3 items-center p-2">
                                            <Disc3/>
                                            <div className="text-xs font-medium text-neutral-400 uppercase tracking-widest">TOP GENRES</div>

                                            
                                        </div>
                                        <Genres input={userData?.genre_cluster}></Genres>

                                    </div>
                                </div>
                                <div className="flex-1  min-w-[300px] p-4">
                                    <div className="rounded-3xl bg-[#0A0A0A] flex flex-col p-2 border-2 border-white/10">
                                        <div className="font-medium bg-neutral-900/30 border-b-2 border-gray-400/20 p-3">Top Tracks</div>
                                        <div className="flex flex-col">
                                            {
                                                
                                                userData?.tracks?.map((data,index)=>{
                                                    return(
                                                        <Track input = {data} key={index} index = {index +1}></Track>
                                                    )
                                                })
                                            }
                                            
                                            

                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                
                                <div className="flex-1  min-w-[300px] p-4">
                                    <div className="rounded-3xl bg-[#0A0A0A] flex flex-col p-2 border-2 border-white/10">
                                        <div className="font-medium bg-neutral-900/30 border-b-2 border-gray-400/20 p-3">Top Artists</div>
                                        <div className="flex flex-col">
                                            {
                                                
                                                userData?.artists.map((data,index)=>{
                                                    return (
                                                        <Card1 input={data} index={index}/>
                                                    )
                                                })
                                            }
                                            
                                            

                                        </div>
                                        
                                        
                                    </div>
                                </div>
                                
                            </div>
                            <div className="flex flex-row justify-center">
                                <div className="rounded-3xl bg-[#0A0A0A] flex flex-col border-2 border-white/10 p-5">
                                    <div className="flex flex-row justify-between mb-2">
                                        <div className="font-medium">
                                        Recently played
                                        </div>
                                        <div>
                                            <Clock4></Clock4>
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-row">
                                        {userData?.recentlyPlayed?.map((data)=>{
                                            return <Card2 input={data}/>
                                        })}
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    }
                    
                </div>

            </div>
            ) : (
            <div className="text-white">
                Error 404 Invalid time Frame
            </div>
            )}
        </div>
    )
}