import { motion } from "motion/react";
import { Play, Volume2, Heart, Sparkles } from "lucide-react";
import { useState, useRef } from "react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = () => {
    if (audioRef.current && !audioError) {
      audioRef.current.play().catch(() => {
        setAudioError(true);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    setAudioError(true);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#141414]">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(127,73,180,0.15),transparent_70%)]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#7F49B4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Top decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#7F49B4] to-transparent mb-12"
        />

        {/* Avatar section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* Glow rings */}
          <div className="relative inline-block">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 -m-8 rounded-full border-2 border-[#7F49B4] blur-xl"
            />
            
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 -m-4 rounded-full border border-[#7F49B4] blur-md"
            />

            {/* Avatar container */}
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#7F49B4] to-[#a855f7] p-1 shadow-2xl purple-glow">
                <div className="w-full h-full rounded-full bg-[#1a1a1a] p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/avatar.jpg"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-[#7F49B4] to-[#a855f7] flex items-center justify-center text-6xl">
                      💜
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting hearts */}
              {[...Array(4)].map((_, i) => {
                const angle = (i * 90) * Math.PI / 180;
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: Math.cos(angle + Date.now() / 1000) * 110,
                      y: Math.sin(angle + Date.now() / 1000) * 110,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Heart className="w-4 h-4 fill-[#7F49B4] text-[#7F49B4]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-[#cfcfcf] neon-text"
        >
          Hola Mi Amor
        </motion.h1>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#7F49B4] to-transparent max-w-md mx-auto mb-6"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-lg text-[#cfcfcf]/80 mb-12 max-w-lg mx-auto"
        >
          ¿Quieres Saber cuanto te amo?
        </motion.p>

        {/* Audio button */}
        {!audioError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={handlePlayAudio}
              disabled={isPlaying}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] border border-[#7F49B4]/30 rounded-xl hover:border-[#7F49B4] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-[#7F49B4]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Scan line effect */}
              <div className="absolute inset-0 shimmer-purple opacity-0 group-hover:opacity-100" />

              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-[#7F49B4] relative z-10" />
              ) : (
                <Play className="w-5 h-5 text-[#7F49B4] relative z-10 fill-[#7F49B4]" />
              )}
              <span className="text-[#cfcfcf] font-medium relative z-10">
                {isPlaying ? "Escuchando mensaje..." : "Escuchar mi mensaje"}
              </span>
            </button>

            <audio
              ref={audioRef}
              src="/audio-message.mp3"
              onEnded={handleAudioEnded}
              onError={handleAudioError}
            />
          </motion.div>
        )}

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-[#7F49B4] rounded-xl hover:bg-[#8e5cc4] transition-all overflow-hidden purple-glow-strong"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />

            <span className="text-[#cfcfcf] text-lg font-semibold relative z-10">
              Continuar
            </span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative z-10"
            >
              <Heart className="w-6 h-6 fill-[#cfcfcf] text-[#cfcfcf]" />
            </motion.div>
          </button>
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#7F49B4] to-transparent mt-12"
        />

        {/* Sparkle decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex justify-center gap-4 mt-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <Sparkles className="w-4 h-4 text-[#7F49B4]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
