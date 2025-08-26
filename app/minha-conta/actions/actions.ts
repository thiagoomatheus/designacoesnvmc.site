'use server'

import { revalidatePath } from "next/cache";

export const atualizarContatos = async (intancia: string) => {

    console.log("Atualizando contatos...");

    fetch(`${process.env.EVOLUTION_API_URL}/instance/restart/${intancia}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        }
    })

    revalidatePath("/minha-conta")
}