export interface channel {
  id: number,
  name:string
}

export interface initType {
  userChannel: channel[],
  allChannel:channel[]
} 


export type HomeAction = {
  type: "save/userChannel" |'save/allChannel';
  payload: channel;
};


