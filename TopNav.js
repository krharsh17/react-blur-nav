import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Transition} from "react-transition-group";
import device from "./Constants";

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 990;
    backdrop-filter: blur(6px);
    transition: 0.5s;
    transform: translateY(${({state}) => (state === "entering" || state === "entered" ? 0 : '-72px')});
    background-color: #80FFFFFF;
    width: 90%;
    min-height: 64px;
    color: $424242;
    font-family: 'Ropa Sans', cursive;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
    font-size: 20px;
    transition-delay: 0.2s;
    transition-duration: 1s;
    
    @media ${device.tablet} {
        width: 80%;
        padding-left: 10%;
        padding-right: 10%;
        font-size: 32px;
    }
`;

const NavBrand = styled.a`
    font-family: 'Over the Rainbow', cursive;
    display: none;
    color: #424242;
    text-decoration: none;
    
    @media ${device.tablet} {
        display: block;
    }
`;

const TopNav = (props) => {

    const [animate, setAnimate] = useState(false)

    const doAnimate = (finalState) => {
        setAnimate(finalState);
    }

    let previousState = 0;


    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > window.innerHeight && !animate && document.documentElement.scrollTop < previousState) {
                doAnimate(true);
            } else if (!animate) {
                doAnimate(false);
            }
            previousState = document.documentElement.scrollTop;
        });
    }, []);

    return (
        <Transition in={animate} timeout={1000}>
            {(state) => (
                <NavContainer state={state}>
                    <NavBrand href={'/'}>KHBlogs</NavBrand>
                    {props.title}
                </NavContainer>
            )}
        </Transition>

    );
}

export default TopNav;