import { useQuery } from "@tanstack/react-query"
import { getInformation, getMyReserves } from "../../services/flightServices"
import { Navigate } from "react-router-dom"
import { userExist } from "../../services/authServices"
import ReserveCard from "../../components/flight/ReserveCard"

export default function MyReservesView() {

    const userActive = userExist()
    //Nota: ya desactivamos el query cuando se crea un nuevo vuelo, falta desactivarlo para nueva aerolínea y nuevo usuario
    const { data, isLoading, isError } = useQuery({
        queryKey: ['myReserves'],
        queryFn: getMyReserves,
        enabled: userActive,
        retry: 1
    })

    const { data: information, isError : errorInformation } = useQuery({
        queryKey: ['allInformation'],
        queryFn: getInformation,
        
        retry: 1
    })

    if (isLoading) {
        return "Cargando ..."
    }
    if (isError || errorInformation) {
        return <Navigate to={'/404'} />
    }


    return (
        <div className="shadow-2xl flex flex-col mt-8">
            <h1 className=" text-3xl font-bold text-center">Información general</h1>
            <div className="flex flex-col my-8 lg:flex-row">
                <div className="w-3/3 flex flex-col lg:w-2/3 items-center">

                    <table className=" mt-5 w-[95%] md:w-[90%] xl:w-[700px] my-8">
                        <thead>
                            <tr className=" bg-slate-800">
                                <th colSpan={2} className="text-white">Información de registros</th>
                            </tr>
                            <tr className=" bg-slate-400">
                                <th className="text-white w-3/4">Entidad</th><th className="text-white w-1/4">N°</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Usuarios registrados</td><td> {information?.users.value} </td>
                            </tr>
                            <tr>
                                <td>Aerolíneas registradas</td><td> {information?.aerlines.value} </td>
                            </tr>
                            <tr>
                                <td>Vuelos registrados</td><td> {information?.flights.value} </td>
                            </tr>
                        </tbody>
                    </table>



                    <table className=" mt-5 w-[95%] md:w-[90%] xl:w-[700px] my-8">
                        <thead  >
                            <tr className=" bg-slate-800">
                                <th colSpan={2} className="text-white">Cantidad de reservas por vuelo</th>
                            </tr>
                            <tr className=" bg-slate-400 ">
                                <th className="text-white w-3/4">Vuelo</th><th className="text-white w-1/4">N° reservas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {information?.reserves.map(current => (
                                <tr key={current.flightId}> 
                                    <td>{current.vuelo.code}</td><td> {current.reservationsCount} </td>
                                </tr> 
                                
                            )) }
                        </tbody>
                    </table>


                </div>
                <div className="w-3/3 flex flex-col my-5 lg:w-1/3 lg:my-0">
                    <h2 className=" text-2xl text-center select-none">Mis reservaciones</h2>
                    {data?.length ? (
                        <div className="flex flex-col justify-center items-center">
                            {data.map(reserve => (
                                <ReserveCard key={reserve.id} reserve={reserve} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-3">
                            <p className="text-center text-sm text-slate-400 select-none">Si quiere hacer reservaciones</p>
                            <p className="text-center text-sm text-slate-400 select-none">Debe iniciar sesión</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
