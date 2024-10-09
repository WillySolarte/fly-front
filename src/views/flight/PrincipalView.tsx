
import { useQuery } from "@tanstack/react-query"
import { getFlights } from "../../services/flightServices"

export default function PrincipalView() {

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
            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                {data.map(current => (
                    <li key={current.id}  className="flex justify-between gap-x-6 px-5 py-10">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto space-y-2">
                                <h2 className=" text-2xl font-black">Código de vuelo: <span className="text-xl text-slate-500"> {current.code} </span> </h2>
                                <p className="text-sm text-gray-400">Lugar de origen: {current.origin}</p>
                                <p className="text-sm text-gray-400">Lugar de destino: {current.destination}</p>
                                <p className="text-sm text-gray-400">Aerolínea: {current.aerline.name}</p>
                            </div>
                        </div>
                    </li>
                ))}


            </ul>
        ): (
            <p className="text-3xl mx-auto font-bold text-center my-40">No hay registro de vuelos aún</p>
        )}

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
