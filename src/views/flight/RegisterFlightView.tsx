import { useForm } from "react-hook-form";
import { FlightForm } from "../../types/schemas";
import ErrorMessage from "../../components/ErrorMessage";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRegisterFlight, getAerlines } from "../../services/flightServices";
import { generateCode } from "../../helpers/utilities";
import { Navigate } from "react-router-dom";

export default function RegisterFlightView() {

    const initialValues: FlightForm = {
        code: "",
        origin: "",
        destination: "",
        price: 1000,
        leave: '',
        arrive: '',
        aerlineId: ''
    };


    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FlightForm>({ defaultValues: initialValues });

    const leaveDate = watch("leave")

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: createRegisterFlight,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            reset()
            queryClient.invalidateQueries({queryKey: ['Myflights']})
            queryClient.invalidateQueries({queryKey: ['flights']})
            queryClient.invalidateQueries({queryKey: ['myReserves']})
            
        }
    })
    const {data, isError, isLoading} = useQuery({
        queryKey: ['aerlines'],
        queryFn: getAerlines
    })

    async function handleRegister(formData: FlightForm) {
        formData.code = generateCode()
        
        mutate(formData)
    }
    if(isError){
        return <Navigate to={'/'} />
    }

    if(isLoading){
        return 'Cargango ...'
    }


    if(data)return (
        <>

            <h1 className="text-4xl font-black text-black">Crear Registro de Vuelo</h1>
            

            <div className=" mx-auto w-[400px] lg:w-[500px]">
                <form onSubmit={handleSubmit(handleRegister)} className="h-[550px] flex flex-col justify-evenly p-5  bg-slate-200 border shadow-lg mt-10 rouded rounded-lg" noValidate>

                    
                    
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

                            <select id="aerlineId" className="w-full p-3 border-gray-300 border"
                                {...register("aerlineId", {
                                    required: "La aerolínea es obligatoria",
                                })}
                            >
                                <option value="">-- Selecciona --</option>
                                {data.map(aerline => (
                                    <option key={aerline.id} className="uppercase" value={aerline.id} > {aerline.name} </option>
                                ))}
                            </select>

                            {errors.aerlineId && (
                                <ErrorMessage>{errors.aerlineId.message}</ErrorMessage>
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
                        value="Registrar Vuelo"
                        className="bg-orange-600 hover:bg-orange-700 w-full p-3  text-white font-black  text-xl cursor-pointer mt-3"
                    />
                </form>
            </div>


        </>
    )
}
