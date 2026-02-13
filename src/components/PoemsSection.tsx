import { Heart, BookOpen, Plus, Feather, Download, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useDevMode } from "../hooks/useDevMode";
import { AddPoemModal } from "./AddPoemModal";
import examplePoemImage from "../assets/poema.png";

interface Poem {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

export function PoemsSection() {
  const isDevMode = useDevMode();
  const [showModal, setShowModal] = useState(false);
  const [customPoems, setCustomPoems] = useState<Poem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("customPoems");
    if (saved) {
      setCustomPoems(JSON.parse(saved));
    }
  }, []);

  const defaultPoems: Poem[] = [
    {
      id: 1,
      title: "Mi Amor",
      content: "Me seguiré enamorando de ti cada día,\nabrazaré tus temores sobre el futuro para\nque disfrutes de este presente juntos.\nSeré tu abrigo en medio de las dudas y\ncompañera en las noches inciertas.\nNo tengo todas las respuestas, pero tengo mis\nmanos, mi voz y este amor que no se\ndesgasta, que se reinventa en cada gesto\ntuyo.",
      date: "2025-08-30",
      imageUrl: examplePoemImage
    }
  ];

  const poemsData = [...defaultPoems, ...customPoems];

  const handleSavePoem = (newPoem: { title: string; content: string; date: string; imageUrl?: string }) => {
    const id = Math.max(...poemsData.map(p => p.id), 0) + 1;
    const poem: Poem = { id, ...newPoem };
    
    const updated = [...customPoems, poem];
    setCustomPoems(updated);
    localStorage.setItem("customPoems", JSON.stringify(updated));
  };

  const handleDownloadImage = (imageUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${title}.png`;
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
            y: [0, -8, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <BookOpen className="w-10 h-10 text-[#7F49B4]" />
        </motion.div>

        <h2 className="text-3xl font-bold text-[#cfcfcf] mb-3">
          Poemas del Corazón
        </h2>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#7F49B4] to-transparent max-w-xs mx-auto mb-4"
        />

        <p className="text-[#cfcfcf]/70 mb-6">
          Palabras que nacen del alma para ti
        </p>

        {isDevMode && (
          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#7F49B4] rounded-xl hover:bg-[#8e5cc4] transition-all purple-glow"
          >
            <Plus className="w-5 h-5 text-[#cfcfcf]" />
            <span className="text-[#cfcfcf] font-medium">Agregar Poema</span>
          </button>
        )}
      </motion.div>

      {/* Poems grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <AnimatePresence mode="popLayout">
          {poemsData.map((poem, index) => (
            <motion.div
              key={poem.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative dark-card rounded-2xl p-8 hover:dark-card-hover transition-all h-full scan-line">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#7F49B4]/10 to-transparent rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#7F49B4]/10 to-transparent rounded-bl-2xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#7F49B4]/20 border border-[#7F49B4]/30 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-[#7F49B4] fill-[#7F49B4]" />
                      </div>
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#cfcfcf] mb-2">
                        {poem.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#7F49B4]">
                        <Feather className="w-4 h-4" />
                        <span>{poem.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Poem content */}
                  <div className="bg-[#1a1a1a]/50 rounded-xl p-6 border border-[#7F49B4]/10 mb-4">
                    <p className="text-[#cfcfcf]/90 whitespace-pre-line leading-relaxed italic">
                      {poem.content}
                    </p>
                  </div>

                  {/* Image section */}
                  {poem.imageUrl && (
                    <div className="mt-4 space-y-3">
                      <div className="relative group/img rounded-xl overflow-hidden border-2 border-[#7F49B4]/20 hover:border-[#7F49B4]/40 transition-all cursor-pointer">
                        <img
                          src={poem.imageUrl}
                          alt={poem.title}
                          className="w-full h-auto"
                          onClick={() => setSelectedImage(poem.imageUrl!)}
                        />
                        
                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-[#141414]/80 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center gap-3">
                          <button
                            onClick={() => setSelectedImage(poem.imageUrl!)}
                            className="w-12 h-12 rounded-xl bg-[#7F49B4] hover:bg-[#8e5cc4] flex items-center justify-center transition-all purple-glow"
                            title="Ver en grande"
                          >
                            <ZoomIn className="w-6 h-6 text-[#cfcfcf]" />
                          </button>
                          <button
                            onClick={() => handleDownloadImage(poem.imageUrl!, poem.title)}
                            className="w-12 h-12 rounded-xl bg-[#7F49B4] hover:bg-[#8e5cc4] flex items-center justify-center transition-all purple-glow"
                            title="Descargar"
                          >
                            <Download className="w-6 h-6 text-[#cfcfcf]" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-[#cfcfcf]/50 text-center">
                        Click para ampliar o descargar
                      </p>
                    </div>
                  )}

                  {/* Decorative line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-[#7F49B4]/50 to-transparent mt-6"
                  />
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#7F49B4]/0 group-hover:bg-[#7F49B4]/5 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {poemsData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <BookOpen className="w-20 h-20 mx-auto mb-4 text-[#7F49B4]/30" />
          <p className="text-[#cfcfcf]/50">
            Aún no hay poemas. ¡Pronto escribiré más para ti!
          </p>
        </motion.div>
      )}

      {/* Image viewer modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#141414]/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dark-card rounded-3xl p-6 border-2 border-[#7F49B4]/30 purple-glow-strong">
                <img
                  src={selectedImage}
                  alt="Poema"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#7F49B4] rounded-full flex items-center justify-center hover:bg-[#8e5cc4] transition-all purple-glow-strong"
              >
                <X className="w-6 h-6 text-[#cfcfcf]" />
              </button>

              {/* Download button */}
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = selectedImage;
                  link.download = "poema.png";
                  link.click();
                }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-[#7F49B4] rounded-xl hover:bg-[#8e5cc4] transition-all purple-glow-strong"
              >
                <Download className="w-5 h-5 text-[#cfcfcf]" />
                <span className="text-[#cfcfcf] font-medium">Descargar</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AddPoemModal
            onClose={() => setShowModal(false)}
            onSave={handleSavePoem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
