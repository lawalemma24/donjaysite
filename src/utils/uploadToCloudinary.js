export const uploadToCloudinary = async (
  files,
  {
    maxFiles = 8,
    allowedImageTypes = ["image/jpeg", "image/png", "image/webp"],
    allowedDocTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  } = {}
) => {
  if (!files || files.length === 0) return [];

  const limitedFiles = Array.from(files).slice(0, maxFiles);

  const uploadPromises = limitedFiles.map(async (file) => {
    const isImageOrPdf = file.type.startsWith("image/") || file.type === "application/pdf";
    const isDoc = allowedDocTypes.includes(file.type);

    if (!isImageOrPdf && !isDoc) {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    const category = isImageOrPdf ? "deal_images" : "deal_documents";
    const resourceType = isImageOrPdf ? "image" : "raw";

    console.log(`📦 Preparing to upload ${file.name} (${file.size} bytes, type: ${file.type}) to category: ${category} as ${resourceType}`);

    if (file.size === 0) {
      throw new Error(`File ${file.name} is empty (0 bytes)`);
    }

    const data = new FormData();
    data.append("file", file, file.name);
    data.append("upload_preset", "jaytech");
    data.append("folder", `deals/${category}`);
    data.append("resource_type", resourceType);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dc8gfuftv/${resourceType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();

    if (!res.ok) {
      console.error("Cloudinary error:", json);
      throw new Error(json.error?.message || "Upload failed");
    }

    return {
      url: json.secure_url,
      public_id: json.public_id,
      type: json.resource_type, // image | raw
      format: json.format,
      category, // deal_images | deal_documents
      originalName: file.name,
      size: file.size,
    };
  });

  return Promise.all(uploadPromises);
};
