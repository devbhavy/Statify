

import { BrowserRouter, Route, Routes} from "react-router";


import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";




export function App(){
  return(
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/dashboard/:time_frame" element={<Dashboard/>}></Route>
          
          
        </Routes>
    
    </BrowserRouter>
  )
}



export default App;