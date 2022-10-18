import type {ComponentType} from 'react';
import type {StyledComponent, DefaultTheme} from 'styled-components';
import styled, {keyframes} from 'styled-components';
import {defaultTheme} from './defaultTheme';
import type {ModalProps} from './modal';
import {Modal} from './modal';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

/** Renders child content in a modal popup container which applies its own styles */
const styledModal: StyledComponent<ComponentType<ModalProps>, DefaultTheme, ModalProps> = styled(Modal)`
    font-weight: ${({theme}) => theme.modal.fontWeight};

    .backdrop {
        cursor: pointer;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: ${({theme}) => theme.modal.zIndexStart};
        background-color: ${({theme}) => theme.modal.backdropColor};
        backdrop-filter:  ${({theme}) => theme.modal.backdropFilter};
        animation: ${fadeIn} ${({theme}) => theme.modal.animateDuration};
    }

    .window {
        position: fixed;
        display: flex;
        flex-flow: column nowrap;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: ${({theme}) => theme.modal.zIndexStart + 1};
        max-width: calc(100% - ${({theme}) => theme.modal.whitespace} * 2);
        max-height: calc(100% - ${({theme}) => theme.modal.whitespace} * 2);
        border-radius: ${({theme}) => theme.modal.borderRadius};
        overflow: hidden;
        background: ${({theme}) => theme.modal.bgColor};
        color: ${({theme}) => theme.modal.fgColor};
        box-shadow: ${({theme}) => theme.modal.shadow}
    }

    .title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .icon{
            cursor: pointer;
            vertical-align: middle;
        }
    }

    .content {
        overflow-y: auto;
    }

    .title, 
    .content {
        padding: ${({theme}) => theme.modal.whitespace};
    }

    @media (max-width: ${({theme}) => theme.modal.mediaBreakpoint}px){
        .window{
            left: ${({theme}) => theme.modal.whitespace};
            transform: translateY(-50%);
        }
    }
`;

styledModal.displayName = 'StyledModal';
styledModal.defaultProps = {
	theme: defaultTheme,
};

export {
	styledModal as StyledModal,
};
