import { Camera, Heart, Plus, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useDevMode } from "../hooks/useDevMode";
import { AddPhotoModal } from "./AddPhotoModal";
import photo1 from "../assets/Anayluka (1).jpeg";
import photo2 from "../assets/Anayluka (2).jpeg";
import photo3 from "../assets/Anayluka (3).jpeg";
import photo4 from "../assets/Anayluka (4).jpeg";
import photo5 from "../assets/Anayluka (5).jpeg";

interface Photo {
  id: number;
  imageUrl: string;
  caption: string;
  date: string;
}

export function AlbumSection() {
  const isDevMode = useDevMode();
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Photo[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem("customPhotos");
    if (saved) {
      setCustomPhotos(JSON.parse(saved));
    }
  }, []);

  const defaultPhotos: Photo[] = [
    {
      id: 1,
      imageUrl: photo1,
      caption: "TE AMO!!!!",
      date: "2026-02-14"
    },
    {
      id: 2,
      imageUrl: photo2,
      caption: "Nuestro amor es infinito ❤️",
      date: "2026-02-14"
    },
    {
      id: 3,
      imageUrl: photo3,
      caption: "Cada dia me enamoro mas de ti",
      date: "2026-02-14"
    },
    {
      id: 4,
      imageUrl: photo4,
      caption: "No sabes cuanto te extraño",
      date: "2026-02-14"
    },
     {
      id: 5,
      imageUrl: photo5,
      caption: "Solo tu, eres la razon de mi existir",
      date: "2026-02-14"
    },
  ];

  const photosData = [...defaultPhotos, ...customPhotos];

  const handleSavePhoto = (newPhoto: { imageUrl: string; caption: string; date: string }) => {
    const id = Math.max(...photosData.map(p => p.id), 0) + 1;
    const photo: Photo = { id, ...newPhoto };
    
    const updated = [...customPhotos, photo];
    setCustomPhotos(updated);
    localStorage.setItem("customPhotos", JSON.stringify(updated));
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
            rotateY: [0, 10, -10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ perspective: 1000 }}
        >
          <Camera className="w-10 h-10 text-[#7F49B4]" />
        </motion.div>

        <h2 className="text-3xl font-bold text-[#cfcfcf] mb-3">
          Nuestro Álbum
        </h2>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#7F49B4] to-transparent max-w-xs mx-auto mb-4"
        />

        <p className="text-[#cfcfcf]/70 mb-6">
          Momentos especiales que guardamos juntos
        </p>

        {isDevMode && (
          <button
            onClick={() => setShowModal(true)}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#7F49B4] rounded-xl hover:bg-[#8e5cc4] transition-all purple-glow"
          >
            <Plus className="w-5 h-5 text-[#cfcfcf]" />
            <span className="text-[#cfcfcf] font-medium">Agregar Foto</span>
          </button>
        )}
      </motion.div>

      {/* Photos grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {photosData.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <motion.div
                className="relative dark-card rounded-2xl p-4 hover:dark-card-hover transition-all"
                whileHover={{ y: -8 }}
              >
                {/* Photo container */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] mb-3">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="w-full">
                      <p className="text-[#cfcfcf] text-sm font-medium leading-tight mb-1 line-clamp-2">
                        {photo.caption}
                      </p>
                      <p className="text-[#7F49B4] text-xs">{photo.date}</p>
                    </div>
                  </div>

                  {/* Border on hover */}
                  <div className="absolute inset-0 border-2 border-[#7F49B4] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Caption */}
                <p className="text-[#cfcfcf]/80 text-sm text-center truncate px-2">
                  {photo.caption}
                </p>

                {/* Hover heart */}
                <motion.div
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#7F49B4] flex items-center justify-center purple-glow-strong">
                    <Heart className="w-4 h-4 text-[#cfcfcf] fill-[#cfcfcf]" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {photosData.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Camera className="w-20 h-20 mx-auto mb-4 text-[#7F49B4]/30" />
          <p className="text-[#cfcfcf]/50">
            Aún no hay fotos. ¡Pronto agregaré nuestros recuerdos!
          </p>
        </motion.div>
      )}

      {/* Photo modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#141414]/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {photosData
                .filter((p) => p.id === selectedPhoto)
                .map((photo) => (
                  <div key={photo.id} className="relative">
                    {/* Photo frame */}
                    <div className="dark-card rounded-3xl p-8 border-2 border-[#7F49B4]/30 purple-glow-strong">
                      {/* Image */}
                      <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] mb-6">
                        <img
                          src={photo.imageUrl}
                          alt={photo.caption}
                          className="w-full h-auto max-h-[70vh] object-contain"
                        />
                      </div>

                      {/* Caption section */}
                      <div className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-3">
                          <Heart className="w-6 h-6 text-[#7F49B4] fill-[#7F49B4]" />
                          <p className="text-[#cfcfcf] text-xl font-medium">
                            {photo.caption}
                          </p>
                          <Heart className="w-6 h-6 text-[#7F49B4] fill-[#7F49B4]" />
                        </div>
                        <p className="text-[#cfcfcf]/70">{photo.date}</p>
                      </div>
                    </div>

                    {/* Decorative glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#7F49B4]/20 via-[#7F49B4]/10 to-[#7F49B4]/20 blur-3xl -z-10" />
                  </div>
                ))}
            
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-[#7F49B4] rounded-full flex items-center justify-center hover:bg-[#8e5cc4] transition-all purple-glow-strong"
              >
                <X className="w-6 h-6 text-[#cfcfcf]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add photo modal */}
      <AnimatePresence>
        {showModal && (
          <AddPhotoModal
            onClose={() => setShowModal(false)}
            onSave={handleSavePhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
