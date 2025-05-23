import { useIndicationData } from "@/context/IndicationData";
import React from "react";

const MyTest = () => {
  const { setIsShown } = useIndicationData();
  const handleClick = React.useCallback(() => {
    setIsShown(true);
  }, [setIsShown]);

  return (
    <button onClick={handleClick} style={{ backgroundColor: "orange" }}>
      Hi there
    </button>
  );
};

export default MyTest;
