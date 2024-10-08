import { isAxiosError } from "axios";

import api from "../lib/axios";
import { LoginForm, RegisterForm, User, userSchema } from "../types/schemas";

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
        const {data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser(){

    try {
        const url = `/auth/user`
        const {data} = await api.get<User>(url)
        const response = userSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export function userExist() : boolean{

    const exist = localStorage.getItem('AUTH_TOKEN')
    return !!exist
    

}