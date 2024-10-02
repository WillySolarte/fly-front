import {z} from 'zod'


/**Types of Users */

export const registerFormSchema = z.object({

    name: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    email: z.string()
})
export type RegisterForm = z.infer<typeof registerFormSchema >


export const statusResponseSchema = z.object({
    error: z.string().nullable(),
    data: z.object({
        msg: z.string(),
        data: z.string().nullable()
    }).nullable(),
    success: z.string()

})
export type StatusResponse = z.infer<typeof statusResponseSchema>

export const userLoginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export type LoginForm = z.infer<typeof userLoginSchema>


/**Types of Flights */

export const flightSchema = z.object({

    id: z.string(),
    name: z.string(),
    origin: z.string(),
    destination: z.string(),
    price: z.number(),
    airline: z.string(),
    leave: z.string(),
    arrive: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})
export const flightsSchema = z.array(flightSchema)

export type Flight = z.infer<typeof flightSchema>

export type FlightForm = Pick<Flight, 'name' | 'origin' | 'destination' | 'price' | 'airline' | 'leave' | 'arrive'>