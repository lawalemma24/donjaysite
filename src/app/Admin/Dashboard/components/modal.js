"use client";

export default function Modal({
  open = true,
  onClose = () => {},
  children,
  size = "md",
}) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} mx-4`}>
        <div className="bg-white rounded-lg shadow-lg p-6">{children}</div>
      </div>
    </div>
  );
}
