# react-modal-portal 
![NPM version](https://badge.fury.io/js/react-modal-portal.svg) 
[![Release](https://github.com/dominicbirch/react-modal-portal/actions/workflows/release.yml/badge.svg?event=release)](https://github.com/dominicbirch/react-modal-portal/actions/workflows/release.yml) 
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Components
The modal components are layout components which render their children into a modal container, either at a specific place in the DOM (portals) or in-place.  

By default, modals are rendered to the end of the document's body.

### Modal
The naked component (with no styles applied) is exported as `Modal`.  The markup produced does apply some CSS classnames, and should render some markup similar to the following sample.
```html
<div class="modal">
    <div class="backdrop"></div>
    <div class="window">
        <div class="title">
            <label for="x">
                <!-- title -->
            </label>
            <span tabIndex="9999" class="icon" role="button">
                &times;
            </span>
        </div>
        <div id="x" class="content">
            <!-- child content -->
        </div>
    </div>
</div>
```

### StyledModal
This is the naked modal wrapped with `styled-components` and a default theme.

Some basic examples showing the default styles and bundled triggers are available at [https://dominicbirch.github.io/react-modal-portal](https://dominicbirch.github.io/react-modal-portal/).

There are many ways to customize the appearance of the modal some suggestions which immediately sprint to mind are as follows.
#### Style it from scratch
To do this, just work with the naked `Modal` component and override using the class names it renders.
```scss
.modal {
    .backdrop {
        background-color: hotpink;
    }
}
```
The main advantage to doing this will be that there is minimal overhead, no need for styled-components, themes, or any of the default styles in your bundle.  

This approach also gives you immediate control over how to chunk and serve your styles, whether that's in CSS or JS.

#### Provide a theme
If you are already using a `styled-components` theme, you will notice that the library adds a `modal` property to the default theme's abstraction; you can use this to adjust the basic settings of the default theme.

Even if you aren't using `styled-components`, you can pass it a theme object; either by adding a `styled-components` theme context to your app, or by passing one in to the modal's props.

You might decide to make some small changes like removing the whitespace to create a minimal layout container, then let the child content handle appearance for exmaple.
```tsx
import React from "react";
import StyledModal, { defaultTheme } from "react-modal-portal";

export default () => 
    <StyledModal theme={{modal: { ...defaultTheme.modal, whitespace: 0 }}}>
        {/* your child content here */}
    </StyledModal>;
```

## Higher-Order Components
The following may be used to augment the modal components as you see fit; they are intentionally kept separate rather than exporting lots of variations to offer more control with a smaller output.
### Layouts
The library exports a Higher-Order Component factory, `withLayout`, which may be used to apply a given layout component to other components without repeatedly adding them to TSX/JSX with every usage.  The HOC may be used with any component which accepts `children`.

The `withLayout` Higher-Order Component can be applied to class components as a decorator, as shown in the following example.
```tsx
import React from "react";
import StyledModal from "react-modal-portal";

type Props = {
    onClose?: () => void;
    onChange?: (value: any) => void;
};

@withLayout(StyledModal, ({onClose}) => ({
    onClose,
    title: "Have you considered giving us more money?",
}))
export class Upsell extends React.Component<Props> {
    // ...
}
```
The named class export is replaced with a `React.ComponentType<Props>` where the `defaultProps` of `Upsell` are preserved, and the `displayName` is set as `withStyledModal(Upsell)`.

Alternatively, it may also be applied without the decorator syntax above as follows.
```tsx
export function Confirmation() {
    // ...
}

export const ConfirmationModal = withLayout(StyledModal, () => ({
    title: "Are you sure?",
}))(Confirmation);
```

### Toggles
These functions can be used to reduce repetition of showing/hiding modals in response to clicking buttons, links.
#### toggled(componentType)
This is a simple Higher-Order Component or component decorator; use this when you want to augment a `ModalLike` component to include a toggle control, adding props to control the toggle used.
```tsx
import { toggled, StyledModal } from "react-modal-portal";

export const ModalWithToggle = toggled(StyledModal);
```
#### withToggle(toggleOptions)(componentType)
This is a Higher-Order Component factory which can be used to create a decorator which creates a _specific_ toggle for a `ModalLike` component, preserving the original `ModalLike` component's props.

Apply it as a decorator as follows:
```tsx
import { withToggle, ModalProps } from "react-modal-portal";

@withToggle({
    kind: "button",
    label: "Show me the modal!",
})
export default class MyFancyModal extends React.Component<ModalProps> {
    // ...
}
```
Or alternatively,
```tsx
import { withToggle, StyledModal } from "react-modal-portal";

export const ModalWithToggleButton = withToggle({ 
    kind: "button",
    label: "show",
    hideLabel: "hide",
})(StyledModal);
```

## Hooks
All of the logical aspects of the modal components are exported as hooks; this should help if there's a need to create a different modal component with the same props/behavior.
* `useToggle` - Returns a `ToggleState` for the given props.
* `useModalContainer` - Returns a DOM reference for use as a portal target.
* `useBodyScrollLock` - Used to control scrolling of background content.