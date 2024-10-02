import { formatDate } from "../../helpers/utilities"
import { Flight } from "../../types/schemas"

type FlightCardProps ={
    flight: Flight
}

export default function FlightCard({flight} : FlightCardProps) {


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
                <button className="border rounded bg-red-700 text-white w-32 hover:bg-red-900" type="button">Eliminar</button>
                <button className="border rounded bg-blue-700 text-white w-32 hover:bg-blue-900" type="button">Editar</button>
            </div>
        </div>
    
    
    </>
  )
}
