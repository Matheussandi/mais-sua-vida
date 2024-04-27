"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function ButtonLogout() {
    const router = useRouter();

    async function handleLogout() {
        await signOut({
            redirect: false,
        })

        router.replace("/")
    }

    return (
        <button onClick={handleLogout} className="w-full rounded bg-red-500 px-4 py-2 text-white">
            Sair
        </button>
    )
}