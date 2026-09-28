import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogIn, ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/common/Button";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { NAV_LINKS, SITE } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isAuthed = user && user.role;

  return (
    <div className="sticky top-0 z-50">
      {/* Top announcement bar with countdown */}
      <div className="bg-[#F5A623] text-slate-950 text-xs font-medium py-1.5 px-4 flex items-center justify-center gap-2 text-center">
        <span className="hidden sm:inline">CET 2027 — Batch 1 applications open Oct 1, 2026.</span>
        <CountdownTimer target={SITE.applicationCloseDate} variant="inline" testId="topbar-countdown" />
      </div>

      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" data-testid="header-logo-link" className="shrink-0">
              <Logo dark />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-[#F5A623]" : "text-slate-300 hover:text-white"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {isAuthed ? (
                <>
                  <Button
                    to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                    variant="ghostLight"
                    size="sm"
                    data-testid="header-dashboard-btn"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Button>
                  <button
                    onClick={logout}
                    data-testid="header-logout-btn"
                    className="text-slate-300 hover:text-white transition-colors"
                    aria-label="Log out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <Button to="/login" variant="ghostLight" size="sm" data-testid="header-login-btn">
                  <LogIn className="h-4 w-4" /> Login
                </Button>
              )}
              <Button to="/apply" size="sm" data-testid="header-apply-btn">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setOpen((o) => !o)}
              data-testid="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium",
                    isActive ? "bg-slate-800 text-[#F5A623]" : "text-slate-300 hover:bg-slate-800"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-2">
              {isAuthed ? (
                <Button
                  to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                  variant="outline"
                  size="sm"
                >
                  Dashboard
                </Button>
              ) : (
                <Button to="/login" variant="ghostLight" size="sm" data-testid="mobile-login-btn">
                  <LogIn className="h-4 w-4" /> Login
                </Button>
              )}
              <Button to="/apply" size="sm" data-testid="mobile-apply-btn">
                Apply <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
