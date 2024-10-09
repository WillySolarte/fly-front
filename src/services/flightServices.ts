import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Flight, FlightForm, flightsSchema, flightSchema, aerlinesSchema } from "../types/schemas";

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

export async function getMyFlights(){

    try {
        const url = `/my-flights`
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

export async function deleteFlight(id: Flight['id']){

    try {
        const url = `/delete/${id}`
        const {data} = await api.delete<string>(url)
        
        return data
            
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFlightById(id: Flight['id']){

    try {
        
        const url = `/flight/${id}`
        const {data} = await api.get(url)
        
        const response = flightSchema.safeParse(data)
        
        if(response.success){
            return response.data
        }
            
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type FlightEditApiType = {
    flightId: Flight['id']
    formData:  FlightForm
}
export async function updateFlight({flightId, formData} : FlightEditApiType){

    try {
        const url = `/update/${flightId}`
        const {data} = await api.put<string>(url, formData)
        
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function createReserve(id: Flight['id']){

    try {
        const url = `/reserve/${id}`
        const {data} = await api.post<string>(url)
        
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAerlines(){

    try {
        const url = `/get-aerlines`
        const {data} = await api.get(url)
        const response = aerlinesSchema.safeParse(data)
        if(response.success){
            return response.data
        }
            
            
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}