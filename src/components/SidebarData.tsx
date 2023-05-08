import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as ImIcons from "react-icons/im";
import * as IaIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
    title: 'Recordings',
    path: '/',
    icon: <RiIcons.RiRecordCircleLine />
    },
    {
        title: 'New Session',
        path: 'NewSession',
        icon: <IaIcons.AiFillAudio />
    },
    {
        title: 'Chat',
        path: '/chat',
        icon: <ImIcons.ImBubbles4 />
    },

    {
        title: 'Settings',
        path: '/settings',
        icon: <FaIcons.FaCog />
    },

]

