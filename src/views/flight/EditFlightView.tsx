import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getFlightById } from "../../services/flightServices"
import FormUpdateFlight from "../../components/flight/FormUpdateFlight"


export default function EditFlightView() {

  const params = useParams()
  const flightId = params.flightId!

  const { data, isLoading } = useQuery({
    queryKey: ['flight', flightId],
    queryFn: () => getFlightById(flightId)
  })
  if (isLoading) {
    return "Cargando..."
  }


  if(data) return (
    <>

      <FormUpdateFlight data={data} flightId={flightId} />
    </>
  )
}
