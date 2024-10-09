

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

export function generateCode():string {
    let outCode: string = '';
    const arr : string [] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z']
    
    for(let i: number = 0; i < 3; i++){
        outCode += arr[getRandomInt(0, 25)]
    }
    outCode += '-'
    outCode += Math.floor(100 + Math.random() * 900).toString()

    return outCode
}


function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}