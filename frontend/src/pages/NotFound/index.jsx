import { Button } from "@/components/common/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4" data-testid="not-found-page">
      <div className="font-heading text-7xl font-extrabold text-[#F5A623]">404</div>
      <h1 className="mt-4 font-heading text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you are looking for doesn't exist or has moved.</p>
      <div className="mt-8">
        <Button to="/">Back to Home</Button>
      </div>
    </div>
  );
}
