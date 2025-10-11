// app/unauthorized/page.js
export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Access Denied</h1>
      <p className="text-gray-500 mt-2">
        You do not have permission to view this page.
      </p>
    </div>
  );
}
