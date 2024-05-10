import { create } from "zustand";


const initialAuthStore = {
    id : null,
    name: null,
    email: null,
    role: null,
    token: null
}

export const useAuthStore = create((set) => ({
    // initial state
    initialAuthStore,
    // Update auth store by loggin in
    login: (payload) => {
        // operation here
        const user_id = payload.id
        const username = payload.name
        const email = payload.email
        const role  = payload.role
        const token = payload.authToken

        set((state) => ({
            id: user_id,
            name: username,
            email: email,
            role: role,
            token: token
        }))
    }
}))