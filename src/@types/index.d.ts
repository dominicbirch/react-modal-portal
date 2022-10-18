import 'styled-components';

declare module 'styled-components' {
	// Needs to remain as an interface as it is declaration merging
	/* eslint-disable @typescript-eslint/consistent-type-definitions */
	interface DefaultTheme {
		modal: {
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
