import type {ReactNode} from 'react';
import {useState, useCallback, useMemo} from 'react';
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
