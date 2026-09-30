import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function AuthLanding() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center py-10">
      <div className="grid w-full overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-xl md:grid-cols-2">
        <div className="bg-brand-700 p-8 text-white md:p-12">
          <div className="text-5xl">🌱</div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight">Welcome to AgriLink</h1>
          <p className="mt-4 text-brand-50">
            A digital marketplace connecting farmers and buyers for transparent, convenient produce trading.
          </p>
          <div className="mt-8 space-y-3 text-sm text-brand-50">
            <div>✓ Buy directly from farmers</div>
            <div>✓ Manage produce listings</div>
            <div>✓ Track orders and revenue</div>
            <div>✓ Use multilingual voice assistance</div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12">
          <h2 className="text-2xl font-bold text-brand-900">Get started</h2>
          <p className="mt-2 text-sm text-brand-600">Sign in if you already have an account, or create a new one.</p>

          <div className="mt-8 space-y-3">
            <Link to="/login" className="btn-primary block w-full text-center">
              {t("signIn")}
            </Link>
            <Link to="/register" className="btn-outline block w-full text-center">
              Create an account
            </Link>
          </div>

          <Link to="/browse" className="mt-6 text-center text-sm font-semibold text-brand-700 hover:underline">
            Continue browsing as a guest →
          </Link>
        </div>
      </div>
    </div>
  );
}
