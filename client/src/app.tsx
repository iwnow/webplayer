import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {PlayerComponent} from './player';
import {api} from './api';

const render = () =>
  ReactDOM.render(
    <PlayerComponent 
      getTrackList={api.getTrackList} 
      uploadNewTracks={api.uploadNewTracks}
      deleteTrack={(track) => api.deleteTrackById(track.id)} />, 
    document.getElementById('app'));

render();

export const app = {
  render
}
