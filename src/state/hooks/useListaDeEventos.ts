import { useRecoilValue } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

const useListaDeEventos = () => {
    return useRecoilValue<IEvento[]>(listaDeEventosState);
}

export default useListaDeEventos;