import { useLanguage } from "../context/LanguageContext.jsx";

export default function LanguageSelector() {
  const { language, setLanguage, languages, t } = useLanguage();
  return (
    <label className="flex items-center gap-1 text-xs text-brand-700" title={t("language")}>
      <span aria-hidden="true">🌐</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="rounded-md border border-brand-200 bg-white px-2 py-1 text-xs font-medium text-brand-800 outline-none focus:border-brand-500"
        aria-label={t("language")}
      >
        {Object.entries(languages).map(([code, info]) => (
          <option key={code} value={code}>{info.nativeName}</option>
        ))}
      </select>
    </label>
  );
}
