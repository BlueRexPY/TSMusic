import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UseInput } from '@/hooks/useInput';
import Head from 'next/head';
import axios from 'axios';
import { DEFUALT_API } from '@/utils//apiLinks';
import { useRouter } from 'next/router';
import { useStores } from '@/hooks/useStore';
import { useCookies } from 'react-cookie';

const login = () => {
    const router = useRouter();
    const name = UseInput("");
    const password = UseInput("");
    const { AuthStore } = useStores();
    const [cookies, setCookie] = useCookies(['user']);

    const login = () =>{
        if((name.value.length <= 16) && (name.value.length >= 4) && (password.value.length <= 16) && (password.value.length >= 4)){
            axios.post(DEFUALT_API+'users/login/', { name: name.value, password: password.value})
            .then((resp) => {
                if(resp.data.length>0){
                    AuthStore.Login(name.value)
                    message.success("Success")
                    router.push("profile/name")
                }else{
                    console.log(resp.data)
                    message.error("Error: the user was not found, perhaps the password or username is incorrect")
                }
            })
        }else{
            message.error("Error: max length - 16, min - 4")
        } 
    }
  return (
    <>
    <Head>
        <title>{`TSMusic - Login`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <div className='h300 w400 paper col b20 big'>
        <Form
        className='h200 w400 col jc_sb'
        name="basic"
        initialValues={{ remember: true }}
        onFinish={login}
        autoComplete="off"
        >
            <h1 className='fs_32 gray'>Welcome Back</h1>
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input {...name}/>
            </Form.Item>
            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password {...password}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>

        </Form>
    </div>
    </>
  )
}

export default login