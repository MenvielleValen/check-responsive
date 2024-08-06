"use client"

import { createElement } from "react";
import { IconBaseProps, IconType } from "react-icons";

interface Props {
    onClick: () => void;
    icon: IconType,
    title: string;
    props?: IconBaseProps
}

export const FloatButton = ({onClick, icon, props = {}, title}: Props) => {

    const elementIcon = createElement(icon, props)


  return (
    <button title={title} className="fixed bottom-6 right-6 bg-violet-700 p-4 rounded-full text-white shadow-md" onClick={onClick}>
        {elementIcon}
    </button>
  )
}
