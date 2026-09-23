import type { ReactElement } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";

export const App = (): ReactElement => <RouterProvider router={router} />;