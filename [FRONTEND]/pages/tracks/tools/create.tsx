import StepWrapper from "@/components/layout/TrackCreator/StepWrapper";
import { Button, Input, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FileUploader from "@/components/layout/TrackCreator/FileUploader";
import { UseInput } from "@/hooks/useInput";
import axios from "axios";
import { DEFAULT_API } from "@/utils//apiLinks";
import Layout from "@/components/layout/Layout";
import { useStores } from "@/hooks/useStore";
import Link from "next/link";

const Create = () => {
  const { AuthStore } = useStores();
  const [currentStep, setCurrentStep] = useState(0);
  const [audio, setAudio] = useState([{ originFileObj: "" }]);
  const [photo, setPhoto] = useState([{ originFileObj: "" }]);
  const [loading, setLoading] = useState(false);
  const name = UseInput("");
  const artist = UseInput("");
  const router = useRouter();
  const { NavStore } = useStores();
  NavStore.setPath("TRACKS")

  const toNext = () => {
    if (currentStep !== 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setLoading(true)
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("picture", photo[0].originFileObj);
      formData.append("audio", audio[0].originFileObj);
      axios
        .post(DEFAULT_API + "tracks", formData)
        .then((resp) => router.push("/tracks"))
        .catch((e) => console.log(e));
    }
  };

  const toBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  if (AuthStore.AuthSettings.roles.includes("ADMIN")) {
    if (!loading) {
      return (
        <Layout title="create">
          <StepWrapper
            currentStep={currentStep}
            steps={["Info", "Audio", "Photo"]}
          >
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
    }
    if (loading) {
      return (
        <Layout title="create">
          <div className="w300 h300 col big">
            <Spin />
          </div>
        </Layout>
      );
    }
  } 
  return (
    <Layout title="create">
      <div className="w300 h300 col big">
        <Link href={"/"}>
          <a>
            <p className="gray">
              you do not have access to this page, go back
            </p>
          </a>
        </Link>
      </div>
    </Layout>
  );
};
export default Create;
