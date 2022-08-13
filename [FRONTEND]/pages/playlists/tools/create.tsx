import StepWrapper from "@/components/layout/TrackCreator/StepWrapper";
import { Button, Input, Select, message, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useState, useLayoutEffect } from "react";
import FileUploader from "@/components/layout/TrackCreator/FileUploader";
import { UseInput } from "@/hooks/useInput";
import axios from "axios";
import { DEFAULT_API } from "@/utils//apiLinks";
import Layout from "@/components/layout/Layout";
import { useStores } from "@/hooks/useStore";
import Link from "next/link";
import { Option } from "antd/lib/mentions";

const Create = () => {
  const { NavStore } = useStores();
  NavStore.setPath("PLAYLIST")
  const { AuthStore } = useStores();
  const [currentStep, setCurrentStep] = useState(0);
  const [photo, setPhoto] = useState([{ originFileObj: "" }]);
  const [newTrackList, setNewTrackList] = useState<string[]>([]);
  const { TracksStore } = useStores();
  const { tracksList } = TracksStore;
  const [loading, setLoading] = useState(false);
  const regExp = "^[a-zA-Z]+$";

  const name = UseInput("");
  const author = AuthStore.AuthSettings.name;
  const router = useRouter();

  const toNext = () => {
    if (currentStep !== 2) {
      if(name.value.search(regExp) === 0 && name.value.length <= 16 &&
      name.value.length >= 4){
        setCurrentStep((prev) => prev + 1);
      }else{
        message.error("Error: max length - 16, min - 4, only Latin can be used");
      }

    } else {
      const formData = new FormData();
      setLoading(true)
      formData.append("name", name.value);
      formData.append("author", author);
      formData.append("picture", photo[0].originFileObj);
      formData.append("tracks", newTrackList.join(" "));
      axios
        .post(DEFAULT_API + "albums", formData)
        .then((resp) => router.push("/playlists/" + name.value))
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
    TracksStore.fetchTracks();
  }, []);

  if(!loading) {
    return (
      <Layout title="Create">
        <StepWrapper
          currentStep={currentStep}
          steps={["Info", "Audio", "Photo"]}
        >
          {currentStep === 0 && (
            <div className="col w300 h100 jc_sa big">
              <Input placeholder="Title" {...name} id="inputText"/>
            </div>
          )}
          {currentStep === 1 && (
            <>
              <p className="fs_20 gray">Tracks</p>
              <Select
                mode="multiple"
                allowClear
                className="big"
                style={{ width: "60%" }}
                placeholder="Please select"
                onChange={handleChange}
              >
                {tracksList.map((i) => (
                  <Option key={i._id}>{i.name}</Option>
                ))}
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
    );
  }else if(loading){
    return (
      <Layout title="create">
        <div className="w300 h300 col big">
          <Spin/>
        </div>
      </Layout>
    );
  }else{
    return(
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
    )
  }
};
export default Create;
