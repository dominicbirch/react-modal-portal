import {nanoid} from 'nanoid';
import React from 'react';
import {useToggle} from './hooks';
import type {ModalProps} from './modal';
import {componentName} from './util';

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
export type PropsOf<T> = T extends React.ComponentType<infer P>
	? P
	: unknown;
/** A function or class component with a toggle-compatible `onClose` callback. */
export type ModalLike = React.ComponentType<Pick<ModalProps, 'open' | 'onClose'>>;

type InnerProps = {
	kind: ToggleKind;
	label: React.ReactNode;
	value: boolean;
	toggle: () => void;
};
function ModalToggle({kind, label, value, toggle}: InnerProps) {
	const id = React.useMemo(nanoid, []);

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
 * @param Component The modal component to display when triggered.
 * @returns The augmented modal component
 */
export function toggled<C extends ModalLike>(Component: C) {
	const component: React.ComponentType<PropsOf<C> & ToggleProps> = ({kind = 'button', label, hideLabel, open, onClose, ...props}) => {
		const {value, actionLabel, toggle, handleClose} = useToggle({
			label,
			hideLabel,
			onClose,
		}, open ?? false);

		return <>
			<ModalToggle
				kind={kind}
				label={actionLabel}
				value={value}
				toggle={toggle} />
			{value && <Component {...props as any} onClose={handleClose} />}
		</>;
	};

	component.displayName = `withToggle(${componentName(Component)})`;

	return component;
}

/**
 * Creates a Higher-Order Component which adds a toggle to a modal component.
 * @returns The Higher-Order Component.
 */
export function withToggle({kind = 'button', label, hideLabel}: ToggleProps) {
	return <C extends ModalLike>(Component: C) => {
		const component: React.ComponentType<PropsOf<C>> = ({open, onClose, ...props}) => {
			const {value, actionLabel, toggle, handleClose} = useToggle({
				label,
				hideLabel,
				onClose,
			}, open ?? false);

			return <>
				<ModalToggle
					kind={kind}
					label={actionLabel}
					value={value}
					toggle={toggle} />
				{value && <Component {...props as any} onClose={handleClose} />}
			</>;
		};

		component.displayName = `withToggle(${componentName(Component)})`;

		return component;
	};
}
