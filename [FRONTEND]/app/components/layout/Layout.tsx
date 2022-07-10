import { FC, ReactChild, ReactNode } from 'react'
import styles from './Layout.module.css'
import MusicBar from './musicBar/MusicBar';
import Navigation from './navigation/Navigation'

type Props={
  children: ReactChild | ReactNode;
}
const Layout = (props:Props) => {
  return (
    <div>
        <Navigation/>
        <MusicBar/>
        <div>
            {props.children}
        </div>

    </div>
  )
}

export default Layout