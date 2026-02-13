import { Music, Download, Play, Pause, Plus, Disc3 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDevMode } from "../hooks/useDevMode";
import { AddSongModal } from "./AddSongModal";
import miCancion1 from "../assets/1.mp3";
import miCancion2 from "../assets/2.mp3";
import miCancion3 from "../assets/3.mp3";

interface Song {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  date: string;
}

export function SongsSection() {
  const isDevMode = useDevMode();
  const [showModal, setShowModal] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [audioErrors, setAudioErrors] = useState<Set<number>>(new Set());
  const [customSongs, setCustomSongs] = useState<Song[]>([]);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  useEffect(() => {
    const saved = localStorage.getItem("customSongs");
    if (saved) {
      setCustomSongs(JSON.parse(saved));
    }
  }, []);

  const defaultSongs: Song[] = [
    {
      id: 1,
      title: "Tú Y Yo - La Misma Gente",
      description: "",
      audioUrl: miCancion1,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Eres tú",
      description: "Dedicada a ti mi amor",
      audioUrl: miCancion2,
      date: "2024-02-14"
    },
    {
      id: 3,
      title: "Come Back Home",
      description: "Dedicada a ti mi amor",
      audioUrl: miCancion3,
      date: "2024-02-14"
    }
  ];

  const songsData = [...defaultSongs, ...customSongs];

  const handleSaveSong = (newSong: { title: string; description: string; audioUrl: string; date: string }) => {
    const id = Math.max(...songsData.map(s => s.id), 0) + 1;
    const song: Song = { id, ...newSong };

    const updated = [...customSongs, song];
    setCustomSongs(updated);
    localStorage.setItem("customSongs", JSON.stringify(updated));
  };

  const handlePlayPause = (id: number) => {
    if (audioErrors.has(id)) return;

    const selectedAudio = audioRefs.current[id];
    if (!selectedAudio) return;

    if (currentPlaying === id) {
      selectedAudio.pause();
      setCurrentPlaying(null);

      // 🔥 Avisar que puede volver la música de fondo
      window.dispatchEvent(new Event("resumeBackgroundMusic"));
    } else {
      // 🔥 Avisar que debe pausarse la música de fondo
      window.dispatchEvent(new Event("pauseBackgroundMusic"));

      if (currentPlaying !== null) {
        audioRefs.current[currentPlaying]?.pause();
      }

      selectedAudio.play().catch(() => {
        setAudioErrors(prev => new Set(prev).add(id));
        setCurrentPlaying(null);
      });

      setCurrentPlaying(id);
    }
  };


  const handleAudioError = (id: number) => {
    setAudioErrors(prev => new Set(prev).add(id));
    if (currentPlaying === id) {
      setCurrentPlaying(null);
    }
  };

  const handleDownload = (audioUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#7F49B4]/20 border border-[#7F49B4]/30 mb-6 purple-glow"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Music className="w-10 h-10 text-[#7F49B4]" />
        </motion.div>

        <h2 className="text-3xl font-bold text-[#cfcfcf] mb-3">
          Mis Dedicatorias
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#7F49B4] to-transparent max-w-xs mx-auto mb-4"
        />

        <p className="text-[#cfcfcf]/70 mb-6">
          Cada canción es una parte de mi corazón que late por ti
        </p>

        {isDevMode && (
          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#7F49B4] rounded-xl hover:bg-[#8e5cc4] transition-all purple-glow"
          >
            <Plus className="w-5 h-5 text-[#cfcfcf]" />
            <span className="text-[#cfcfcf] font-medium">Agregar Canción</span>
          </button>
        )}
      </motion.div>

      {/* Songs list */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <AnimatePresence mode="popLayout">
          {songsData.map((song, index) => {
            const isPlaying = currentPlaying === song.id;
            const hasError = audioErrors.has(song.id);

            return (
              <motion.div
                key={song.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative dark-card rounded-2xl p-6 hover:dark-card-hover transition-all scan-line">
                  {/* Playing indicator */}
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 border-2 border-[#7F49B4] rounded-2xl"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <div className="flex items-center gap-5 relative z-10">
                    {/* Play button */}
                    <button
                      onClick={() => handlePlayPause(song.id)}
                      disabled={hasError}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center transition-all ${isPlaying
                        ? "bg-[#7F49B4] purple-glow-strong"
                        : "bg-[#7F49B4]/20 hover:bg-[#7F49B4] border border-[#7F49B4]/30"
                        } ${hasError ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {isPlaying ? (
                        <Pause className="w-7 h-7 text-[#cfcfcf]" />
                      ) : (
                        <Play className="w-7 h-7 text-[#cfcfcf] fill-[#cfcfcf] ml-1" />
                      )}
                    </button>

                    {/* Song info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#cfcfcf] truncate mb-1">
                        {song.title}
                      </h3>
                      <p className="text-sm text-[#cfcfcf]/60 mb-2 line-clamp-1">
                        {song.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#7F49B4] bg-[#7F49B4]/10 px-3 py-1 rounded-full border border-[#7F49B4]/20">
                          {song.date}
                        </span>

                        {isPlaying && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-xs text-[#cfcfcf] bg-[#7F49B4] px-3 py-1 rounded-full flex items-center gap-1"
                          >
                            <Disc3 className="w-3 h-3 animate-spin" />
                            Reproduciendo
                          </motion.span>
                        )}
                      </div>

                      {hasError && (
                        <p className="text-xs text-orange-400 mt-2">
                          ⚠️ Audio no disponible
                        </p>
                      )}
                    </div>

                    {/* Download button */}
                    <button
                      onClick={() => handleDownload(song.audioUrl, song.title)}
                      className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#7F49B4]/20 hover:border-[#7F49B4] hover:bg-[#7F49B4]/10 transition-all flex items-center justify-center"
                    >
                      <Download className="w-5 h-5 text-[#7F49B4]" />
                    </button>
                  </div>

                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[song.id] = el;
                    }}
                    src={song.audioUrl}
                    onEnded={() => {
                      setCurrentPlaying(null);
                      window.dispatchEvent(new Event("resumeBackgroundMusic"));
                    }}
                    onError={() => handleAudioError(song.id)}
                  />

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {songsData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Music className="w-20 h-20 mx-auto mb-4 text-[#7F49B4]/30" />
          <p className="text-[#cfcfcf]/50">
            Aún no hay canciones. ¡Pronto agregaré más!
          </p>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AddSongModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveSong}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
