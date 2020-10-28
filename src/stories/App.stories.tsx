import React from 'react';
import App from "../App/App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./decorations/ReduxStoreProviderDecorator";

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}


export const AppBaseExample = (props: any) => {
    return (
     <App/>
    )
}

