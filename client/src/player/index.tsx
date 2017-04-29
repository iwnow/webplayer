import * as React from 'react';
import {PlayerControlPanelComponent} from './PlayerControlPanelComponent';
import {PlayerPlayListComponent, IPlayerApiProvider} from './PlayerPlayListComponent';
import {Track} from './models';
import {createChannel} from './channel';

interface IPlayerComponentProps extends IPlayerApiProvider {
}

const channelRoot = createChannel();

const PlayerComponent = (props: IPlayerComponentProps) =>
  <div>
    <PlayerControlPanelComponent
      channel={channelRoot}/>
    <PlayerPlayListComponent 
      getTrackList={props.getTrackList}
      uploadNewTracks={props.uploadNewTracks}
      channel={channelRoot}/>
  </div>
  
export {
  Track,
  IPlayerComponentProps,
  PlayerComponent
}


