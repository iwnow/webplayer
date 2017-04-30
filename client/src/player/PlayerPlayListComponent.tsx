import * as React from 'react';

import {IChannel, ChannelPlayerEvent} from './channel';
import {Track} from './models';
import {BtnUploadFiles} from './btnUploadFile';
import {colors} from './colors';

export interface IPlayerPlayListComponentProps extends IPlayerApiProvider {
  channel?: IChannel<ChannelPlayerEvent>;
}

export interface IPlayerApiProvider {
  getTrackList?: () => Promise<Track[]>;
  uploadNewTracks?: (track: File) => Promise<boolean>;
  deleteTrack?: (track: Track) => Promise<boolean>;
  selectedTrack?: Track;
  playing?: boolean;
  onSelectTrack?: (track:Track) => void;
}

export interface IPlayerPlayListComponentState {
  tracks?: Track[];
  showModal?: boolean;
  uploadFile?: File;
}

export class PlayerPlayListComponent extends React.Component<IPlayerPlayListComponentProps,IPlayerPlayListComponentState> {
  constructor(p:any) {
    super(p);
    this.state = {
      tracks: []
    }
  }

  async componentWillMount() {
    await this.updateTracks();
  }

  async updateTracks() {
    if (this.props.getTrackList)
      this.setState({
        tracks: await this.props.getTrackList()
      });
  }

  error(msg: any) {
    console && console.error(msg);
  }

  log(msg: any) {
    console && console.log(msg);
  }

  async uploadTrack(file: File) {
    try {
      this.props.uploadNewTracks && await this.props.uploadNewTracks(file);
      await this.updateTracks();
    } catch (e) {
      this.error(e);
    }
  }
  
  getFileMb(file:File) {
    if (!file) return 0;
    return file.size / (1024*1024);
  }

  getTrackListView() {
    return this.state.tracks.map(i => <PlaylistItem key={i.id} 
      playing={this.props.playing && this.props.selectedTrack && this.props.selectedTrack.id == i.id}
      onDeleteClick={async () => {
        if (confirm(`Удалить ${i.name}?`))
        if (this.props.deleteTrack)
            if (await this.props.deleteTrack(i))
              this.updateTracks();
      }}
      onBtnPlayStopClick={() => {
        this.props.onSelectTrack && this.props.onSelectTrack(i);
      }}
      track={i} />);
  }

  render() {
    let fileText = this.getFileMb(this.state.uploadFile) > 200 ? 
      'файл превышает 200 мб' : this.state.uploadFile && this.state.uploadFile.name;
    return (
      <div>
        <div style={{
            borderBottom: `${colors.azure} 1px solid`,
            paddingRight: "2px"
          }}>
          &nbsp;
          <span className="pull-right fa fa-plus"
            onClick={() => this.setState({ showModal: true})}
            style={{ cursor: 'pointer'}}
            ></span>
        </div>
        <div style={{height:'1px'}}>&nbsp;</div>
        
        {this.getTrackListView()}

        <ModalBox show={this.state.showModal} 
          fileName={fileText}
          onPickFile={(files) => {
            if (files[0]) {
              let sizeInMB = this.getFileMb(files[0]);
              if (sizeInMB > 200) {
                this.error(`file size is ${sizeInMB} MB`);
                return;
              }
              this.log(`file size is ${sizeInMB} MB`);
              this.setState({
                uploadFile: files[0]
              });
            }
          }}
          onOk={async () => {
            this.setState({ showModal: false})
            if (this.state.uploadFile) {
              await this.uploadTrack(this.state.uploadFile);
              this.setState({
                uploadFile: null
              });
            }
          }}
          onClose={() => this.setState({ showModal: false})}/>
        
      </div>
    );
  }
}

interface IPlaylistItemProps {
  track: Track;
  playing?: boolean;
  onBtnPlayStopClick?: () => void;
  onDeleteClick?: () => void;
}

const PlaylistItem =(props: IPlaylistItemProps) => (
  <div style={{
      marginTop: '3px'
    }}>
    <div className='pull-left' style={{
      cursor:'pointer'
    }} onClick={() => props.onBtnPlayStopClick && props.onBtnPlayStopClick()}>
        <span className={props.playing ? 'fa fa-stop' : 'fa fa-play'}></span>
    </div>
    &nbsp;&nbsp;
    <span>{props.track.name}</span>
    <span className='fa fa-trash pull-right' 
      style={{
        marginRight:'2px', 
        cursor:'pointer'
        }} 
      onClick={() => props.onDeleteClick && props.onDeleteClick()}></span>
  </div>
);

interface IModalBoxProps {
  show?: boolean;
  fileName?: string;
  onClose?: () => void;
  onPickFile?: (files: File[]) => void;
  onOk?: () => void;
}

const ModalBox = (props: IModalBoxProps) => (
  <div style={{
    visibility: props.show ? 'visible' : 'hidden',
    position: 'absolute',
    left: 0,
    top: 0,
    width:'100%',
    height:'100%',
    zIndex: 1000
  }}>
  <div className="modal fade in" style={{
    display: props.show ? 'block' : 'none'
  }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" 
            data-dismiss="modal" aria-hidden="true"
            onClick={() => props.onClose && props.onClose()}
            >&times;</button>
          <h5 className="modal-title">Выберите аудиозапись на Вашем компьютере</h5>
        </div>
        <div className="modal-body">
            <div>Ограничения</div>
            <div>
              <ul>
                <li>Аудиофайл не должен превышать 200мб и должен быть в формате MP3</li>
                <li>Аудиофайл не должен нарушать авторсике права</li>
              </ul>
            </div>
            <BtnUploadFiles accept="audio/mpeg" 
              text="Выберите файл" iconClass="fa fa-upload" labelClass="btn btn-success" 
              onChoose={(files) => {
                props.onPickFile && props.onPickFile(files);
              }}
              />
              {props.fileName}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" 
            onClick={() => props.onClose && props.onClose()}
            data-dismiss="modal">CANCEL</button>
          <button type="button" className="btn btn-primary" 
            onClick={() => props.onOk && props.onOk()}
            data-dismiss="modal">OK</button>
        </div>
      </div>
    </div> 
  </div>
</div>


);