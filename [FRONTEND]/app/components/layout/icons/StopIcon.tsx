import Link from 'next/link'
import React from 'react'
import logoImg from '@/assets/img/stop.svg'
import Image from 'next/image'
type Props = {}

const StopIcon = (props: Props) => {
  return (
    <>
      <Image src={logoImg} width={50} height={50} alt="Stop" draggable={false}/>
    </>
  )
}

export default StopIcon