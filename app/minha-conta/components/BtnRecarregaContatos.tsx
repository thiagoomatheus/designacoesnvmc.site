"use client"

import { FiRefreshCw } from "react-icons/fi";
import Btn from "./btn";
import { atualizarContatos } from "../actions/actions";
import toast from "react-hot-toast";

export default function BtnRecarregaContatos({instancia}: { instancia: string }) {

    const handleClick = async () => {
        atualizarContatos(instancia)
        .finally(() => {
            toast.success("Contatos sendo recarregados!")
        })
    }

    return (
        <Btn onClick={handleClick} className="self-center md:self-start flex items-center max-w-[250px] justify-center gap-2">
            <FiRefreshCw className="text-2xl" />
            Recarregar Contatos
        </Btn>
    )
}