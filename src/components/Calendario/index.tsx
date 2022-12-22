
import React, { useEffect, useState } from 'react'
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
import useAtualizarEvento from '../../state/hooks/useAtualizarEventos';
import useListaDeEventos from '../../state/hooks/useListaDeEventos';
import { IEvento } from '../../interfaces/IEvento';

interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}
interface ITeste {
  id: any;
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  timezoneEndAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

const Calendario: React.FC = () => {
  const eventosKalend = new Map<string, IKalendEvento[]>();
  const atualizarEvento = useAtualizarEvento();

  const eventos = useListaDeEventos();

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    })
  })

  const [teste, setTeste] = useState<ITeste>({
    id: 123213,
  startAt: '2022-12-20',
  endAt: '2022-12-20',
  timezoneStartAt: '2022-12-20',
  timezoneEndAt: '2022-12-20',
  summary: '2022-12-20',
  color: 'blue',
  key: 'key'
  });

  const onEventDragFinish: OnEventDragFinish = (
    kalendEventoInalterado: CalendarEvent,
    KalendEventoAtualizado: CalendarEvent,
  ) => {
    const evento = {
      id: KalendEventoAtualizado.id,
      descricao: KalendEventoAtualizado.summary,
      inicio: new Date(KalendEventoAtualizado.startAt),
      fim: new Date(KalendEventoAtualizado.endAt)
    } as IEvento
    atualizarEvento(evento)
  };

  return (
    <div className={style.Container}>
      {eventos && 
        <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
        />
      }
    </div>
  );
}

export default Calendario