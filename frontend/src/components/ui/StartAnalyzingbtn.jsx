import React from "react";

const StartAnalyzingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
          w-[250px]
        h-[135px]
        bg-[#69D84F]
        text-black
        text-3xl
        font-bold
        rounded-2xl
        shadow-lg
        hover:bg-[#57C840]
        active:scale-95
        transition-all
        duration-200
        flex
        flex-col
        justify-center
        items-center
        text-center
        leading-snug
      "
    >
      Start <br /> Analyzing
    </button>
  );
};

export default StartAnalyzingButton;
