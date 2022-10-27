import React from 'react';
import {componentName} from './util';

/**
 * Creates a Higher-Order Component which modifies a component so that it is always displayed in a given layout.
 * @param Layout The layout container to use.
 * @param mapComponentPropsToLayoutProps A function to provide props values for the container.
 * The mapping function will receive the child component's properties and the result is cached.
 * @returns The higher order component.
 */
export function withLayout<P, M>(
	Layout: React.ComponentType<React.PropsWithChildren<M>>,
	mapComponentPropsToLayoutProps: (props: P) => M,
) {
	return (Component: React.ComponentType<P>) => {
		const component: React.ComponentType<P> = (props: P) => {
			const modalProps = React.useMemo(() => mapComponentPropsToLayoutProps(props), [props, mapComponentPropsToLayoutProps]);

			return (
				<Layout {...modalProps}>
					<Component {...props} />
				</Layout>
			);
		};

		component.displayName = `with${componentName(Layout)}(${componentName(Component)})`;
		component.defaultProps = Component.defaultProps;

		return component;
	};
}
