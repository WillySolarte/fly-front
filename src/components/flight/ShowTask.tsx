import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"
import { getFlightById } from "../../services/flightServices"
import ShowTaskModal from "./ShowTaskModal"

export default function ShowTask() {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const flightId = queryParams.get('seeFlight')!

    const {data, isError } = useQuery({
        queryKey:['showFlight', flightId],
        queryFn: () =>  getFlightById(flightId),
        enabled: !!flightId,
        retry: false
      })
      if(isError){
        return <Navigate to='/404'/>
      }

  if(data) return (
    <ShowTaskModal data={data} />
  )
}
