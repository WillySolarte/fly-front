import {z} from 'zod'


/**Types of Users */

export const registerFormSchema = z.object({

    name: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    email: z.string()
})
export type RegisterForm = z.infer<typeof registerFormSchema >



export const userLoginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export type LoginForm = z.infer<typeof userLoginSchema>

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
})
export type User = z.infer<typeof userSchema>


/**Types of Flights */

export const flightSchema = z.object({

    id: z.string(),
    code: z.string(),
    origin: z.string(),
    destination: z.string(),
    price: z.number(),
    leave: z.string(),
    arrive: z.string(),
    aerline: z.object({
        name: z.string()
    }).optional(),
    aerlineId: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string()
})
export const flightsSchema = z.array(flightSchema)


export type Flight = z.infer<typeof flightSchema>

export type FlightForm = Pick<Flight, 'code' | 'origin' | 'destination' | 'price' | 'leave' | 'arrive' | 'aerlineId'>

/**Type aerlines */

export const aerlineSchema = z.object({
    id: z.string(),
    name: z.string()
})
export const aerlinesSchema = z.array(aerlineSchema)
export type Aerline = z.infer<typeof aerlineSchema>