import { useQuery } from "@tanstack/react-query"
import { getMyReserves } from "../../services/flightServices"
import { Navigate } from "react-router-dom"

export default function MyReservesView() {

    const {data, isLoading, isError} = useQuery({
        queryKey: ['myReserves'],
        queryFn:  getMyReserves
    })

    

    if(isLoading){
        return "Cargando ..."
    }
    if(isError){
        return <Navigate to={'/404'} />
    }


  if(data) return (
    <div>
        Reservas
    </div>
  )
}
