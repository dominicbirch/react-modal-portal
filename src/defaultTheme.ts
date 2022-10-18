import type {DefaultTheme} from 'styled-components';

export const defaultTheme: DefaultTheme = {
	modal: {
		mediaBreakpoint: 768,
		whitespace: '.5rem',
		borderRadius: '.5rem',
		fontWeight: 400,
		zIndexStart: 2,
		animateDuration: '.2s',
		shadow: '0 2px 4px 0 rgba(0,0,0,.16)',
		bgColor: '#fdfdfd',
		fgColor: '#222',
		backdropColor: 'rgba(34,34,34,.33)',
		backdropFilter: 'blur(2px) grayscale(.5)',
	},
};
