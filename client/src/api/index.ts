import 'whatwg-fetch';
import {Track} from '../player/models';

function checkStatus(response:any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    (error as any).response = response;
    throw error;
  }
}

const fetchEx = (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, init).then(checkStatus);
}

export const api = {
  getTrackList: (): Promise<Track[]> => {
    return new Promise<Track[]>((res,rej) => {
      fetchEx('/api/playlist')
        .then(response => response.json())
        .then(json => res(json))
        .catch(rej);
    });
  },
  uploadNewTracks: (file: File): Promise<boolean> => {
    return new Promise<boolean>((res,rej) => {
      if ((window as any).FormData === undefined)
        rej("Браузер не поддерживает HTML5 загрузку файлов (FormData is undefined)");
      const data = new FormData();
      data.append(file.name, file, file.name);
      const headers = new Headers();
      //headers.append("Content-Type", "multipart/form-data");
      fetchEx('/api/playlist', {
        method: 'POST',
        headers: headers,
        body: data
      })
      .then(response => response.json())
      .then(json => res(json))
      .catch(rej);
    });
  },
  deleteTrackById: (id:number):Promise<boolean> => {
    return new Promise<boolean>((res,rej) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json",);
      fetchEx('/api/playlist', {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(id)
      })
      .then(response => response.json())
      .then(json => res(json))
      .catch(rej);
    });
  }
}

