import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";


import ErrorMessage from "../../components/ErrorMessage"
import { LoginForm } from "../../types/schemas";
import { loginUser } from "../../services/authServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";


export default function LoginView() {

  const initialValues: LoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

  const navigate = useNavigate()

  const {mutate} = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      reset()
      toast.success("Usuario logeado")
      navigate('/')
    }
  })

  

  

  const handleLogin = async (formData: LoginForm) => { 

    mutate(formData)
    
  }
  



  return (
    <>

      <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-xl font-light text-white mt-1">Crea tus proyectos {""}<span className=" text-orange-500 font-bold">iniciando sesión</span></p>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-8 p-10 bg-white mt-10 rounded-lg" noValidate>
        <div className="flex flex-col gap-1">
          <label className="font-normal text-xl" >Email</label>

          <input id="email" type="email" placeholder="Email de Registro" className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-normal text-xl" >Password</label>

          <input type="password" placeholder="Password de Registro" className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input type="submit" value='Iniciar Sesión' className="bg-orange-600 hover:bg-orange-700 w-full p-3  text-white font-black  text-xl cursor-pointer" />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link className=" text-center text-gray-300 font-normal" to={'/auth/register'}>¿No tienes cuenta? Crea Una</Link>
      </nav>


    </>
  )
}
