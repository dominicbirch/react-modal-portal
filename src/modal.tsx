import {nanoid} from 'nanoid';
import React, {useMemo} from 'react';
import {createPortal} from 'react-dom';
import {useBodyScrollLock, useModalContainer} from './hooks';

export type PortalProps = {
	inline?: false;
	/** The element or query selector into which the modal should be rendered. */
	targetContainer?: Element | string;
};
export type InlineProps = {
	/** Render the modal content directly where the component was added. */
	inline: true;
	targetContainer?: never;
};

export type TitleProps = {
	/** The optional title text to be displayed at the top of the modal. */
	title: React.ReactNode;
	/** The hover text to be given to the close button. */
	closeTitle?: string;
	/** The aria-label text to be given to the close button. */
	closeLabel?: string;
	/** The tab index for the close button in the window, when shown. */
	closeTabIndex?: number;
} | {
	title?: false;
	closeTitle?: never;
	closeLabel?: never;
	closeTabIndex?: never;
};

export type ModalProps = TitleProps & (PortalProps | InlineProps) & {
	/** May optionally be used to show/hide the modal content. */
	open?: boolean;
	/** By default, the modal will prevent scrolling of body content and hide the scrollbars when added, and restore them once removed.
 * Set this property to `true` to disable this behavior. */
	allowBodyScroll?: boolean;
	/** Optionally provide additional css classes to be applied to the root. */
	className?: string;

	/** An optional callback which is invoked when the modal requests to be closed - either by clicking the backdrop or the close button. */
	onClose?: () => void;
};

/** Renders child content in a modal popup container */
function Modal({title, closeTitle, closeLabel, closeTabIndex, className, allowBodyScroll, open, inline, targetContainer, onClose, children}: React.PropsWithChildren<ModalProps>) {
	const container = useModalContainer(targetContainer);
	const id = useMemo(nanoid, []);

	useBodyScrollLock(open, allowBodyScroll);

	const node = open
		? <div className={className ? `modal ${className}` : 'modal'}>
			<div className='backdrop' onClick={onClose}></div>
			<div className='window'>
				{
					title
					&& <div className='title'>
						<label htmlFor={id}>{title}</label>
						<span tabIndex={closeTabIndex} onClick={onClose} className='icon' role='button' title={closeTitle} aria-label={closeLabel}>
							&times;
						</span>
					</div>
				}
				<div id={id} className='content'>
					{children}
				</div>
			</div>
		</div>
		: <></>;

	return inline ? node : createPortal(node, container);
}

(Modal as React.FunctionComponent<ModalProps>).displayName = 'Modal';
(Modal as React.FunctionComponent<ModalProps>).defaultProps = {
	closeTitle: 'Close',
	closeLabel: 'Close',
	closeTabIndex: 99999,
	open: true,
};

export {
	Modal,
};

<Modal title='' closeLabel='' />;
