import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Sos from "./pages/Sos"
import Report from "./pages/Report"
import Setting from "./pages/Setting"
import ActiveSos from "./pages/ActiveSos"
import SosRing from "./pages/SosRing"
import Safetyscore from "./pages/Safetyscore"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/sos" element={<Sos/>}/>
      <Route path="/reports" element={<Report/>}/>
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/activeSos" element={<ActiveSos/>}/>
      <Route path="/sos-ring" element={<SosRing/>}/>
      <Route path="/safetyroute" element={<Route/>}/>
      <Route path="/safescore" element={<Safetyscore/>}/>
    </Routes>
  )
}

export default App
