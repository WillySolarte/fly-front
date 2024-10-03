import { StatusResponse } from './../types/schemas';
import { create } from "zustand";

//import { devtools } from "zustand/middleware";
import { Flight, LoginForm } from "../types/schemas";
import { loginUser, logout } from "../services/authServices";

type FlighState = {
    
    editFlight: Flight,
    doLoginUser: (formData: LoginForm) => Promise<StatusResponse>,
    logOutUser: () => void,
    
}

export const useFlightStore = create<FlighState>(() => ({
    
    editFlight: {
        id: '',
        name: "",
        origin: "",
        destination: "",
        price: 1000,
        airline: "",
        leave: "",
        arrive: "",
        createdAt: "",
        updatedAt: ""
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
    
    
    
    

}))