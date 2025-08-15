import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="min-h-screen w-full bg-stone-100 dark:bg-blue-950 flex justify-center p-4">
        <div className="w-full max-w-md flex flex-col flex-grow">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
