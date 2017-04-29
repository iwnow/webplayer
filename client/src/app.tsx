import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {PlayerComponent} from './player';
import {api} from './api';

const render = () =>
  ReactDOM.render(
    <PlayerComponent 
      getTrackList={api.getTrackList} 
      uploadNewTracks={api.uploadNewTracks} />, 
    document.getElementById('app'));

render();

export const app = {
  render
}
