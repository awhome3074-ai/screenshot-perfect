import type { RouteObject } from "react-router";

import { RootLayout, RootErrorBoundary, NotFound } from "./root";
import { IndexPage } from "./home";
import { SignInPage } from "./signin";
import { SignUpPage } from "./signup";
import { AUTHENTICATED_ROUTE_ID, authenticatedLoader, AuthenticatedLayout } from "./_authenticated/route";
import { AppPage } from "./_authenticated/app";

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      { index: true, Component: IndexPage },
      { path: "signin", Component: SignInPage },
      { path: "signup", Component: SignUpPage },
      {
        id: AUTHENTICATED_ROUTE_ID,
        loader: authenticatedLoader,
        Component: AuthenticatedLayout,
        HydrateFallback: () => null,
        children: [{ path: "app", Component: AppPage }],
      },
      { path: "*", Component: NotFound },
    ],
  },
];
