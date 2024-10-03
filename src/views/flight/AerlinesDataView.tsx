
import { useQuery } from "@tanstack/react-query"
import { getEstadistics } from "../../services/flightServices"



export default function AerlinesDataView() {

    const {data, isLoading} = useQuery({
        queryKey: ['dataEstadistics'],
        queryFn: getEstadistics
    })

    if(isLoading){
        return "Cargando ..."
    }
    
  if(data) return (
    <>
        <h1 className="text-3xl">Información de Aerolíneas</h1>
        
        
    
    </>
  )
}
