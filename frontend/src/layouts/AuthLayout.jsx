import { Link, Outlet } from "react-router-dom";
import { Logo } from "@/components/common/Logo";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left: brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-slate-950 text-white p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_30%_20%,#F5A623_0,transparent_45%)]" />
        <Link to="/" className="relative z-10">
          <Logo dark />
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="font-heading text-3xl font-extrabold leading-tight">
            From Indian Campuses to Global Opportunities.
          </h2>
          <p className="mt-4 text-slate-300">
            Access your application status, admit card, and National Rank — all in one place.
          </p>
        </div>
        <p className="relative z-10 text-xs text-slate-500">
          An initiative by Startup Times · Operated by Devobyte OPC Private Limited
        </p>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/">
              <Logo dark={false} />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
