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
    const isImage = allowedImageTypes.includes(file.type);
    const isDoc = allowedDocTypes.includes(file.type);

    if (!isImage && !isDoc) {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    const category = isImage ? "deal_images" : "deal_documents";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "jaytech");
    data.append("folder", `deals/${category}`);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dc8gfuftv/auto/upload",
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
