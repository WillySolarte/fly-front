import { useForm } from "react-hook-form";
import { RegisterForm } from "../../types/schemas";


import ErrorMessage from "../../components/ErrorMessage"
import { createAccount } from "../../services/authServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RegisterView() {

    const initialValues: RegisterForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues });

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ['allInformation']})
        }
    })

    const password = watch("password");

    

    const handleRegister = async (formData: RegisterForm) => {

        mutate(formData)

    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
            <p className="text-xl font-light text-white mt-1">
                Llena el formulario para {""}
                <span className=" text-orange-500 font-bold"> crear tu cuenta</span>
            </p>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-8 p-10  bg-white mt-10 rouded rounded-lg" noValidate>

                <div className="flex flex-col gap-1">
                    <label className="font-normal text-xl">Nombre</label>
                    <input type="name" placeholder="Nombre de Registro" className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-normal text-xl" htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Email de Registro" className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>



                <div className="flex flex-col gap-1">
                    <label className="font-normal text-xl">Password</label>

                    <input type="password" placeholder="Password de Registro" className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 5,
                                message: "El Password debe ser mínimo de 5 caracteres",
                            },
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-normal text-xl">Repetir Password</label>

                    <input id="password_confirmation" type="password" placeholder="Repite Password de Registro" className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Repetir Password es obligatorio",
                            validate: (value) => value === password || "Los Passwords no son iguales",
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Registrarme"
                    className="bg-orange-600 hover:bg-orange-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link className=" text-center text-gray-300 font-normal" to={"/auth/login"}>¿Ya tienes cuenta? Iniciar Sesión</Link>
            </nav>



        </>
    )
}
