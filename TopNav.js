import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Transition} from "react-transition-group";

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 990;
    backdrop-filter: blur(6px);
    transform: translateY(${({state}) => (state === "entering" || state === "entered" ? 0 : '-72px')});
    background-color: ${props => (props.backgroundColor ? props.backgroundColor : 'rgb(80, 80, 80, 0.5)')};
    width: 90%;
    min-height: 64px;
    color: $424242;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
    font-size: 20px;
    transition-delay: 0.2s;
    transition-duration: 1s;
    
    @media (min-width: 768px) {
        width: 80%;
        padding-left: 10%;
        padding-right: 10%;
        font-size: 32px;
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
            if (!animate && document.documentElement.scrollTop < previousState) {
                doAnimate(true);
            } else if (!animate) {
                doAnimate(false);
            }
            previousState = document.documentElement.scrollTop;
        });
    }, []);

    return (
        <Transition in={animate} timeout={(props.animationTimeout ? props.animationTimeout : 1000)}>
            {(state) => (
                <NavContainer className={(props.containerClassName ? props.containerClassName : '')} state={state} backgroundColor={props.backgroundColor}>
                    {props.children}
                </NavContainer>
            )}
        </Transition>

    );
}

export default TopNav;