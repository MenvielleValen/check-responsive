"use client"

import { ToolBar } from "../molecules/ToolBar";

interface IProps {
    width: string | number;
    height: string | number;
    title: string;
    uid: string;
    src: string;
}

export const IframeHeader = ({ width, height, title, uid, src }: IProps) => {
    return (
        <header className="p-4 pl-0 flex flex-col gap-2">
            <div><span className="text-gray-500">{title} <small className="font-light">{width} x {height}</small></span></div>
            <ToolBar item={{width, height, title, uid, src }}/>
        </header>
    )
}
