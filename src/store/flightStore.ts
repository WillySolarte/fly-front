import { FlightForm, StatusResponse } from './../types/schemas';
import { create } from "zustand";

//import { devtools } from "zustand/middleware";
import { Flight, LoginForm } from "../types/schemas";
import { createRegisterFlight, getFlights } from "../services/flightServices";
import { loginUser, logout } from "../services/authServices";

type FlighState = {
    flights: Flight[],
    getAllFlights: () => Promise<void>,
    doLoginUser: (formData: LoginForm) => Promise<StatusResponse>,
    logOutUser: () => void,
    createFlight: (formData: FlightForm) =>  Promise<string>
}

export const useFlightStore = create<FlighState>((set) => ({
    flights: [],
    getAllFlights: async () => {
        const myFlights = await getFlights()
        
        set(() => ({

            flights: myFlights
        }))
            
    },
    doLoginUser: async (info) => {
        const loginResult = await loginUser(info)
        if(loginResult.data){
            localStorage.setItem('AUTH_TOKEN', loginResult.data.data)
            
        }
        
        return loginResult
        
    },
    logOutUser: () => {
        logout()
        
    },
    createFlight: async (info) => {
        const result = await createRegisterFlight(info)
        return result!
        
    }

}))