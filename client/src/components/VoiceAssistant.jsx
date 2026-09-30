import { useEffect, useRef, useState } from "react";
import { api, getErrorMessage } from "../api/client.js";
import { useLanguage } from "../context/LanguageContext.jsx";

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export default function VoiceAssistant() {
  const { language, languageInfo, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voiceOutput, setVoiceOutput] = useState(true);
  const recognitionRef = useRef(null);

  const supported = Boolean(getSpeechRecognition());

  useEffect(() => {
    recognitionRef.current?.stop?.();
    recognitionRef.current = null;
    setListening(false);
  }, [language]);

  useEffect(() => () => recognitionRef.current?.stop?.(), []);

  const speak = (text) => {
    if (!voiceOutput || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageInfo.speechCode;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) return;
    recognitionRef.current?.stop?.();
    const recognition = new Recognition();
    recognition.lang = languageInfo.speechCode;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join("");
      setInput(transcript);
      if (event.results[event.results.length - 1].isFinal) {
        setListening(false);
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  const askAssistant = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMessage = { role: "user", content: text };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMessage].slice(-10);
      const { data } = await api.post("/ai/chat", { language, messages: history });
      const answer = data?.message || "I couldn't generate a response.";
      setMessages((current) => [...current, { role: "assistant", content: answer }]);
      speak(answer);
    } catch (error) {
      const message = getErrorMessage(error, "AI assistant is unavailable right now.");
      setMessages((current) => [...current, { role: "assistant", content: message }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askAssistant();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-brand-700 px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-brand-800"
        aria-label={t("voiceAssistant")}
      >
        <span className="text-lg">🎙️</span>
        <span className="hidden sm:inline">{t("voiceAssistant")}</span>
      </button>

      {open && (
        <section className="fixed bottom-20 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-700 px-4 py-3 text-white">
            <div>
              <h2 className="font-bold">{t("voiceAssistant")}</h2>
              <p className="text-xs text-brand-100">{languageInfo.nativeName} · {languageInfo.name}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-xl" aria-label="Close">×</button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto bg-brand-50 p-4">
            {!messages.length && (
              <div className="rounded-xl border border-brand-100 bg-white p-3 text-sm text-brand-700">
                {t("assistantHint")}
              </div>
            )}
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-8 rounded-xl bg-brand-700 p-3 text-sm text-white" : "mr-8 rounded-xl border border-brand-100 bg-white p-3 text-sm text-brand-900"}>
                {message.content}
              </div>
            ))}
            {loading && <div className="mr-8 rounded-xl border border-brand-100 bg-white p-3 text-sm text-brand-600">{t("thinking")}</div>}
          </div>

          <div className="space-y-2 border-t border-brand-100 p-3">
            {!supported && <p className="text-xs text-amber-700">{t("browserSupport")}</p>}
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("typeMessage")}
              rows={2}
              className="input resize-none"
              aria-label={t("typeMessage")}
            />
            <div className="flex flex-wrap items-center gap-2">
              {supported && (
                <button type="button" onClick={listening ? stopListening : startListening} className={listening ? "btn-danger" : "btn-outline"}>
                  {listening ? `⏹ ${t("stop")}` : `🎙️ ${t("speak")}`}
                </button>
              )}
              <button type="button" onClick={askAssistant} disabled={!input.trim() || loading} className="btn-primary">
                {t("send")}
              </button>
              <button type="button" onClick={() => setMessages([])} className="btn-ghost">{t("clear")}</button>
              <label className="ml-auto flex items-center gap-1 text-xs text-brand-700">
                <input type="checkbox" checked={voiceOutput} onChange={(event) => setVoiceOutput(event.target.checked)} />
                {t("voiceOutput")}
              </label>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
