import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFlightStore } from "../store/flightStore"
import { useEffect, useState } from "react"
import { userExist } from "../services/authServices"

export default function FlightsLayout() {

    const navigate = useNavigate()

    const {logOutUser} = useFlightStore()
    const {pathname}  = useLocation()
    const [activeUser, setActiveUser] = useState(false)

    useEffect(() => {
        setActiveUser(userExist())
        if(!activeUser && pathname !=='/'){
            navigate('/')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    

    function closeSession(){
        logOutUser();
        window.location.reload();

        

    }
    return (
        <>

            <header className="bg-gray-800 flex flex-col justify-evenly py-5 h-[250px]">

                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">

                    <div className=" px-10">
                        <Link to='/' className=" text-4xl text-orange-600 uppercase font-bold">Fly With us</Link>

                    </div>

                </div>
                <div className=" flex items-center justify-center text-white gap-x-4 px-6">
                    <Link to={'/aerlines/show'} >Estadísticas</Link>
                    <Link to={'/'} >Home</Link>
                    {activeUser && (
                        <>
                            <Link to={'/register/flight'}  >Registrar vuelo</Link>
                            <Link to={'/flight/my-flights'}  >Mis vuelos</Link>
                            <Link to={`/flight/show`}  >Reservar</Link>
                        </>
                        
                    )}
                    
                </div>
                <nav className="flex text-white font-bold space-x-3 px-6">

                    {activeUser ? (
                        <button onClick={closeSession} type="button" className="hover:text-orange-700"  >Cerrar Sesión</button>
                    ): (
                        <Link className="hover:text-orange-700" to={'/auth/login'} >Iniciar Sesión</Link>
                    )}

                    
                </nav>


            </header>
            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>
            <footer className="py-5">
                <p className="text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
            </footer>

            <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />



        </>
    )
}
