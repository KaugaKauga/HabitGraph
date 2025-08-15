import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="min-h-screen w-full  flex justify-center p-4">
        <div className="w-full max-w-md flex flex-col flex-grow">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
