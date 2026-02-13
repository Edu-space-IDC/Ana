import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Music, BookOpen, Camera, Heart } from "lucide-react";
import { SongsSection } from "./SongsSection";
import { PoemsSection } from "./PoemsSection";
import { AlbumSection } from "./AlbumSection";

type Tab = "songs" | "poems" | "album";

export function MainScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("songs");

  const tabs = [
    { id: "songs" as Tab, label: "Canciones", icon: Music },
    { id: "poems" as Tab, label: "Poemas", icon: BookOpen },
    { id: "album" as Tab, label: "Nuestro Álbum", icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-[#141414] relative overflow-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 grid-pattern opacity-20" />
      
      {/* Radial gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(127,73,180,0.1),transparent_50%)]" />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-[#141414]/80 border-b border-[#7F49B4]/20"
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Title section */}
          <div className="text-center mb-8">
            <motion.div 
              className="flex items-center justify-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-[#7F49B4] fill-[#7F49B4]" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#cfcfcf] neon-text">
                Con cariño: Ana
              </h1>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="w-8 h-8 text-[#7F49B4] fill-[#7F49B4]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#7F49B4] to-transparent max-w-md mx-auto mb-4"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-[#cfcfcf]/70"
            >
              Un lugar especial lleno de amor
            </motion.p>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 justify-center flex-wrap">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`relative group px-8 py-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-[#7F49B4] text-[#cfcfcf]"
                      : "bg-[#1a1a1a] text-[#cfcfcf]/70 hover:bg-[#252525] hover:text-[#cfcfcf] border border-[#7F49B4]/20 hover:border-[#7F49B4]/40"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active background animation */}
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#7F49B4] rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                      <motion.div
                        className="absolute inset-0 shimmer-purple rounded-xl"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </>
                  )}

                  <div className="relative z-10 flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-lg" : ""}`} />
                    <span className="font-medium">{tab.label}</span>
                  </div>

                  {/* Purple glow on active */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl blur-xl bg-[#7F49B4]/50 -z-10 pulse-purple" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 pb-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "songs" && <SongsSection />}
            {activeTab === "poems" && <PoemsSection />}
            {activeTab === "album" && <AlbumSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#7F49B4] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
