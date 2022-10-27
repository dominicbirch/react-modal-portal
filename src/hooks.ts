import type {ReactNode} from 'react';
import {useState, useCallback, useMemo, useEffect} from 'react';
import type {ToggleProps} from './toggle';
import type {ModalProps} from './modal';

export type ToggleState = {
	/** A value indicating whether the toggle is on or off. */
	value: boolean;
	/** A label describing the toggle action (based on current state and label props). */
	actionLabel: ReactNode;
	/** A callback which toggles the state value. */
	toggle: () => void;
	/** A callback which invokes the `onClose` from props before setting the state to false. */
	handleClose: () => void;
};

/** Configures a modal toggle state with callbacks. */
export function useToggle({hideLabel, label, onClose}: Partial<ToggleProps & Pick<ModalProps, 'onClose'>>, defaultValue = false): ToggleState {
	const
		[value, setValue] = useState(defaultValue);
	const toggle = useCallback(() => {
		setValue(!value);
	}, [value, setValue]);
	const handleClose = useCallback(() => {
		if (typeof onClose === 'function') {
			onClose();
		}

		setValue(false);
	}, [onClose, setValue]);
	const actionLabel = useMemo(() => value ? hideLabel ?? label ?? 'Hide' : label ?? 'Show', [value, label, hideLabel]);

	return {
		value,
		actionLabel,
		toggle,
		handleClose,
	};
}

/**
 * Resolves and returns a cached reference to the target DOM element.
 * @param target This can either be a query selector string or any ref to an element in the document.
 *
 * If no target is provided, the document's body is returned.
 */
export function useModalContainer(target?: Element | string) {
	return useMemo(() => {
		if (target instanceof Element) {
			return target;
		}

		if (typeof target === 'string') {
			const c = document.querySelector(target);
			if (c) {
				return c;
			}
		}

		return document.body;
	}, [target]);
}

/**
 * Prevents scrolling of the document's main content.
 * @param lock `true` to prevent scrolling, `false` to allow it.
 * @param disable `true` to ignore changes to the lock state.
 */
export function useBodyScrollLock(lock: boolean | undefined, disable = false) {
	useEffect(() => {
		if (disable) {
			return;
		}

		// Hide scrollbar for background content while open, prevent scrolling body
		document.body.style.overflow = lock ? 'hidden' : 'auto';

		// Reset body scrolling when removed
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [lock, disable]);
}
