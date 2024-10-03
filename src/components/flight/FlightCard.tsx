import { Link, useLocation } from "react-router-dom"
import { formatDate } from "../../helpers/utilities"
import { Flight } from "../../types/schemas"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteFlight } from "../../services/flightServices"

type FlightCardProps ={
    flight: Flight
}

export default function FlightCard({flight} : FlightCardProps) {

    const {pathname} = useLocation()

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        
        mutationFn: deleteFlight,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['Myflights']})
            queryClient.invalidateQueries({queryKey: ['flights']})
        }
    })
    

  return (
    <>
        <div className="flex flex-col border border-gray-200 rounded-lg mx-auto my-4 min-w-[400px] p-5 shadow-md">
            <div className="">
                

                <p><span className="font-bold">Nombre:</span> {""} {flight.name} </p>
                <p><span className="font-bold">Origen:</span> {""} {flight.origin} </p>
                <p><span className="font-bold">Destino:</span> {""} {flight.destination} </p>
                <p><span className="font-bold">Precio:</span> {""} {flight.price} </p>
                <p><span className="font-bold">Aerolínea:</span> {""} {flight.airline} </p>
                <p><span className="font-bold">Partida:</span> {""} {formatDate(flight.leave)} </p>
                <p><span className="font-bold">Llegada:</span> {""} {formatDate(flight.arrive)} </p>
                

            </div>
            <div className="flex justify-evenly my-5">
                {pathname === "/flight/my-flights" ? (
                    <>
                        <button onClick={() => mutate(flight.id)} className="border rounded bg-red-700 text-white w-32 hover:bg-red-900" type="button">Eliminar</button>
                        <Link to={`/flight/edit/${flight.id}`} className="border rounded bg-blue-700 text-white text-center w-32 hover:bg-blue-900">Editar</Link>
                    </>
                ): (
                    <>
                        
                    </>
                )}
                
            </div>
        </div>
    
    
    </>
  )
}
