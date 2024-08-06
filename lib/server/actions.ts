"use server"

import { unlinkSync } from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { v4 } from "uuid";

export async function captureScreenshot(url: string, width: number, height: number) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width, // Ancho deseado
        height, // Altura deseada
        deviceScaleFactor: 2 // Factor de escala para alta resolución
      });
      const fileName =  `${v4()}.png`;
      const filePath =  path.join(__dirname, fileName);
      await page.goto(url);
      const screenShot = await page.screenshot({ path: filePath });
      await browser.close();
      await unlinkSync(filePath);
      return screenShot;
    } catch (error) {
      console.error(error)
      throw error;
    }
}