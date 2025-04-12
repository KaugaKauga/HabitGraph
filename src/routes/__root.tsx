import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen space-y-4 w-screen bg-stone-100">
        <Outlet />
      </div>
    </React.Fragment>
  );
}
