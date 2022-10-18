import {nanoid} from 'nanoid';
import type {FunctionComponent} from 'react';
import React, {useMemo} from 'react';
import {useToggle} from './hooks';
import type {ModalProps} from './modal';

export type ToggleKind = 'button' | 'link' | 'checkbox';
/** The properties added by the ModalToggle HoC */
export type ToggleProps = {
	/** The kind of toggle markup (button element, anchor element, checkbox input) */
	kind?: ToggleKind;
	/** The label to be shown on the trigger when the modal is not visible. */
	label?: React.ReactNode;
	/** The label to be shown on the trigger when the modal is visible. */
	hideLabel?: React.ReactNode;
};
/** Returns the type of properties for the function or class component type. */
export type PropsOf<T> = T extends React.FunctionComponent<infer P>
	? P
	: T extends React.ComponentClass<infer P>
		? P
		: unknown;
/** A function or class component with a toggle-compatible `onClose` callback. */
export type ModalLike = React.FunctionComponent<Pick<ModalProps, 'onClose'>> | React.ComponentClass<Pick<ModalProps, 'onClose'>>;

type InnerProps = {
	kind: ToggleKind;
	label: React.ReactNode;
	value: boolean;
	toggle: () => void;
};
function ModalToggle({kind, label, value, toggle}: InnerProps) {
	const id = useMemo(nanoid, []);

	switch (kind) {
		case 'link':
			/* eslint-disable no-script-url */
			return <a onClick={toggle} href='javascript:void(0);' className='modal-toggle'>{label}</a>;
		case 'checkbox':
			return <span className='modal-toggle'>
				<input id={id} type='checkbox' checked={value} onChange={toggle} />
				&nbsp;
				<label htmlFor={id}>{label}</label>
			</span>;
		case 'button':
		default:
			return <button type='button' onClick={toggle} className='modal-toggle'>{label}</button>;
	}
}

/** Creates a component which toggles display of a modal component.
 * @param ModalComponent The modal component to display when triggered.
 * @returns The augmented modal component
 */
export function withToggle<C extends ModalLike>(ModalComponent: C) {
	const component: FunctionComponent<Omit<PropsOf<C>, 'open'> & ToggleProps> = ({kind = 'button', label, hideLabel, onClose, ...props}) => {
		const {value, actionLabel, toggle, handleClose} = useToggle({
			label,
			hideLabel,
			onClose,
		});

		return <>
			<ModalToggle
				kind={kind}
				label={actionLabel}
				value={value}
				toggle={toggle} />
			{value && <ModalComponent {...props as any} onClose={handleClose} />}
		</>;
	};

	return ModalComponent.displayName
		? Object.defineProperty(component, 'displayName', {
			value: `withToggle(${ModalComponent.displayName ?? 'Modal'})`,
		})
		: component;
}
