import { create } from "zustand";


let initialAuthStore = {
    id : null,
    name: null,
    email: null,
    role: null,
    token: null
}

export const useAuthStore = create((set) => ({
    // initial state
    auth: initialAuthStore,
    // Update auth store by loggin in
    login: (payload) => {
        set((state) => ({
            ...state.auth,
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            token: payload.authToken
        }))

        return true
    },
    logout: () => set({auth: initialAuthStore})
}))