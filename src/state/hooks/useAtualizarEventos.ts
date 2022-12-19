import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

const useAtualizarEvento = () => {
    const setListaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
    return (evento: IEvento) => {
        return setListaEventos(listaAntiga => {
            const i  = listaAntiga.findIndex(e => e.id ===  evento.id )
            return [...listaAntiga.slice(0,i) , evento, ...listaAntiga.slice(i+1)]
          })
    }
}

export default useAtualizarEvento;