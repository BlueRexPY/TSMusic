import React,{useState} from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { UseInput } from '@/hooks/useInput';
import Head from 'next/head';
import axios from 'axios';
import { DEFUALT_API } from '@/utils//apiLinks';
import { useRouter } from 'next/router';
import { useStores } from '@/hooks/useStore';
import Link from 'next/link';

const login = () => {
    const router = useRouter();
    const name = UseInput("");
    const password = UseInput("");
    const [rememberMe,setRememberMe] = useState(true);
    
    const { AuthStore } = useStores();

    const regExp = '^[a-zA-Z]+$';

    const login = () =>{
        if((name.value.length <= 16) && (name.value.length >= 4) && (password.value.length <= 16) && (password.value.length >= 4) && (name.value.search(regExp)===0)&& (password.value.search(regExp)===0)){
            axios.post(DEFUALT_API+'users/login/', { name: name.value, password: password.value})
            .then((resp) => {
                if(resp.data){
                    if(rememberMe){
                        localStorage.setItem('userName', resp.data.name);
                        localStorage.setItem('userPassword', password.value);
                    }else{
                        localStorage.clear()
                    }
                    AuthStore.Login(resp.data.name,resp.data.roles)
                    message.success("Success")
                    router.push("profile/"+name.value)
                }else{
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
        className='h250 w400 col jc_sb'
        name="basic"
        initialValues={{ remember: true }}
        onFinish={login}
        autoComplete="off"
        >
            <h1 className='fs_32 gray'>Welcome Back</h1>
            <Form.Item
            className='col'
            rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input maxLength={16} minLength={4} placeholder="name" {...name}/>
            </Form.Item>
            <Form.Item 
            className='col'
            rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password maxLength={16} minLength={4} placeholder="password" {...password}/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" className='col'>
                <Checkbox onChange={()=>setRememberMe(!rememberMe)}>Remember</Checkbox>
            </Form.Item>
            <Form.Item className='col' >
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            <Form.Item className='col'>
                <Link href={"/login/create"}>
                    <a>
                        <p className='gray'>or create new</p>
                    </a>
                </Link>                
            </Form.Item>
        </Form>
    </div>
    </>
  )
}

export default login