import Link from 'next/link'
import React from 'react'
import logoImg from '@/assets/img/logo.svg'
import Image from 'next/image'
type Props = {}

const LogoIcon = (props: Props) => {
  return (
    <div>
       
      <Link href={"/"}>
        <a>
          <Image src={logoImg} width={50} height={50} alt="tsmusic" draggable={false}/>
        </a>
      </Link>
    </div>
  )
}

export default LogoIcon