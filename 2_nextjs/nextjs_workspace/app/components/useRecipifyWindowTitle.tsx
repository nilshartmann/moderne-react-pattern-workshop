import { useEffect } from "react";

export function useRecipifyWindowTitle(prefix?: string | null) {
  useEffect(() => {
    const currentTitle = window.document.title;

    if (!prefix) {
      window.document.title = "Recipify Next.JS Demo";
    } else {
      window.document.title = `${prefix} - Recipify Next.JS Demo`;
    }
    return () => {
      window.document.title = currentTitle;
    };
  }, [prefix]);
}
