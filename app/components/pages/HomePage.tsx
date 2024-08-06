"use client"

import { useDispatch, useSelector } from "react-redux";
import { RenderIframe } from "../organisms/RenderIframe";
import { IoMdAdd } from "react-icons/io";

import { add, selectLayouts, setLayout } from "@/lib/features/layouts/layoutsSlice";
import { useEffect, useState } from "react";
import { FloatButton } from "../atoms/FloatButton";
import { Modal } from "../organisms/Modal";
import { defaultLayout } from "@/constants/layouts";

interface Props {
    url: string | null;
}

export const HomePage = ({ url }: Props) => {

    if (!url) return;

    const layouts = useSelector(selectLayouts);
    const dispatcher = useDispatch();
    const [newViewBox, setNewViewBox] = useState({
        height: 844,
        width: 390,
        title: 'New Resolution',
    });
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const layout = localStorage.getItem("layout");

        if (layout) {
            const parsedLayout = JSON.parse(layout);
            dispatcher(setLayout(parsedLayout))
        }
        else {
            dispatcher(setLayout(defaultLayout))
        }
    }, [])

    const addViewBox = () => {
        setOpenModal(true);
    }

    const handleChangeNewViewBox = (e: any) => {
        const { name, value } = e.target;
        setNewViewBox({
            ...newViewBox,
            [name]: value,
        })
    }

    const onSubmitNewViewBox = (e: any) => {
        e.preventDefault();
        dispatcher(add(newViewBox));
        setOpenModal(false);
    }

    return (
        <main className="flex flex-wrap min-h-screen p-8 pt-24 gap-4 relative">
            {
                layouts.map(({ title, width, height, uid }) =>
                    (<RenderIframe key={title} uid={uid!} title={title} src={url} width={width} height={height} scale={0.5}></RenderIframe>)
                )
            }

            {layouts.length === 0 &&
                <div className="h-full w-full flex items-center justify-center">
                    <h4 className="font-semibold text-gray-500 text-2xl">Create new <b>resolution</b></h4>
                </div>
            }


            <FloatButton icon={IoMdAdd} onClick={addViewBox} title="Create new resolution" props={{ size: 25 }} />


            <Modal open={openModal} setOpen={setOpenModal}>
                <form onSubmit={onSubmitNewViewBox} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label>Name</label>
                        <input value={newViewBox.title} type="text" name="title" className="p-2 border border-gray-500 rounded-md" placeholder="Enter name" onChange={handleChangeNewViewBox} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Resolution</label>
                        <div className="flex gap-1 items-center justify-between">
                            <small>Width</small>
                            <div className="flex gap-1 items-center">
                                <input min={1} max={10000} value={newViewBox.width} type="number" name="width" className="p-2 border border-gray-500 rounded-md" placeholder="Width" onChange={handleChangeNewViewBox} />
                                <small>px</small>
                            </div>
                        </div>
                        <div className="flex gap-1 items-center justify-between">
                            <small>Height</small>
                            <div className="flex gap-1 items-center">
                                <input min={1} max={10000} value={newViewBox.height} type="number" name="height" className="p-2 border border-gray-500 rounded-md" placeholder="Height" onChange={handleChangeNewViewBox} />
                                <small>px</small>
                            </div>
                        </div>
                    </div>

                    <section className="flex gap-1 mt-4">
                        <button type="submit" className="flex-1 p-2 bg-violet-600 text-white rounded-md">Create</button>
                        <button type="button" className="flex-1 p-2 bg-red-600 text-white rounded-md" onClick={() => setOpenModal(false)}>Cancel</button>
                    </section>
                </form>
            </Modal>
        </main>

    );
}
