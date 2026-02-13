import { useState, useEffect } from "react";

export function useDevMode() {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check if dev mode is enabled in localStorage
    const devMode = localStorage.getItem("devMode") === "true";
    setIsDevMode(devMode);

    // Expose global function to enable dev mode
    (window as any).enableDevMode = () => {
      localStorage.setItem("devMode", "true");
      setIsDevMode(true);
      console.log("✅ Modo Desarrollador Activado");
      console.log("🔄 Recarga la página para ver los botones");
    };

    (window as any).disableDevMode = () => {
      localStorage.setItem("devMode", "false");
      setIsDevMode(false);
      console.log("❌ Modo Desarrollador Desactivado");
      console.log("🔄 Recarga la página");
    };

    // Show instructions on first load
    if (!localStorage.getItem("devModeInstructionsShown")) {
      console.log("💡 Para activar el modo desarrollador, escribe: enableDevMode()");
      localStorage.setItem("devModeInstructionsShown", "true");
    }
  }, []);

  return isDevMode;
}
