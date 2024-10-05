import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import eventBus from 'util/eventBus';
import LocalStorage from 'util/LocalStorage';

import { config } from '@/config/config';
import { storageKey } from '@/constants';

interface useSocketIOOption {
  url: string;
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
  // const [sock, setSock] = useState<Socket | null>(null);
  const sock = useMemo(
    () =>
      io(url, {
        autoConnect: false,
        auth: {
          accessToken: `${LocalStorage.getItem(storageKey)}`,
        },
        transports: ['websocket'],
        reconnection: false,
        port: 3000,
      }),
    [url]
  );

  const newChat = (res: any) => {
    console.log(config.socketEventNM.newChat);
    eventBus.emit(config.socketEventNM.newChat, res);
    if (!onNewChat) {
      return;
    }
    onNewChat(res);
  };
  const updateChat = (res: any) => {
    console.log(config.socketEventNM.updateChat);
    eventBus.emit(config.socketEventNM.updateChat, res);
    if (!onUpdateChat) {
      return;
    }
    onUpdateChat(res);
  };
  const changeWriterSeq = (res: any) => {
    console.log(config.socketEventNM.changeWriterSeq);
    eventBus.emit(config.socketEventNM.changeWriterSeq, res);
    if (!onChangeWriterSeq) {
      return;
    }
    onChangeWriterSeq(res);
  };
  const exitWriter = (res: any) => {
    console.log(config.socketEventNM.exitWriter);
    eventBus.emit(config.socketEventNM.exitWriter, res);
    if (!onKickUser) {
      return;
    }
    onKickUser(res);
  };
  // useEffect(() => {
  //   setSock(
  //     io(url, {
  //       autoConnect: false,
  //       auth: {
  //         accessToken: `${LocalStorage.getItem(storageKey)}`,
  //       },
  //       transports: ['websocket'],
  //       reconnection: false,
  //       port: 3000,
  //     })
  //   );
  // }, [url]);
  const connect = () => {
    console.log('connect');
    if (!sock) {
      return;
    }
    sock.on(config.socketEventNM.newChat, newChat);

    sock.on(config.socketEventNM.updateChat, updateChat);

    sock.on(config.socketEventNM.changeWriterSeq, changeWriterSeq);

    sock.on(config.socketEventNM.exitWriter, exitWriter);
  };
  const disconnect = () => {
    console.log('out');
    if (!sock) {
      return;
    }
    sock.removeAllListeners();
    sock.disconnect();
    console.log(sock);
  };
  useEffect(() => {
    if (!sock) {
      return;
    }
    sock.connect();
    sock.on('connect', () => connect());
  }, [sock]);
  useEffect(
    () => () => {
      if (!sock) {
        console.log('socket null!!');
        return;
      }
      if (!sock.connected) {
        console.log('not connect!!');
        return;
      }
      disconnect();
    },
    []
  );
}
