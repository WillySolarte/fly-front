
import FlightCard from "../../components/flight/FlightCard"
import { useQuery } from "@tanstack/react-query"
import { getMyFlights } from "../../services/flightServices"

export default function MyFlightsView() {

    const {data, isLoading} = useQuery({
        queryKey: ['flightsReserve'],
        queryFn: getMyFlights
    })

    if(isLoading){
        return "Cargando ..."
    }
  if(data) return (
    <div>
        <h1 className="font-bold text-4xl mb-5">Mis Vuelos</h1>
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.length ? (
                
                data.map(current => (
                    <FlightCard key={current.id} flight={current}  />
                ))

            ): (
                <p className="text-3xl mx-auto my-5 font-bold">No hay registro de vuelos aún</p>
            )}
        
        </div>
        

    </div>
  )
}
