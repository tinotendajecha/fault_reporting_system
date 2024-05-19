'use client'
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

let initialAuthStore = {
    id: null,
    name: null,
    email: null,
    role: null,
    token: null,
};

if (typeof window !== 'undefined' && window.localStorage) {
    const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    initialAuthStore = {
        ...initialAuthStore,
        ...auth,
    };
}

export const useAuthStore = create(persist(
    (set) => ({
        // initial state
        auth: initialAuthStore,
        // Update auth store by logging in
        login: (payload) => {
            set((state) => ({
                ...state.auth,
                id: payload.id,
                name: payload.name,
                email: payload.email,
                role: payload.role,
                token: payload.authToken
            }))
            return true;
        },
        logout: () => {
            set((state) => ({
                ...state.auth,
                id: null,
                name: null,
                email: null,
                role: null,
                token: null
            }))
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.clear();
            }
        }
    }), {
        name: 'auth',
        // storage: createJSONStorage(() => sessionStorage),
    }
));