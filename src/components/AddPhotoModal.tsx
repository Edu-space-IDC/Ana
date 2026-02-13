import { useState } from "react";
import { motion } from "motion/react";
import { X, Save, Upload } from "lucide-react";

interface AddPhotoModalProps {
  onClose: () => void;
  onSave: (photo: { imageUrl: string; caption: string; date: string }) => void;
}

export function AddPhotoModal({ onClose, onSave }: AddPhotoModalProps) {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      alert("Por favor selecciona una imagen válida");
    }
  };

  const handleSave = () => {
    if (!caption.trim() || !imageFile) {
      alert("Por favor completa todos los campos y selecciona una imagen");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    onSave({
      imageUrl: previewUrl,
      caption: caption.trim(),
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
          <h3 className="text-blue-600">Agregar Nueva Foto</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Descripción de la Foto</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Ej: Nuestro primer día juntos"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Imagen</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {previewUrl ? (
                  <div className="w-full max-w-md">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <p className="text-blue-600 mt-2">Haz clic para cambiar</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400" />
                    <p className="text-gray-500">Haz clic para seleccionar una imagen</p>
                    <p className="text-xs text-gray-400">Formatos: JPG, PNG, GIF</p>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Save className="w-5 h-5" />
              Guardar Foto
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
