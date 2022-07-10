import StepWrapper from '@/components/layout/TrackCreator/StepWrapper'
import { Button, Input, Upload } from 'antd'
import React, { useState } from 'react'
import FileUploader from '../../app/components/layout/TrackCreator/FileUploader';

type Props={
}
const Create = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0)

  const [track, setTrack] = useState(
    {
    title: "",
    author:""
    
    }
  )

  


  const toNext = () => {
    if(currentStep!==2){
      setCurrentStep(prev => prev +1)
    }
  }
  const toBack = () => {setCurrentStep(prev => prev -1)}

  return (
    <StepWrapper currentStep = {currentStep} steps={["Info","Audio","Photo"]}>
      {currentStep===0&&
        <div className='col w300 h100 jc_sa big'>
          <Input placeholder="Title" onChange={(e) => setTrack({...track,title : e.target.value})}/>
          <Input placeholder="Author" onChange={(e) => setTrack({...track,author : e.target.value})}/>
        </div>
      }
      {currentStep===1&&
        <>
          <p className="fs_20 gray">Audio</p>
          <FileUploader maxCount={1} setFile={()=>{}} acceptFile={"audio/*"}/>
        </>
      }
      {currentStep===2&&
        <>
          <p className="fs_20 gray">Photo</p>
          <FileUploader maxCount={1} setFile={()=>{}} />
        </>
      }
      <div className='row jc_sa w150 big'>
        <Button disabled={currentStep===0} onClick={toBack}>Back</Button>
        <Button onClick={toNext}type="primary">Next</Button>
      </div>
    </StepWrapper>
  )
}

export default Create