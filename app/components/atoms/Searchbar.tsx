"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { IoSearchOutline } from "react-icons/io5";

export const Searchbar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [url, setUrl] = useState("https://");

    useEffect(() => {
        if (searchParams) {
            const urlValue = searchParams.get('url');

            if (urlValue) {
                setUrl(urlValue);
            }
        }
    }, [searchParams])

    const handleInput = (e: any) => {
        setUrl(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Función para asegurar que la URL tenga el esquema adecuado
        const ensureProtocol = (url: string) => {
            // Verificar si la URL ya tiene un esquema
            const hasProtocol = /^https?:\/\//i.test(url);
            return hasProtocol ? url : `https://${url}`;
        };

        // Asegurar que la URL tenga https o http
        const validUrl = ensureProtocol(url);

        // Redirigir con la URL correcta
        router.push(`?url=${encodeURIComponent(validUrl)}`);
    };

    return (
        <form onSubmit={handleSubmit} className='relative'>
            <input type="text" formNoValidate value={url} onChange={handleInput} className='w-full rounded-2xl p-2 pr-4 pl-4 text-gray-500 border focus:border-blue-500 focus:outline-none box-border' />
            <div className="absolute right-4 bottom-0 top-0 flex items-center">
                <button title='Search'><IoSearchOutline/></button>
            </div>
        </form>
    )
}
