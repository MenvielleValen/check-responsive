"use client"

import { ButtonTool } from "../atoms/ButtonTool"
import { SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineCameraAlt } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { add, removeBox } from "@/lib/features/layouts/layoutsSlice";
import { Modal } from "../organisms/Modal";
import { useState } from "react";
import { Iframe } from "../atoms/Iframe";
import { MdOutlinePhotoCamera } from "react-icons/md";

import axios from "axios";

interface Props {
  item: any;
}

export const ToolBar = ({ item }: Props) => {

  const dispatcher = useDispatch();

  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePreview = (e: any) => {
    setPreview(true)
  }

  const handleRemove = () => {
    dispatcher(removeBox(item.uid))
  }

  const captureScreen = async() => {
    try {
      setLoading(true);
      const response = await axios.post('/api/shots', {
        src: item.src,
        width: item.width,
        height: item.height
      }, {responseType: 'blob'});

      const url = URL.createObjectURL(response.data);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.title}-${item.width}x${item.height}.png`;
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("An error occurred while capturing the screen")
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex justify-between">
      <div className="flex gap-2">
        <ButtonTool title="Size" icon={SlSizeFullscreen} onClick={handlePreview} props={{ size: 15 }} />
        {/* <ButtonTool disabled={loading} title="Screenshot" icon={MdOutlinePhotoCamera} onClick={captureScreen} props={{ size: 20 }} /> */}
      </div>
      <ButtonTool title="Remove resolution" icon={AiOutlineDelete} onClick={handleRemove} className="text-red-600" props={{ size: 20 }} />
      <Modal open={preview} setOpen={setPreview}>
        <section className="mb-2">
          <div className="flex flex-col">
            <span className="text-gray-500">{item.title} <small className="font-light">{item.width} x {item.height}</small></span>
            <small className="font-light text-gray-500">{item.src}</small>
          </div>
          <hr />
        </section>
        <Iframe {...item} scale={1} />
      </Modal>
    </section>
  )
}
