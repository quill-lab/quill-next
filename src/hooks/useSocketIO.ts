import { useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import eventBus from '@/shared/utils/eventBus';
import LocalStorage from '@/shared/utils/LocalStorage';
import { config } from '@/config/config';
import { storageKey } from '@/constants';

interface useSocketIOOption {
  url: string | undefined;
  onNewChat?(data: any): void;
  onUpdateChat?(data: any): void;
  onChangeWriterSeq?(data: any): void;
  onKickUser?(data: any): void;
}

export default function useSocketIO({
  url,
  onChangeWriterSeq,
  onKickUser,
  onNewChat,
  onUpdateChat,
}: useSocketIOOption) {
  const sock: Socket | null = useMemo(() => {
    if (!url) {
      console.warn('Socket URL is undefined or invalid.');
      return null;
    }

    return io(url, {
      autoConnect: false,
      auth: {
        accessToken: `${LocalStorage.getItem(storageKey)}`,
      },
      transports: ['websocket'],
      reconnection: false,
    });
  }, [url]);

  const newChat = (res: any) => {
    eventBus.emit(config.socketEventNM.newChat, res);
    onNewChat?.(res);
  };

  const updateChat = (res: any) => {
    eventBus.emit(config.socketEventNM.updateChat, res);
    onUpdateChat?.(res);
  };

  const changeWriterSeq = (res: any) => {
    eventBus.emit(config.socketEventNM.changeWriterSeq, res);
    onChangeWriterSeq?.(res);
  };

  const exitWriter = (res: any) => {
    eventBus.emit(config.socketEventNM.exitWriter, res);
    onKickUser?.(res);
  };

  const connect = () => {
    if (!sock) return;

    sock.on(config.socketEventNM.newChat, newChat);
    sock.on(config.socketEventNM.updateChat, updateChat);
    sock.on(config.socketEventNM.changeWriterSeq, changeWriterSeq);
    sock.on(config.socketEventNM.exitWriter, exitWriter);

    sock.connect();
  };

  const disconnect = () => {
    if (!sock) return;

    sock.removeAllListeners();
    sock.disconnect();
  };

  useEffect(() => {
    if (!sock) return;

    sock.on('connect', connect);

    return () => {
      if (sock?.connected) {
        disconnect();
      }
    };
  }, [sock]);

  useEffect(() => {
    return () => {
      if (sock?.connected) {
        disconnect();
      }
    };
  }, [sock]);
}
