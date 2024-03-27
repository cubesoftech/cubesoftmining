import { create } from "zustand";

interface LanguageState {
  availableLanguages: ["en", "ja", "zh", "ko"];
  language: "en" | "ja" | "zh" | "ko";
  changeLanguage: (value: "en" | "ja" | "zh" | "ko") => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  availableLanguages: ["en", "ja", "zh", "ko"],
  language: "en",
  changeLanguage: (value: "en" | "ja" | "zh" | "ko") =>
    set({ language: value }),
}));
