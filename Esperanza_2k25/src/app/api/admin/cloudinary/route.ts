import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const uploadPreset = formData.get("upload_preset") as string || "ml_default";
    const folder = formData.get("folder") as string || "esperanza2k26/crew";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          upload_preset: uploadPreset,
          folder,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ success: true, secure_url: uploadResult.secure_url });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
