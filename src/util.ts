export function componentName<T>(component: React.ComponentType<T>) {
	return component.displayName ?? component.name ?? component.constructor.name ?? typeof component;
}
