import { isAxiosError } from "axios";

import api from "../lib/axios";
import { LoginForm, RegisterForm } from "../types/schemas";

export async function createAccount(formData: RegisterForm){

    try {
        const url = `/auth/register`
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function loginUser(formData: LoginForm){

    try {
        const url = `/auth/login`
        const {data} = await api.post(url, formData)
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export function logout(){
    localStorage.removeItem('AUTH_TOKEN')
}
export function userExist() : boolean{

    const exist = localStorage.getItem('AUTH_TOKEN')
    if(exist){
        return true
    }
    else{
        return false
    }

}