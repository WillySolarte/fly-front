
import { useQuery } from "@tanstack/react-query"
import { getFlights } from "../../services/flightServices"
import { formatDate } from "../../helpers/utilities"
import { useNavigate } from "react-router-dom"
import ShowTask from "../../components/flight/ShowFlight"

export default function PrincipalView() {

    const navigate = useNavigate()

    const {data, isLoading} = useQuery({
        queryKey: ['flights'],
        queryFn: getFlights,
        retry: 2
    })

    if(isLoading){
        return "Cargando..."
    }

    if(data){

     return (
    <div>
        <h1 className="font-bold text-4xl mb-5 text-orange-600">Registro de Vuelos</h1>
        
        {data.length ? (
            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-xl">
                {data.map(current => (
                    <li key={current.id}  className="flex justify-between gap-x-6 px-5 py-10">
                        <div className="flex justify-evenly items-center w-full gap-x-4">
                            <div className="min-w-0 flex-auto space-y-2">
                                <h2 className=" text-2xl font-black">Código de vuelo: <span className="text-xl text-slate-500"> {current.code} </span> </h2>
                                <p className="text-sm text-gray-400">Lugar de origen: {current.origin}</p>
                                <p className="text-sm text-gray-400">Lugar de destino: {current.destination}</p>
                                <p className="text-sm text-gray-400">Aerolínea: {current.aerline?.name}</p>
                                <p className="text-sm text-gray-400">Fecha de salida: {formatDate(current.leave)}</p>
                                <p className="text-sm text-gray-400">Fecha de llegada: {formatDate(current.arrive)}</p>
                            </div>
                            <button onClick={() => navigate(location.pathname +`?seeFlight=${current.id}`)} type="button" className="w-32 h-8 mx-10 border rounded-lg bg-gray-800 hover:bg-gray-600 font-bold text-white select-none">ver</button>
                        </div>
                    </li>
                ))}


            </ul>
        ): (
            <p className="text-3xl mx-auto font-bold text-center my-40">No hay registro de vuelos aún</p>
        )}
        <ShowTask/>

    </div>
  )}
  else{
    return (
        <>
            <h1 className="font-bold text-4xl mb-5">Registro de Vuelos</h1>
            <p className="text-3xl mx-auto my-5 font-bold">No hay registro de vuelos aún</p>
        </>
    )
  }
}
