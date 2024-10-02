import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-4 lg:py-5 mx-auto w-[450px]">
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>



      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />


    </>
  )
}
