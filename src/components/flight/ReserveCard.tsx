import { Reserve } from "../../types/schemas"


type ReserveCardProps = {
    reserve: Reserve
}
export default function ReserveCard({reserve} : ReserveCardProps) {

    

    return (
        <div className="border border-slate-300 p-3 rounded-lg w-80 my-2 card-reservation">
            <p className="text-sm">Vuelo: <span className="text-slate-400"> {reserve.vuelo.code} </span></p>
            <p className="text-sm">Origen: <span className="text-slate-400"> {reserve.vuelo.origin} </span></p>
            <p className="text-sm">Destino: <span className="text-slate-400"> {reserve.vuelo.destination} </span></p>
            <p className="text-sm">Aerolínea: <span className="text-slate-400"> {reserve.vuelo.aerline.name} </span></p>

        </div>
    )
}


