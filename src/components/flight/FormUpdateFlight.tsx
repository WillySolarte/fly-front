import { useForm } from "react-hook-form"
import { Flight, FlightForm } from "../../types/schemas"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { separateDate } from "../../helpers/utilities"
import { updateFlight } from "../../services/flightServices"
import { useNavigate } from "react-router-dom"

type FormUpdateFlightProps = {
    data: Flight,
    flightId: Flight['id']
}

export default function FormUpdateFlight({ data, flightId }: FormUpdateFlightProps) {

    const initialValues: FlightForm = {
        name: data.name,
        origin: data.origin,
        destination: data.destination,
        price: data.price,
        airline: data.airline,
        leave: separateDate(data.leave),
        arrive: separateDate(data.arrive)
    }
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({ defaultValues: initialValues })


    const leaveDate = watch("leave")

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: updateFlight,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {

            queryClient.invalidateQueries({ queryKey: ['Myflights'] })
            queryClient.invalidateQueries({ queryKey: ['flights'] })
            queryClient.invalidateQueries({ queryKey: ['flight', flightId] })

            toast.success(response)
            reset()
            navigate('/')

        }
    })


    function handleRegister(formData: FlightForm) {
        const finalData = {
            flightId,
            formData

        }
        mutate(finalData)
    }


    return (

        <>

            <h1 className="text-4xl font-black text-black">Modificar Vuelo</h1>


            <div className=" mx-auto w-[400px] lg:w-[500px]">
                <form onSubmit={handleSubmit(handleRegister)} className="h-[550px] flex flex-col justify-evenly p-5  bg-slate-200 border shadow-lg mt-10 rouded rounded-lg" noValidate>

                    <div className="flex flex-col gap-1">
                        <label className="font-normal text-xl">Nombre vuelo</label>
                        <input type="name" placeholder="Nombre de vuelo" className="w-full p-3  border-gray-300 border"
                            {...register("name", {
                                required: "El Nombre es obligatorio",
                            })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>
                    <div className=" flex justify-between">
                        <div className="flex flex-col gap-1 w-[45%]">
                            <label className="font-normal text-xl" htmlFor="origin">Origen</label>
                            <input id="origin" type="origin" placeholder="Origen" className="w-full p-3  border-gray-300 border"
                                {...register("origin", {
                                    required: "El Origen es obligatorio"
                                })}
                            />
                            {errors.origin && <ErrorMessage>{errors.origin.message}</ErrorMessage>}
                        </div>



                        <div className="flex flex-col gap-1 w-[45%]">
                            <label className="font-normal text-xl" htmlFor="destination">Destino</label>

                            <input type="text" placeholder="Destino de llegada" className="w-full p-3  border-gray-300 border"
                                {...register("destination", {
                                    required: "El destino es obligatorio"
                                })}
                            />
                            {errors.destination && (
                                <ErrorMessage>{errors.destination.message}</ErrorMessage>
                            )}
                        </div>
                    </div>

                    <div className=" flex justify-between">
                        <div className="flex flex-col gap-1 w-[45%]">
                            <label className="font-normal text-xl" htmlFor="price">Precio</label>

                            <input id="price" type="number" min={1000} step={1000} placeholder="Precio del vuelo" className="w-full p-3  border-gray-300 border"
                                {...register("price", {
                                    required: "El precio es obligatorio"
                                })}
                            />

                            {errors.price && (
                                <ErrorMessage>{errors.price.message}</ErrorMessage>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-[45%]">
                            <label className="font-normal text-xl" htmlFor="airline">Aerolínea</label>

                            <select id="airline" className="w-full p-3 border-gray-300 border"
                                {...register("airline", {
                                    required: "La aerolínea es obligatoria",
                                })}
                            >
                                <option value="">-- Selecciona --</option>
                                <option value="Avianca">Avianca</option>
                                <option value="Wingo">Wingo</option>
                                <option value="Satena">Satena</option>
                            </select>

                            {errors.airline && (
                                <ErrorMessage>{errors.airline.message}</ErrorMessage>
                            )}
                        </div>
                    </div>

                    <div className=" flex justify-between">
                        <div className="flex flex-col gap-1 w-[45%]">
                            <label className="font-normal text-xl" htmlFor="leave">Fecha de Salida</label>
                            <input id="leave" type="date" className="w-full p-3 border-gray-300 border"
                                {...register("leave", {
                                    required: "La fecha de salida es obligatoria"
                                })}
                            />
                            {errors.leave && (
                                <ErrorMessage>{errors.leave.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="flex flex-col gap-1 w-[45%]">
                            <label className="font-normal text-xl" htmlFor="arrive">Fecha de Llegada</label>
                            <input id="arrive" type="date" className="w-full p-3 border-gray-300 border"
                                {...register("arrive", {
                                    required: "La fecha de llegada es obligatoria",
                                    validate: (value) =>
                                        new Date(value) >= new Date(leaveDate) || "La fecha de llegada debe ser posterior o igual a la fecha de salida"
                                })}
                            />
                            {errors.arrive && (
                                <ErrorMessage>{errors.arrive.message}</ErrorMessage>
                            )}
                        </div>

                    </div>

                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-orange-600 hover:bg-orange-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    />
                </form>
            </div>

        </>

    )
}
