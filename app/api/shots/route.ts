import { captureScreenshot } from "@/lib/server/actions";
import { NextRequest, NextResponse } from "next/server"

export const POST = async(req: NextRequest) => {
    const body = await req.json();

    if(!body) return NextResponse.error();

    const {
        src,
        width,
        height
    } = body;

    try {
        const screenshot = await captureScreenshot(src, width, height);
    
        return new NextResponse(screenshot, {
          headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="screenshot.png"',
          },
        });
      } catch (error) {
        console.error("Error capturing screenshot:", error);
        return NextResponse.error();
      }
}