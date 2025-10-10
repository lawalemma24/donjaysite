import ProtectedRoute from "@/app/protectedroutes/protected";

export default function DashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your Overview!</p>
      </div>
    </ProtectedRoute>
  );
}
