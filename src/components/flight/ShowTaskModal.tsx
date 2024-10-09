import { Transition, Dialog } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"
import { Flight } from "../../types/schemas"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../helpers/utilities"

type ShowTaskModalProps = {
    data: Flight
}

export default function ShowTaskModal({ data }: ShowTaskModalProps) {

    const navigate = useNavigate();
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title as="h3" className="text-orange-600 font-black text-4xl  my-5">
                                    Vuelo - <span className="text-orange-600"> {data.code} </span>
                                </Dialog.Title>

                                <p className="text-xl font-bold">Información del vuelo</p>
                                <div className="mt-6">
                                    <p className="text-sm text-gray-400">Lugar de origen: {data.origin}</p>
                                    <p className="text-sm text-gray-400">Lugar de destino: {data.destination}</p>
                                    <p className="text-sm text-gray-400">Aerolínea: {data.aerline?.name}</p>
                                    <p className="text-sm text-gray-400">Fecha de salida: {formatDate(data.leave)}</p>
                                    <p className="text-sm text-gray-400">Fecha de llegada: {formatDate(data.arrive)}</p>
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
