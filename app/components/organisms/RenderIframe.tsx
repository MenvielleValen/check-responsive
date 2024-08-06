import { Iframe } from "../atoms/Iframe";
import { IframeHeader } from "../atoms/IframeHeader";

interface IProps {
    src: string;
    width: string | number;
    height: string | number;
    scale: number;
    title: string;
    uid: string;
}

export const RenderIframe = ({src, width, height, scale, title, uid}: IProps) => {

    const parsedHeight = Number(height);
    const parsedWidth = Number(width);

    const headerProps = {
        width: parsedWidth,
        height: parsedHeight,
        title,
        uid,
        src 
    }

    const iframeProps = {
        ...headerProps,
        src,
        scale,
    }

  return (
    <section>
        <IframeHeader {...headerProps}/>
        <Iframe {...iframeProps} />
    </section>
  )
}
