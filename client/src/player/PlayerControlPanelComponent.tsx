import * as React from 'react';

import {IChannel} from './channel';

export interface IPlayerControlPanelComponentProps {
  channel?: IChannel;
}

export interface IPlayerControlPanelComponentState {
  test: number;
}

export class PlayerControlPanelComponent extends React.Component<IPlayerControlPanelComponentProps,IPlayerControlPanelComponentState> {
  constructor(p:any) {
    super(p);
    this.state = {
      test: 0
    }
  }

  unsubscribe: () => void;

  componentDidMount() {
    this.unsubscribe = this.props.channel && this.props.channel.subscribe(data => {
      this.setState({
        test: this.state.test + data
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    return (
      <div>
        control panel
        <div>{this.state.test}</div>
      </div>
    );
  }
}