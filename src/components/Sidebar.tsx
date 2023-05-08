import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {TeamLogoStyled} from "../Popup/TeamLogoStyled";
import * as FaIcons from 'react-icons/fa'
import { SidebarData } from './SidebarData';
import ContactUsPopup from "../Popup/ ContactUsPopup";


const MenuIconOpen = styled(Link)`
    display: flex;
    justify-content: start;
    font-size: 1.5rem;
    margin-left: 1rem;
    margin-top: 1rem;
    color: black;
`

const MenuIconClose = styled(Link)`
    display: flex;
    justify-content: end;
    font-size: 1rem;
    margin-top: 0.75rem;
    margin-right: 1rem;
    color: black;
  &:hover {
    background-color: #c9c8c8 ;
    margin-left: 7.5rem;
    border-radius: 100%;
  } 
`

const SidebarMenu = styled.div<{close: boolean}>`
  z-index: 10;
    width: 150px;
    height: 100vh;
    background-color: #ECF2FF;
    position: fixed;
    top: 0;
    left: ${({ close}) => close ? '0' : '-100%'};
    transition: .6s;


`

const MenuItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 30px;
    padding: 1.5rem 0 0.8rem;
`
const MenuItemLinks = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 12px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #c9c8c8;
    color: #131212;
    width: 100%;
    height: 20px;
    text-align: center;
    border-radius: 10px;
    display: flex;
  }
`

const Sidebar: React.FunctionComponent = () => {
    const [close, setClose] = useState(false)
    const [poppedUp, setPoppedUp] = useState(false);
    const showSidebar = () => setClose(!close)
    return (
        <div>


                <MenuIconOpen to="#" onClick={showSidebar}>
                    <FaIcons.FaBars />
                </MenuIconOpen>
            <SidebarMenu close={close}>
                <MenuIconClose to="#" onClick={showSidebar} >
                    <FaIcons.FaTimes/>
                </MenuIconClose>
                <h3 style={{height:"-10px",width:"-8px",marginLeft:"15px",marginTop:"-25px",display:"flex",font:"caption"}}>SHAKED  </h3>
                {SidebarData.map((item, index) => {
                    return (
                        <MenuItems key={index}>
                            <MenuItemLinks to={item.path}>
                                {item.icon}
                                <span style={{marginLeft: '5px'}}>{item.title}</span>
                            </MenuItemLinks>

                        </MenuItems>


                    )
                })}
                <ContactUsPopup/>
            </SidebarMenu>
        </div>
    )
}

export default Sidebar
