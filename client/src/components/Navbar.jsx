import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import LanguageSelector from "./LanguageSelector.jsx";

const navByRole = {
  buyer: [
    { to: "/browse", label: "Browse" },
    { to: "/orders", label: "My Orders" },
    { to: "/pricing", label: "Plans" },
  ],
  farmer: [
    { to: "/farmer", label: "Dashboard", end: true },
    { to: "/farmer/listings", label: "Listings" },
    { to: "/farmer/orders", label: "Orders" },
    { to: "/farmer/analytics", label: "Analytics" },
    { to: "/pricing", label: "Plans" },
  ],
  admin: [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/listings", label: "Listings" },
  ],
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (!user) {
    return (
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-brand-700">
            <span className="text-xl">🌱</span>
            <span>AgriLink</span>
          </Link>
          <nav className="flex gap-2">
            <LanguageSelector />
            <Link to="/browse" className="btn-ghost">{t("browse")}</Link>
            <Link to="/login" className="btn-primary">{t("signIn")}</Link>
          </nav>
        </div>
      </header>
    );
  }

  const links = navByRole[user.role] || [];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-brand-700">
          <span className="text-xl">🌱</span>
          <span>AgriLink</span>
        </Link>

        <nav className="flex flex-1 items-center justify-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm font-medium ${
                  isActive ? "bg-brand-100 text-brand-800" : "text-brand-700 hover:bg-brand-50"
                }`
              }
            >
              {({ Browse: t("browse"), "My Orders": t("orders"), Plans: t("plans"), Dashboard: t("dashboard"), Listings: t("listings"), Orders: t("orders"), Analytics: t("analytics"), Users: t("users") })[l.label] || l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <div className="hidden text-right sm:block">
            <div className="text-sm font-semibold text-brand-900">{user.name}</div>
            <div className="text-xs capitalize text-brand-600">{user.role}</div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="btn-outline"
          >
            {t("signOut")}
          </button>
        </div>
      </div>
    </header>
  );
}
