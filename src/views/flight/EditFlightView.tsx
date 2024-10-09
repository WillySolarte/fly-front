import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAerlines, getFlightById } from "../../services/flightServices"
import FormUpdateFlight from "../../components/flight/FormUpdateFlight"


export default function EditFlightView() {

  const params = useParams()
  const flightId = params.flightId!

  const { data, isLoading } = useQuery({
    queryKey: ['flight', flightId],
    queryFn: () => getFlightById(flightId)
  })

  const {data: aerlines} = useQuery({
    queryKey: ['aerlines'],
    queryFn: getAerlines
})
  if (isLoading) {
    return "Cargando..."
  }


  if(data && aerlines) return (
    <>

      <FormUpdateFlight data={data} flightId={flightId} aerlines={aerlines} />
    </>
  )
}
