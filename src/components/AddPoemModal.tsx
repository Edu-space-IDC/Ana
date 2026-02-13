import { useState } from "react";
import { motion } from "motion/react";
import { X, Save } from "lucide-react";

interface AddPoemModalProps {
  onClose: () => void;
  onSave: (poem: { title: string; content: string; date: string }) => void;
}

export function AddPoemModal({ onClose, onSave }: AddPoemModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    onSave({
      title: title.trim(),
      content: content.trim(),
      date: today,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-purple-600">Agregar Nuevo Poema</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Ej: Tus Ojos"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Contenido del Poema</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none h-40 resize-none"
              placeholder="Escribe tu poema aquí...&#10;Cada línea será un verso"
            />
            <p className="text-sm text-gray-500 mt-2">
              Cada línea nueva será un verso del poema
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Save className="w-5 h-5" />
              Guardar Poema
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
