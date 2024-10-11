import { Transition, Dialog } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"
import { Flight } from "../../types/schemas"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../helpers/utilities"
import { userExist } from "../../services/authServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { folowReserve, showExistReserve } from "../../services/flightServices"
import { toast } from "react-toastify"

type ShowTaskModalProps = {
    data: Flight
}

export default function ShowTaskModal({ data }: ShowTaskModalProps) {

    const navigate = useNavigate();
    const userActive = userExist()
    const queryClient = useQueryClient()
    const {data: reservado } = useQuery({
        queryKey:['reserveExist'],
        queryFn: () =>  showExistReserve(data.id),
        enabled: userActive,
        retry: false
    })

    const {mutate} = useMutation({
        mutationFn: folowReserve,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            queryClient.invalidateQueries({queryKey: ['reserveExist']})
            queryClient.invalidateQueries({queryKey: ['myReserves']})
        }
    })
    

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-[430px] max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-9">
                                <Dialog.Title as="h3" className="text-orange-600 font-black text-2xl text-center my-5">
                                    Vuelo - <span className="text-orange-600"> {data.code} </span>
                                </Dialog.Title>

                                <p className="text-xl font-bold">Información del vuelo</p>
                                <div className="mt-6">
                                    <p className="text-sm ">Lugar de origen: <span className="text-sm text-gray-400"> {data.origin}</span></p>
                                    <p className="text-sm ">Lugar de destino: <span className="text-gray-400"> {data.destination}</span></p>
                                    <p className="text-sm ">Aerolínea: <span className="text-gray-400">{data.aerline?.name}</span> </p>
                                    <p className="text-sm ">Fecha de salida: <span className="text-gray-400"> {formatDate(data.leave)}</span></p>
                                    <p className="text-sm ">Fecha de llegada: <span className="text-gray-400">{formatDate(data.arrive)}</span> </p>
                                </div>
                                <div className="flex justify-center">
                                    {userActive ? (
                                        <button onClick={()=> mutate(data.id)} className="my-5 border bg-slate-500 w-2/3 h-9 text-white hover:bg-slate-600 transition-colors" type="button">{reservado?.msg}</button>
                                    ) :
                                    (
                                        <div className=" my-5 flex flex-col items-center">
                                            <p className="text-slate-600 text-sm">Si quiere hacer una reservación</p>
                                            <p className="text-slate-600 text-sm">debe iniciar sesión</p>
                                            <a className="text-slate-600 font-bold hover:text-orange-600 text-sm" href="/auth/login">Click Aquí</a>
                                            
                                        </div>
                                    )}
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
