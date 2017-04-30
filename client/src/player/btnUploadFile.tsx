import * as React from 'react';

export interface IBtnUploadFilesProps {
  onChoose?: (files: File[]) => void;
  isMultiple?: boolean;
  accept?: string;
  labelClass?: string;
  iconClass?: string;
  disabled?: boolean;
  text?: string;
  title?: string;
}

export const BtnUploadFiles = (props: IBtnUploadFilesProps) => {
    return (
      <label className={props.labelClass} title={props.title}>
          <input type="file" accept={props.accept} disabled={props.disabled} multiple={props.isMultiple}
              onChange={(e:any) => {
                  props.onChoose && props.onChoose(e.target && e.target.files);
                  e.target.value = "";
              }}                            
              style={{
                  position: 'fixed',
                  left: '-1000px'
              }}/>
          <span className={props.iconClass}></span>&nbsp;{props.text ? `${props.text}` : ''}
      </label> 
    );
}