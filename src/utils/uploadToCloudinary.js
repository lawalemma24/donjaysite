export const uploadToCloudinary = async (files, maxImages = 8) => {
  if (!files || files.length === 0) return [];

  // Limit the number of files
  const limitedFiles = Array.from(files).slice(0, maxImages);

  const uploadPromises = limitedFiles.map(async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "donjaysite1");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvp775nz7/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();

    if (!res.ok) {
      console.error("Cloudinary error:", json);
      throw new Error(json.error?.message || "Cloudinary upload failed");
    }

    return json.secure_url;
  });

  const urls = await Promise.all(uploadPromises);
  return urls;
};
