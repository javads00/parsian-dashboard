import type { Role } from '../role'



export type Admin = {
    id: string
    firstName: string
    lastName: string
    email: string
    username: string
    phone: string
    roleId: Role
    status: string
    createdAt: Date
}