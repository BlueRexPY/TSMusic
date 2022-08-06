import StepWrapper from "@/components/layout/TrackCreator/StepWrapper";
import { Button, Input, Select } from "antd";
import { useRouter } from "next/router";
import React, { useState,useLayoutEffect } from "react";
import FileUploader from "@/components/layout/TrackCreator/FileUploader";
import { UseInput } from "@/hooks/useInput";
import axios from "axios";
import { DEFUALT_API } from "@/utils//apiLinks";
import Layout from "@/components/layout/Layout";
import { useStores } from "@/hooks/useStore";
import Link from "next/link";
import { Option } from "antd/lib/mentions";

const Create = () => {
  const { AuthStore } = useStores();
  const [currentStep, setCurrentStep] = useState(0);
  const [photo, setPhoto] = useState([{ originFileObj: "" }]);
  const [newTrackList, setNewTrackList] = useState<string[]>([]);
  const { TracksStore } = useStores();
  const { tracksList } = TracksStore;

  const name = UseInput("");
  const artist = AuthStore.AuthSettings.name
  const router = useRouter();

  const toNext = () => {
    if (currentStep !== 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist);
      formData.append("picture", photo[0].originFileObj);
      formData.append("tracks", newTrackList.join(' '));
      axios
        .post(DEFUALT_API + "albums", formData)
        .then((resp) => router.push("/playlists"))
        .catch((e) => console.log(e));
    }
  };

  const toBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (value: string[]) => {
    setNewTrackList(value);
  };

  useLayoutEffect(() => {
    TracksStore.feachTracks();
  }, []);



  if(1===1){
    return (
      <Layout title="create">
        <StepWrapper currentStep={currentStep} steps={["Info", "Audio", "Photo"]}>
          {currentStep === 0 && (
            <div className="col w300 h100 jc_sa big">
              <Input placeholder="Title" {...name}/>
            </div>
          )}
          {currentStep === 1 && (
            <>
              <p className="fs_20 gray">Tracks</p>
              <Select
                mode="multiple"
                allowClear
                className="big"
                style={{ width: '60%' }}
                placeholder="Please select"
                onChange={handleChange}>
                {tracksList.map(i=><Option key={i._id}>{i.name}</Option>)}
                </Select>
            </>
          )}
          {currentStep === 2 && (
            <>
              <p className="fs_20 gray">Photo</p>
              <FileUploader maxCount={1} setFile={setPhoto} />
            </>
          )}
          <div className="row jc_sa w150 big">
            <Button disabled={currentStep === 0} onClick={toBack}>
              Back
            </Button>
            <Button
              onClick={toNext}
              disabled={
                (currentStep === 0 && name.value == "") ||
                (currentStep === 1 && newTrackList.length <= 1) ||
                (currentStep === 2 && photo == [{ originFileObj: "" }])
              }
              type="primary"
            >
              Next
            </Button>
          </div>
        </StepWrapper>
      </Layout>
    )
  }
  else{
    return(
      <Layout title="create">
        <div className="w300 h300 col big">
          <Link href={"/"}>
              <a>
                  <p className='gray'>you do not have access to this page, go back</p>
              </a>
          </Link>   
        </div>
      </Layout>
    )
  }
  }
export default Create;
