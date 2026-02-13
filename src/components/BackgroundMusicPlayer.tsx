import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Play, Pause, Music, ChevronUp } from "lucide-react";
import backgroundMusic from "../assets/background-music.m4a";


export function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  // 🔥 Intentar reproducir automáticamente
  useEffect(() => {
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Si el navegador bloquea autoplay,
            // reproducir en el primer click del usuario
            const resumeOnInteraction = () => {
              audioRef.current?.play();
              setIsPlaying(true);
              window.removeEventListener("click", resumeOnInteraction);
            };
            window.addEventListener("click", resumeOnInteraction);
          });
      }
    };


    attemptPlay();
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handlePause = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleResume = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => { });
        setIsPlaying(true);
      }
    };

    window.addEventListener("pauseBackgroundMusic", handlePause);
    window.addEventListener("resumeBackgroundMusic", handleResume);

    return () => {
      window.removeEventListener("pauseBackgroundMusic", handlePause);
      window.removeEventListener("resumeBackgroundMusic", handleResume);
    };
  }, []);


  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setHasError(true));
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  const handleAudioError = () => {
    setHasError(true);
    setIsPlaying(false);
    console.error("No se pudo cargar el archivo de música. Asegúrate de tener el archivo en: /public/assets/background-music.m4a");
  };

  // Error message
  if (hasError) {
    return (
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.7, type: "spring", bounce: 0.3 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="dark-card rounded-xl px-5 py-4 shadow-2xl max-w-sm border-2 border-orange-500/30">
          <p className="text-[#cfcfcf] font-medium mb-2">⚠️ Archivo de música no encontrado</p>
          <p className="text-[#cfcfcf]/70 text-sm mb-2">
            Agrega tu archivo MP3 en:
          </p>
          <code className="bg-[#1a1a1a] text-[#7F49B4] px-3 py-2 rounded-lg text-xs block mb-2">
            /public/assets/background-music.m4a
          </code>
          <p className="text-[#cfcfcf]/60 text-xs">
            Lee: <strong>COMO-AGREGAR-MUSICA.md</strong>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.7, type: "spring", bounce: 0.3 }}
        className="fixed top-4 right-4 z-50"
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed view
            <motion.button
              key="collapsed"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsExpanded(true)}
              className="group relative w-14 h-14 dark-card rounded-xl hover:dark-card-hover transition-all purple-glow flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Music className={`w-6 h-6 ${isPlaying ? "text-[#7F49B4]" : "text-[#cfcfcf]/70"}`} />

              {/* Playing indicator */}
              {isPlaying && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-[#7F49B4] rounded-full"
                      animate={{
                        height: ["4px", "12px", "4px"],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          ) : (
            // Expanded view
            <motion.div
              key="expanded"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="dark-card rounded-2xl p-5 shadow-2xl border-2 border-[#7F49B4]/20 min-w-[280px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-[#7F49B4]" />
                  <span className="text-[#cfcfcf] font-medium text-sm">Música de Fondo</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-7 h-7 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center transition-colors"
                >
                  <ChevronUp className="w-4 h-4 text-[#cfcfcf]/70" />
                </button>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Play/Pause button */}
                <button
                  onClick={togglePlay}
                  className="w-full flex items-center justify-center gap-3 py-3 bg-[#7F49B4] hover:bg-[#8e5cc4] rounded-xl transition-all purple-glow"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 text-[#cfcfcf]" />
                      <span className="text-[#cfcfcf] font-medium">Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 text-[#cfcfcf] fill-[#cfcfcf]" />
                      <span className="text-[#cfcfcf] font-medium">Reproducir</span>
                    </>
                  )}
                </button>

                {/* Volume controls */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={toggleMute}
                      className="w-9 h-9 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] flex items-center justify-center transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-[#cfcfcf]/70" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#7F49B4]" />
                      )}
                    </button>
                    <span className="text-[#cfcfcf]/70 text-sm font-medium">
                      {Math.round(volume * 100)}%
                    </span>
                  </div>

                  {/* Volume slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-[#7F49B4]
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-webkit-slider-thumb]:hover:scale-110"
                      style={{
                        background: `linear-gradient(to right, #7F49B4 0%, #7F49B4 ${volume * 100}%, #1a1a1a ${volume * 100}%, #1a1a1a 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Audio element */}
      <audio
        ref={audioRef}
<<<<<<< HEAD
        src="/assets/background-music.m4a"
=======
        src={backgroundMusic}
>>>>>>> 022acd361cf8f893d80448a76f00ed2986c25c9c
        loop
        onError={handleAudioError}
      />
    </>
  );
}
