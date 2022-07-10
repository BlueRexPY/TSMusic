import { PlusOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useRef, useState } from 'react';

type Props={
  maxCount?:number,
  setFile: Function,
  acceptFile?:string
}

const FileUploader = (props: Props) => {
  const {maxCount=1, acceptFile="image/*"} = props

  const handleChange: UploadProps['onChange'] = ({ fileList: newFile}) => props.setFile(newFile);

  return (
  <Dragger maxCount={maxCount} accept={acceptFile} onChange={handleChange}>
      <div className='w400 h150 col'>
      <PlusOutlined />
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </div>
  </Dragger>
  );
};

export default FileUploader;