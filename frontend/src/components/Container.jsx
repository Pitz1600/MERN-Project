// src/components/Container.jsx

import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 flex flex-col gap-4 w-full">
      {children}
    </div>
  );
};

export default Container;
