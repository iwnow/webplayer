import * as React from 'react';

import {IChannel} from './channel';
import {Track} from './models';

export interface IPlayerPlayListComponentProps extends IPlayerApiProvider {
  channel?: IChannel;
}

export interface IPlayerApiProvider {
  getTrackList?: () => Promise<Track[]>;
  uploadNewTracks?: (track: File) => Promise<boolean>;
}

export interface IPlayerPlayListComponentState {
  tracks: Track[];
}

export class PlayerPlayListComponent extends React.Component<IPlayerPlayListComponentProps,IPlayerPlayListComponentState> {
  constructor(p:any) {
    super(p);
    this.state = {
      tracks: []
    }
  }

  async componentWillMount() {
    this.setState({
      tracks: await this.props.getTrackList()
    }, () => console.log(this.state.tracks));
  }
  
  render() {
    return (
      <div>
        {this.state.tracks.map(i => <div>{i.name}</div>)}

        <div>
          <input type="file" 
            accept="audio/mpeg"
            onChange={(e:any) => {
              const file:File = e.target && e.target.files[0];
              console.log(file);
              this.props.uploadNewTracks(file).then(console.log).catch(console.error);
            }}/>
        </div>
        <audio id='audio1' src="audio/be6b95a9_intro+track1.mp3"></audio>
      </div>
    );
  }
}