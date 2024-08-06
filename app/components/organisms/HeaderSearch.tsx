"use client"

import { Searchbar } from "../atoms/Searchbar"

export const HeaderSearch = () => {
  return (
    <header className="w-full fixed p-4 z-[1] bg-gray-200 bg-opacity-70 shadow-sm">
        <Searchbar/>
    </header>
  )
}
