import React, { useState } from "react";
import "./ContactUsPopup.css";
import {TeamLogoStyled} from "../Popup/TeamLogoStyled";
import HatalLogo from "../assets/branchLogo.png"
import logo from "../assets/teamLogoWithText.png"
import * as FaIcons from 'react-icons/fa'


export default function ContactUsPopup() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
                <TeamLogoStyled onClick={toggleModal}/>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className="image-line">
                            <img src={logo} alt={"logo"} className={"hatal"}/>
                            <img src={HatalLogo} alt={"logo"} className={"hatal"}/>
                        </div>
                        <p> צוות טקטי איימל ליצירת קשר</p>
                        <p> taktit.mpit.software@gmail.com</p>
                        <button className="close-modal" onClick={toggleModal}>
                            <FaIcons.FaTimes/>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}