import { isAxiosError } from "axios";
import api from "../lib/axios";
import { FlightForm, flightsSchema } from "../types/schemas";

export async function getFlights(){

    try {
        const url = `/all-flights`
        const {data} = await api.get(url)
        const response = flightsSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function createRegisterFlight(formData: FlightForm){

    try {
        const url = `/create-flight`
        const {data} = await api.post<string>(url, formData)
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}