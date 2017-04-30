import * as React from 'react';
import {PlayerControlPanelComponent} from './playerControlPanelComponent';
import {PlayerPlayListComponent, IPlayerApiProvider} from './playerPlayListComponent';
import {Track} from './models';
import {createChannel, ChannelPlayerEvent} from './channel';

export interface IPlayerComponentProps extends IPlayerApiProvider {
}
export interface IPlayerComponentState {
  currentTrack?: Track;
  playing?: boolean;
}

const channelRoot = createChannel<ChannelPlayerEvent>();

export class PlayerComponent extends React.Component<IPlayerComponentProps, IPlayerComponentState> {
  constructor(p:any) {
    super(p);
    this.state = {
      currentTrack: null,
      playing: false
    }
  }

  syncAudio() {
    if (this.state.playing)
      channelRoot.push(ChannelPlayerEvent.play);
    else 
      channelRoot.push(ChannelPlayerEvent.stop);
  }

  render() {
    return (
      <div className="container" style={{maxWidth:'500px'}}>
        <div className="row">

          <PlayerControlPanelComponent
            playing={this.state.playing}
            track={this.state.currentTrack}
            onPlayClick={() => this.setState({playing: !this.state.playing}, () => this.syncAudio())}
            channel={channelRoot}
            />

          <PlayerPlayListComponent 
            getTrackList={this.props.getTrackList}
            uploadNewTracks={this.props.uploadNewTracks}
            deleteTrack={this.props.deleteTrack}
            onSelectTrack={(track) => {
                const id = this.state.currentTrack && this.state.currentTrack.id;
                if (id == track.id) {
                  this.setState({
                    playing: !this.state.playing
                  }, () => this.syncAudio());
                }
                else {
                  this.setState({
                    playing: true,
                    currentTrack: track
                  }, () => this.syncAudio());
                }
              }}
            playing={this.state.playing}
            selectedTrack={this.state.currentTrack}
            />

        </div>
      </div>
    );
  }
}


