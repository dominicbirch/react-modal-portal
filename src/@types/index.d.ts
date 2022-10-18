import 'styled-components';

declare module 'styled-components' {
	// Needs to remain as an interface as it is declaration merging
	/* eslint-disable @typescript-eslint/consistent-type-definitions */
	interface DefaultTheme {
		modal: {
			/** This is the number of available pixels in width at which the modal switches from using the middle 50% of the screen to using the whole screen (-whitespace) */
			mediaBreakpoint: number;
			whitespace: string;
			borderRadius: string;
			fontWeight: number;
			zIndexStart: number;
			animateDuration: string;
			shadow: string;
			bgColor: string;
			fgColor: string;
			backdropColor: string;
			backdropFilter: string;
		};
	}
}
