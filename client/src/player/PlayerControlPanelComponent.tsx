import * as React from 'react';

import {IChannel, ChannelPlayerEvent} from './channel';
import {Track} from './models';

export interface IPlayerControlPanelComponentProps {
  channel?: IChannel<ChannelPlayerEvent>;
  track?: Track;
  playing?: boolean;
  onPlayClick?: () => void;
}

export interface IPlayerControlPanelComponentState {}

export class PlayerControlPanelComponent extends React.Component<IPlayerControlPanelComponentProps,IPlayerControlPanelComponentState> {
  constructor(p:any) {
    super(p);
  }

  unsubscribe: () => void;

  audioEl: HTMLAudioElement;

  componentDidMount() {
    this.unsubscribe = this.props.channel && this.props.channel.subscribe(data => {
      data = data as ChannelPlayerEvent;
      if (this.audioEl) {
        switch (data) {
          case ChannelPlayerEvent.play:
            this.audioEl.play();
            break;
          case ChannelPlayerEvent.stop:
            this.audioEl.pause();
            break;
          default:
            break;
        }
      }
    });
    this.props.playing && this.audioEl && this.audioEl.play();
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    let playClass = this.props.playing ? 'pull-left fa fa-stop' : 'pull-left fa fa-play';
    return (
      <div>
        <div style={{textAlign:'center'}}>{this.props.track && this.props.track.name || 'Аудиоплеер'}</div>
        <div> 
          <span className={playClass} style={{cursor:'pointer'}} 
            onClick={()=> this.props.track && this.props.onPlayClick && this.props.onPlayClick()}></span>
          &nbsp;
          <span className="pull-right fa fa-volume-up"></span>
        </div>
        {
          this.props.track && 
            <audio
              src={`audio/${this.props.track.pathName}`}
              ref={(audio) => { this.audioEl = audio; }}
              ></audio>
        }
        
      </div>
    );
  }
}