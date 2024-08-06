"use client"

import React from 'react';
import { IoMdClose } from "react-icons/io";


interface Props {
  open: boolean;
  setOpen: any;
}

export const Modal = ({ children, open, setOpen }: React.PropsWithChildren<Props>) => {

  if (!open) return null;

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-opacity-45 bg-black z-[1]">

      <section className='bg-white rounded-lg p-8 max-h-[90%] max-w-[90%] overflow-auto z-[1] relative'>
        <div className='absolute right-2 top-2'><button onClick={() => setOpen(false)}><IoMdClose /></button></div>
        {children}
      </section>
    </section>
  )
}
