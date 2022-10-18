import React, {useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import {nanoid} from 'nanoid';

export type ModalProps = {
	/** The optional title text to be displayed at the top of the modal.
	 * > NOTE: if no title is set, the close button is also hidden; so a means of closing the modal should be included in the child content.
	 */
	title?: string;
	/** Optionally provide additional css classes to be applied to the root. */
	className?: string;
	/** By default, the modal will prevent scrolling of body content and hide the scrollbars when added, and restore them once removed.
	 * Set this property to `true` to disable this behavior. */
	allowBodyScroll?: boolean;
	/** The hover text to be given to the close button. */
	closeTitle?: string;
	/** The aria-label text to be given to the close button. */
	closeLabel?: string;
	/** The tab index for the close button in the window, when shown. */
	closeTabIndex?: number;
	/** May optionally be used to show/hide the modal content. */
	open?: boolean;
	/** An optional callback which is invoked when the modal requests to be closed - either by clicking the backdrop or the close button. */
	onClose?: () => void;
};

/** Renders child content in a modal popup container */
function Modal({title, className, allowBodyScroll, closeTitle, closeLabel, closeTabIndex, open, onClose, children}: React.PropsWithChildren<ModalProps>) {
	const
		container = useMemo(() => {
			let c = document.querySelector('#modal_container');

			if (!c) {
				c = document.createElement('div');
				c.id = 'modal_container';
				document.body.append(c);
			}

			return c;
		}, []);
	const id = useMemo(nanoid, []);

	useEffect(() => {
		if (allowBodyScroll) {
			return;
		}

		// Hide scrollbar for background content, prevent scrolling body
		document.body.style.overflow = 'hidden';

		// Reset body scrolling when removed
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [allowBodyScroll]);

	return createPortal(
		Boolean(open)
		&& <div className={className ? `modal ${className}` : 'modal'}>
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
		</div>, container);
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
