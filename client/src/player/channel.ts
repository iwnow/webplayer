type hcb = (data:any) => void;

const channel = () => {
  
  let handlers: hcb[] = [];
  
  const subscribe = (handler:hcb) => {
    handlers.push(handler);
    return () => {
      handlers = handlers.filter(i => i != handler)
    }
  }

  const push = (data:any) => handlers.forEach( i => i(data));

  return {
    subscribe,
    push
  }
}

export const createChannel = () => channel()
export interface IChannel {
  subscribe: (callback: hcb) => () => void;
  push: (data:any) => void;
}