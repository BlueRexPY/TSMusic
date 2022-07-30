import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UseInput } from '@/hooks/useInput';
import Head from 'next/head';
import axios from 'axios';
import { DEFUALT_API } from '@/utils//apiLinks';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CreateUser = () => {
    const router = useRouter();
    const name = UseInput("");
    const password = UseInput("");
    const repeatPassword = UseInput("");

    const login = () =>{
        if((name.value.length <= 16) && (name.value.length >= 4) && (password.value.length <= 16) && (password.value.length >= 4) &&(password.value == repeatPassword.value)){
            axios.post(DEFUALT_API+'users/login/', { name: name.value, password: password.value})
            .then((resp) => {
                if(resp.data.length>0){
                    message.error("Error: entered an incorrect password or a user with the same name already exists")
                }else{
                    axios.post(DEFUALT_API+'users/', { name: name.value, password: password.value})
                    message.success("Success")
                    router.push("/login")
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
        className='h250 w400 col jc_sb'
        name="basic"
        initialValues={{ remember: true }}
        onFinish={login}
        autoComplete="off"
        >
            <h1 className='fs_32 gray'>Create new account</h1>
            <Form.Item
            className='col'
            rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input  placeholder="name" className='w200' {...name}/>
            </Form.Item>
            <Form.Item 
            
            className='col'
            rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="password" {...password}/>
            </Form.Item>
            <Form.Item 
            
            className='col'
            rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="repeat password" {...repeatPassword}/>
            </Form.Item>

            <Form.Item className='col' >
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            <Form.Item className='col'>
                <Link href={"/login"}>
                    <a>
                        <p className='gray'>or login</p>
                    </a>
                </Link>                
            </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default CreateUser