import { useForm } from "react-hook-form";
import { FlightForm } from "../../types/schemas";
import ErrorMessage from "../../components/ErrorMessage";
import { useFlightStore } from "../../store/flightStore";
import { toast } from "react-toastify";

export default function RegisterFlightView() {

    const initialValues: FlightForm = {
        name: "",
        origin: "",
        destination: "",
        price: 1000,
        airline: '',
        leave: '',
        arrive: ''
    };

    const {createFlight} = useFlightStore()

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FlightForm>({ defaultValues: initialValues });

    const leaveDate = watch("leave")

    async function handleRegister(formData: FlightForm) {
        const msgOut = await createFlight(formData)
        reset()
        toast.success(msgOut)
    }


    return (
        <>

            <h1 className="text-4xl font-black text-black">Crear Registro de Vuelo</h1>
            

            <div className=" mx-auto w-[400px] lg:w-[500px]">
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-8 p-5  bg-slate-200 border shadow-lg mt-10 rouded rounded-lg" noValidate>

                    <div className="flex flex-col gap-1">
                        <label className="font-normal text-xl">Nombre</label>
                        <input type="name" placeholder="Nombre de Registro" className="w-full p-3  border-gray-300 border"
                            {...register("name", {
                                required: "El Nombre es obligatorio",
                            })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-normal text-xl" htmlFor="origin">Origen</label>
                        <input id="origin" type="origin" placeholder="Origen" className="w-full p-3  border-gray-300 border"
                            {...register("origin", {
                                required: "El Origen es obligatorio"
                            })}
                        />
                        {errors.origin && <ErrorMessage>{errors.origin.message}</ErrorMessage>}
                    </div>



                    <div className="flex flex-col gap-1">
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

                    <div className="flex flex-col gap-1">
                        <label className="font-normal text-xl" htmlFor="price">Precio</label>

                        <input id="price" type="number" step={1000} placeholder="Precio del vuelo" className="w-full p-3  border-gray-300 border"
                            {...register("price", {
                                required: "El precio es obligatorio"
                            })}
                        />

                        {errors.price && (
                            <ErrorMessage>{errors.price.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
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

                    <div className="flex flex-col gap-1">
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

                    <div className="flex flex-col gap-1">
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

                    <input
                        type="submit"
                        value="Registrarme"
                        className="bg-orange-600 hover:bg-orange-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    />
                </form>
            </div>


        </>
    )
}
