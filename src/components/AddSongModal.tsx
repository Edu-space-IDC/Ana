import { useState } from "react";
import { motion } from "motion/react";
import { X, Save, Upload } from "lucide-react";

interface AddSongModalProps {
  onClose: () => void;
  onSave: (song: { title: string; description: string; audioUrl: string; date: string }) => void;
}

export function AddSongModal({ onClose, onSave }: AddSongModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    } else {
      alert("Por favor selecciona un archivo de audio válido");
    }
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !audioFile) {
      alert("Por favor completa todos los campos y selecciona un archivo de audio");
      return;
    }

    // Create a URL for the audio file
    const audioUrl = URL.createObjectURL(audioFile);
    const today = new Date().toISOString().split("T")[0];

    onSave({
      title: title.trim(),
      description: description.trim(),
      audioUrl,
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
          <h3 className="text-pink-600">Agregar Nueva Canción</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Título de la Canción</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              placeholder="Ej: Mi Canción Para Ti"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              placeholder="Ej: Una canción dedicada a ti"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Archivo de Audio</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
                id="audio-upload"
              />
              <label
                htmlFor="audio-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                {audioFile ? (
                  <p className="text-pink-600">{audioFile.name}</p>
                ) : (
                  <p className="text-gray-500">Haz clic para seleccionar un archivo de audio</p>
                )}
                <p className="text-xs text-gray-400">Formatos: MP3, WAV, OGG</p>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Save className="w-5 h-5" />
              Guardar Canción
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
