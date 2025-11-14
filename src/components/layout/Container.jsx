import React from "react";

function Container({children, classname=''}) {
  return(
    <div className={'max-w-full mx-auto px-6 ${classname}'}>
      {children}
    </div>
  )
}

export default Container;
