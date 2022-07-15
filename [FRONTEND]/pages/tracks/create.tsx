import StepWrapper from "@/layout/TrackCreator/StepWrapper";
import { Button, Input, Upload } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FileUploader from "@/layout/TrackCreator/FileUploader";
import { UseInput } from "@/hooks/useInput";
import axios from "axios";
import { DEFUALT_API } from "@/utils//apiLinks";
import Layout from "@/components/layout/Layout";

type Props = {};
const Create = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [audio, setAudio] = useState([{ originFileObj: "" }]);
  const [photo, setPhoto] = useState([{ originFileObj: "" }]);
  const name = UseInput("");
  const artist = UseInput("");
  const router = useRouter();

  const toNext = () => {
    if (currentStep !== 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("picture", photo[0].originFileObj);
      formData.append("audio", audio[0].originFileObj);
      axios
        .post(DEFUALT_API + "tracks", formData)
        .then((resp) => router.push("/tracks"))
        .catch((e) => console.log(e));
    }
  };

  const toBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <Layout title="create">
      <StepWrapper currentStep={currentStep} steps={["Info", "Audio", "Photo"]}>
        {currentStep === 0 && (
          <div className="col w300 h100 jc_sa big">
            <Input placeholder="Title" {...name} />
            <Input placeholder="Author" {...artist} />
          </div>
        )}
        {currentStep === 1 && (
          <>
            <p className="fs_20 gray">Audio</p>
            <FileUploader
              maxCount={1}
              setFile={setAudio}
              acceptFile={"audio/*"}
            />
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
              (currentStep === 0 && artist.value == "") ||
              (currentStep === 1 && audio == [{ originFileObj: "" }]) ||
              (currentStep === 2 && photo == [{ originFileObj: "" }])
            }
            type="primary"
          >
            Next
          </Button>
        </div>
      </StepWrapper>
    </Layout>
  );
};

export default Create;
