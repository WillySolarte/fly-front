import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import FlightsLayout from "./layouts/FlightsLayout";
import PrincipalView from "./views/flight/PrincipalView";
import RegisterFlightView from "./views/flight/RegisterFlightView";

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<FlightsLayout />} >
          <Route path="/" element={<PrincipalView />} index/>
          <Route path="/register/flight" element={<RegisterFlightView />} />

        </Route>


        <Route element={<AuthLayout />} >
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />

        </Route>


      </Routes>


    </BrowserRouter>
  )
}

