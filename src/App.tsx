import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { MainScreen } from "./components/MainScreen";
import { BackgroundMusicPlayer } from "./components/BackgroundMusicPlayer";

export default function App() {
  const [started, setStarted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleStart = () => {
    setShowTransition(true);
    setTimeout(() => {
      setStarted(true);
      setShowTransition(false);
    }, 2500);
  };

  return (
    <div className="relative">
      {/* Background Music Player */}
      <BackgroundMusicPlayer />
      
      <AnimatePresence mode="wait">
        {!started && !showTransition && (
          <motion.div
            key="welcome"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
          >
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {showTransition && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
          
            <div className="text-center relative z-10">
              {/* Main heart with ripple effect */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: [0, 1.3, 1, 1.1, 1],
                  rotate: 0
                }}
                transition={{ duration: 1.8, times: [0, 0.3, 0.5, 0.7, 1], ease: "easeOut" }}
                className="text-9xl mb-8 relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💜
                </motion.div>
                
                {/* Ripple effects */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-4 border-white/30"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{
                      scale: [1, 2.5],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              

              {/* Orbiting hearts */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 text-5xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: Math.cos((i * Math.PI * 2) / 8) * 250,
                    y: Math.sin((i * Math.PI * 2) / 8) * 250,
                    rotate: 360
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    times: [0, 0.5, 1],
                    ease: "easeOut"
                  }}
                >
                  {i % 2 === 0 ? "💜" : "✨"}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {started && !showTransition && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MainScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
