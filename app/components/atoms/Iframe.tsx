interface IProps {
    src: string;
    width: number;
    height: number;
    scale: number;
}

export const Iframe = ({ src, width, height, scale }: IProps) => {
    return (
        <div style={{
            width: Number(width) * scale + 'px',
            height: Number(height) * scale + 'px',
            overflow: 'hidden',
            position: 'relative'
        }}>
            <iframe
                name="my-iframe"            
                allow="fullscreen"          
                referrerPolicy="no-referrer" 
                loading="lazy"          
                onWheelCapture={(e) => {
                    console.log(e)
                }}  
                onChange={(e) => {
                    console.log(e)
                }}
                style={{
                    width: `${100 / scale}%`,
                    height: `${100 / scale}%`,
                    transform: `scale(${scale})`,
                    transformOrigin: '0 0',
                    border: 'none',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                src={src}
                className="border-2"
            />
        </div>
    )
}
