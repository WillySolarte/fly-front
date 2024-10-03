import { useQuery } from "@tanstack/react-query"
import { getFlights } from "../../services/flightServices"
import ReserveCard from "../../components/flight/ReserveCard"


export default function WatchFlightView() {

  const { data, isLoading } = useQuery({
    queryKey: ['flights'],
    queryFn: getFlights,
    retry: 2
  })

  if (isLoading) {
    return "Cargando..."
  }

  if (data) return (
    <div>
      <h1 className="font-bold text-4xl mb-5">Registro de Vuelos</h1>
      <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.length ? (

          data.map(current => (
            <ReserveCard key={current.id} flight={current}/>
          ))

        ) : (
          <p className="text-3xl mx-auto my-5 font-bold">No hay registro de vuelos aún</p>
        )}

      </div>

    </div>
  )
}
