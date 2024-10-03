import { useQueryClient } from "@tanstack/react-query"
import { formatDate } from "../../helpers/utilities"
import { Flight } from "../../types/schemas"
import { createReserve } from "../../services/flightServices"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

type ReserveCardProps = {
    flight: Flight
}
export default function ReserveCard({ flight }: ReserveCardProps) {

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: createReserve,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (dataM) => {
            queryClient.invalidateQueries({queryKey: ['flightsReserve']})
            queryClient.invalidateQueries({queryKey: ['dataEstadistics']})
            toast.success(dataM)
        }
    })

    return (
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
            <button onClick={() => mutate(flight.id)} type="button" className="my-5 mx-auto border rounded bg-gray-700 text-white text-center w-32 hover:bg-gray-900">Reservar</button>

        </div>
    )
}


