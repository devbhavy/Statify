
import { BrowserRouter, Route, Routes } from "react-router";
import { authClient } from "./lib/auth-client";

export function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}



function Landing(){
  const {data} = authClient.useSession();
  

  async function handleLogin(){
    await authClient.signIn.social({
      provider : "spotify",
      callbackURL : import.meta.env.VITE_FRONTEND_URL

    })

  }
  async function handleLogout(){
    await authClient.signOut();


  }
  
  return(

    <div>
      hi there
      <div>
        {data==null?
      <div>
        <button onClick={handleLogin}>Click to sign in with spotify</button>
      </div> : <div>
        <button onClick={handleLogout}>Signout</button>
      </div>}

      </div>

      

    </div>
  )
}


export default App;