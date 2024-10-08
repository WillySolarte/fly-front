import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function UserActiveLayout() {

    const {data, isError, isLoading} = useAuth()


    if(isLoading){
        return "Cargando ..."
    }
    if(isError){
        return <Navigate to={'/'} />
    }

  if(data)return (
    <div>

        <Outlet/>
    </div>
  )
}
