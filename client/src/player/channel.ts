type hcb = (data:any) => void;

const channel = <T>() => {
  
  let handlers: hcb[] = [];
  
  const subscribe = (handler:hcb) => {
    handlers.push(handler);
    return () => {
      handlers = handlers.filter(i => i != handler)
    }
  }

  const push = (data:T) => handlers.forEach( i => i(data));

  return {
    subscribe,
    push
  }
}

export const createChannel = <T>() => channel<T>()
export interface IChannel<T> {
  subscribe: (callback: hcb) => () => void;
  push: (data:T) => void;
}

export enum ChannelPlayerEvent {
  play = 1,
  stop
}