import { useState } from "react";

import clsx from "clsx";

type MobileSheetProps = {
  F_title: string,
  F_status: string
}

export default function MobileSheet({props}: {props: MobileSheetProps}) {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={clsx("rounded-xl w-full transition-all duration-300 h-9/10 absolute z-10 bg-white", {"top-1/10": isOpen, "top-9/10": !isOpen})}>
      <div id="peek" className="p-padding h-12 flex">
        <div>
          {props.F_title}
        </div>
        <div onClick={() => (setIsOpen(!isOpen))}>
          close
        </div>
      </div>
      <div id="sheet-body">
        Body
      </div>
    </div>
  );
}