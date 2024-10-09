
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteFlight, getMyFlights } from "../../services/flightServices"
import { Link, Navigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function MyFlightsView() {
    const queryClient = useQueryClient()

    const {data, isLoading, isError} = useQuery({
        queryKey: ['Myflights'],
        queryFn: getMyFlights
    })

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

    if(isLoading){
        return "Cargando ..."
    }
    if(isError){
        return <Navigate to={'/'} />
    }
  if(data) return (
    <div>
        <h1 className="font-bold text-4xl mb-5">Mis Vuelos</h1>
        {data.length ? (
            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                {data.map(current => (
                    <li key={current.id}  className="flex gap-x-6 px-5 py-10">
                        <div className="flex justify-evenly items-center w-full gap-x-4">
                            <div className="w-2/3 flex-auto space-y-2">
                                <h2 className=" text-2xl font-black">Código de vuelo: <span className="text-xl text-slate-500"> {current.code} </span> </h2>
                                <p className="text-sm text-gray-400">Lugar de origen: {current.origin}</p>
                                <p className="text-sm text-gray-400">Lugar de destino: {current.destination}</p>
                                <p className="text-sm text-gray-400">Aerolínea: {current.aerline.name}</p>
                            </div>
                            <div className="w-1/3 flex justify-evenly">
                                <button onClick={() => mutate(current.id)} className="w-1/3 text-center border rounded bg-red-700 text-white  hover:bg-red-900" type="button">Eliminar</button>
                                <Link to={`/flight/edit/${current.id}`} className="flex justify-center w-1/3 text-center border rounded bg-blue-700 text-white hover:bg-blue-900">Editar</Link>

                            </div>
                            
                        </div>
                    </li>
                ))}


            </ul>
        ): (
            <p className="text-3xl mx-auto font-bold text-center my-40">No hay registro de vuelos aún</p>
        )}
        

    </div>
  )
}
