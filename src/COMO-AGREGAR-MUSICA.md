# 🎵 CÓMO AGREGAR MÚSICA DE FONDO

## ⚠️ IMPORTANTE: La ubicación correcta es /public/assets/

### ✅ Paso 1: Ubicar la carpeta correcta
La carpeta ya está creada: **`/public/assets/`**

Deberías ver esta estructura:
```
tu-proyecto/
├── public/
│   └── assets/          👈 LA MÚSICA VA AQUÍ
│       └── .gitkeep
├── components/
├── styles/
├── App.tsx
└── package.json
```

### ✅ Paso 2: Agregar tu archivo de música
1. Consigue un archivo de música en formato **MP3** 
2. Renómbralo a **`background-music.mp3`**
3. Colócalo dentro de **`/public/assets/`**

**Ruta final:** `/public/assets/background-music.mp3`

### ✅ Paso 3: Verificar
1. **Recarga la página** (F5 o Ctrl+Shift+R para recarga forzada)
2. El **mensaje de error rojo desaparecerá**
3. Verás el **botón de música flotante** rosa/morado
4. La música comenzará a sonar automáticamente (o haz clic en Play si el navegador bloquea el autoplay)

---

## 🔍 Solución de problemas

### ❌ "Sigo viendo el mensaje de error rojo"
Verifica que:
- El archivo está en `/public/assets/` (NO en `/assets/`)
- El nombre es exactamente `background-music.mp3` (minúsculas, sin espacios)
- El formato es MP3 (no WAV, no OGG, no M4A)
- Hiciste una recarga forzada: **Ctrl+Shift+R** (Windows) o **Cmd+Shift+R** (Mac)

### 🔇 "El botón aparece pero no suena nada"
Esto es normal en algunos navegadores:
1. Los navegadores bloquean el autoplay para mejorar la experiencia del usuario
2. **Solución:** Haz clic en el botón flotante para expandirlo
3. Presiona el botón **"Reproducir"**
4. Ajusta el volumen si está muy bajo

### 📱 "Estoy en móvil y no funciona"
En móviles, el autoplay casi siempre está bloqueado:
1. **Toca el botón flotante** en la esquina superior derecha
2. **Toca "Reproducir"**
3. La música comenzará

---

## 🎮 Uso del reproductor

### Vista colapsada (pequeña):
- **Ícono de música** con animación
- **Barras verdes animadas** cuando está reproduciendo
- **Click/tap** para expandir y ver controles

### Vista expandida (grande):
- ▶️ **Botón Play/Pause** - Reproducir o pausar la música
- 🔊 **Botón Mute** - Silenciar o activar el sonido
- 🎚️ **Control de volumen** - Desliza para ajustar de 0% a 100%
- **Porcentaje visible** - Muestra el volumen actual

---

## 🎨 Usar otra canción o cambiar el nombre

### Opción 1 (más fácil):
Renombra tu archivo a `background-music.mp3` y colócalo en `/public/assets/`

### Opción 2 (avanzado):
Si tu archivo tiene otro nombre (ejemplo: `mi-cancion-romantica.mp3`):

1. Coloca el archivo en `/public/assets/mi-cancion-romantica.mp3`
2. Edita el archivo `/components/BackgroundMusicPlayer.tsx`
3. Busca la línea 107 que dice:
   ```tsx
   src="/assets/background-music.mp3"
   ```
4. Cámbiala por:
   ```tsx
   src="/assets/mi-cancion-romantica.mp3"
   ```

---

## 📝 Formatos de audio soportados

Los navegadores web modernos soportan:
- ✅ **MP3** (recomendado - mejor compatibilidad)
- ✅ **WAV** (alta calidad pero archivo grande)
- ✅ **OGG** (buena compresión)
- ⚠️ **M4A/AAC** (funciona en algunos navegadores)

**Recomendación:** Usa MP3 para máxima compatibilidad.

---

## 🚀 Cuando subas a Vercel

Cuando despliegues tu aplicación a Vercel:
1. **Asegúrate de incluir** la carpeta `/public/` en tu repositorio
2. El archivo `/public/assets/background-music.mp3` **debe estar** en tu repositorio de GitHub/GitLab
3. Vercel automáticamente servirá los archivos de la carpeta `public/`
4. La música funcionará en producción sin cambios adicionales

---

**¡Disfruta tu página web romántica con música de fondo! 💕🎵**
