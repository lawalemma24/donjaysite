export const uploadToCloudinary = async (file) => {
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
};
