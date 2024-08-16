"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

export default function useForm() {
    const [dataForm, setDataForm] = useState<{
        layout?: "quinzenal" | "mensal_padrao" | "mensal_especial"
        week?: number
    } | undefined>(undefined)

    function comecar() {
        setDataForm({
            layout: undefined,
            week: undefined
        })
        return toast("Selecione o layout", {
            icon: "📐📌",
        })
    }

    function inserirLayout(formData:FormData) {
        const layoutSchema = z.string().refine((value) => value === "quinzenal" || value === "mensal_padrao" || value === "mensal_especial", {
            message: "Selecione um layout"
        })
        const layout = formData.get("layout") as "quinzenal" | "mensal_padrao" | "mensal_especial"
        const result = layoutSchema.safeParse(layout)
        if (!result.success) {
            return toast.error(result.error.message)
        }
        setDataForm({
            ...dataForm,
            layout: layout
        })
        toast("Selecione a semana inicial", {
            icon: "📅",
        })
        return 
    }
    function inserirWeek(formData:FormData) {
        const layoutSchema = z.number({
            message: "Selecione um layout"
        })
        const weekInString = formData.get("week") as string
        const week = parseInt(weekInString)
        const result = layoutSchema.safeParse(week)
        if (!result.success) {
            return toast.error(result.error.message)
        }
        setDataForm({
            ...dataForm,
            week: week
        })
        
    }
    return {
        dataForm,
        comecar,
        inserirLayout,
        inserirWeek
    }
    
}