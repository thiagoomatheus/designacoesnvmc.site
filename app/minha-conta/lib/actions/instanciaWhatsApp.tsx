"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../../../lib/prisma/prisma"

type ResponseConnect = {
    error?: {
        code: number
        message: string
    }
    data?: {
        code: number
        qrcode: string
    }
}

type ResponseCreate = {
    error?: {
        code: number
        message: string
    }
    data?: {
        code: number
        instanceName: string
    }
}

type ResponseLogout = {
    error?: {
        code: number
        message: string
    }
    data?: {
        code: number
    }
}

export async function criarInstanciaWhatsApp (emailUsuario: string): Promise<ResponseCreate> {

    const result = await fetch(`${process.env.EVOLUTION_API_URL}/instance/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        },
        body: JSON.stringify({
            instanceName: emailUsuario.replaceAll("@", "_").replaceAll(".", "_"),
            qrcode: true,
        })
    })

    const response = await result.json()

    if (result.status !== 201) return {
        error: {
            code: result.status,
            message: response.response.message[0]
        }
    }

    const instanceName = response.instance.instanceName

    await prisma.usuario.update({
        where: {
            email: emailUsuario
        },
        data: {
            instanciaWhatsApp: instanceName
        }
    })

    return {
        data: {
            code: result.status,
            instanceName: instanceName
        }
    }
}

export async function conectarWhatsApp(instancia: string): Promise<ResponseConnect> {
     
    const result = await fetch(`${process.env.EVOLUTION_API_URL}/instance/connect/${instancia}`, {
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        }
    })

    if (result.status !== 200) return {
        error: {
            code: result.status,
            message: (await result.json()).response.message[0]
        }
    }
    
    return {
        data: {
            code: result.status,
            qrcode: (await result.json()).base64
        }
    }
}

export async function desconectarWhatsApp (instancia: string): Promise<ResponseLogout> {

    const result = await fetch(`${process.env.EVOLUTION_API_URL}/instance/logout/${instancia}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        }
    })

    if (result.status !== 200) return {
        error: {
            code: result.status,
            message: (await result.json()).response.message[0]
        }
    }
    
    return {
        data: {
            code: result.status
        }
    }
}

export async function verificarConexao (instancia: string) {

    const result = await fetch(`${process.env.EVOLUTION_API_URL}/instance/connectionState/${instancia}`, {
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        }
    })

    if (result.status !== 200) return {
        error: {
            code: result.status,
            message: (await result.json()).response.message[0]
        }
    }

    return {
        data: {
            code: result.status
        }
    }
}