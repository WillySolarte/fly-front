import { useEffect } from "react"
import { useFlightStore } from "../../store/flightStore"
import FlightCard from "../../components/flight/FlightCard"

export default function PrincipalView() {

    const {getAllFlights, flights} = useFlightStore()

    useEffect(() => {
        getAllFlights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div>
        <h1 className="font-bold text-4xl mb-5">Registro de Vuelos</h1>
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {flights.length ? (
                
                flights.map(current => (
                    <FlightCard key={current.id} flight={current}  />
                ))

            ): (
                <p className="text-3xl mx-auto my-5 font-bold">No hay registro de vuelos aún</p>
            )}
        
        </div>

    </div>
  )
}
