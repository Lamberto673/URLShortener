import React from "react";
import Registered from "../components/Registered";
import StepBand from "../components/StepBand";

const page = () => {
  return (
    <div className="noise flex min-h-screen w-full flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Registered />
      </div>
      <StepBand />
    </div>
  );
};

export default page;
