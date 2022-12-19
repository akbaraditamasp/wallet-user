import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex justify-center">
      <div style={{ maxWidth: 768 }} className="min-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
}
