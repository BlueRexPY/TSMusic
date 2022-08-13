import React, { useState } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { UseInput } from "@/hooks/useInput";
import axios from "axios";
import { DEFAULT_API } from "@/utils//apiLinks";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from '@/components/layout/Layout';

const CreateUser = () => {
  const router = useRouter();
  const name = UseInput("");
  const password = UseInput("");
  const repeatPassword = UseInput("");
  const regExp = "^[a-zA-Z]+$";
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (
      name.value.length <= 16 &&
      name.value.length >= 4 &&
      password.value.length <= 16 &&
      password.value.length >= 4 &&
      password.value == repeatPassword.value &&
      name.value.search(regExp) === 0 &&
      password.value.search(regExp) === 0
    ) {
      axios.get(DEFAULT_API + "users/try/" + name.value).then((resp) => {
        if (resp.data === true) {
          message.error("Error: a user with the same name already exists");
        } else {
          setLoading(true)
          axios.post(DEFAULT_API + "users/", {
            name: name.value,
            password: password.value,
          });
          message.success("Success");
          router.push("/login");
        }
      });
    } else {
      message.error("Error: max length - 16, min - 4, only Latin can be used");
    }
  };
  if(!loading){
    return (
      <Layout title="Login" >
        <div className="h300 w400 paper col b20 big" id="aCenter">
          <Form
            className="h250 w400 col jc_sb"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={login}
            autoComplete="off"
          >
            <h1 className="fs_32 gray">Create new account</h1>
            <Form.Item
              className="col"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input
                placeholder="name"
                maxLength={16}
                minLength={4}
                className="w200"
                {...name}
              />
            </Form.Item>
            <Form.Item
              className="col"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                maxLength={16}
                minLength={4}
                placeholder="password"
                {...password}
              />
            </Form.Item>
            <Form.Item
              className="col"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                maxLength={16}
                minLength={4}
                placeholder="repeat password"
                {...repeatPassword}
              />
            </Form.Item>
  
            <Form.Item className="col">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Form.Item className="col">
              <Link href={"/login"}>
                <a>
                  <p className="gray">or login</p>
                </a>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    );
  }else{
    return(
      <div className="w300 h300 col">
        <Spin/>
      </div>
    )
  }
};

export default CreateUser;
