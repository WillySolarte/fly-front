

export function formatDate(dateStr: string):string {

    const dateObject = new Date(dateStr);
    const options : Intl.DateTimeFormatOptions = {

        weekday: "long",
        year: 'numeric',
        month: 'long',
        day: 'numeric'

    }

    return new Intl.DateTimeFormat('es-ES', options).format(dateObject)

}

export function separateDate(date: string) : string {
    const formattedLeaveDate = new Date(date).toISOString().split('T')[0];
    return formattedLeaveDate
}