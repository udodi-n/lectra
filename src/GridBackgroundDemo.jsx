import { cn } from "./lib/utils";
import React from "react";

function GridBackgroundDemo({className}) {
  return (
    <div
      className={className}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]"
        )} />
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1c1c1c] [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)] dark:bg-[#1c1c1c]"></div>
      
    </div>
  );
}


export default GridBackgroundDemo