import React from "react";
import { IconType } from "react-icons";

interface Props {
    icon: IconType,
    onClick: (e: any) => void;
    title: string;
    props?: any;
    className?: string;
    disabled?: boolean;
}

export const ButtonTool = ({icon, onClick, title, props = {}, className = "", disabled = false}: Props) => {
  const iconElement = React.createElement(icon, props);
  return <button disabled={disabled} className={`${className} disabled:opacity-25 disabled:cursor-wait`} title={title} onClick={onClick}>{iconElement}</button>
}
