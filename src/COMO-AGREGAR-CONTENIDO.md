# 💝 Guía Rápida: Cómo Agregar Contenido

## 📖 AGREGAR POEMAS

**Archivo a editar:** `/components/PoemsSection.tsx`

### Pasos:
1. Abre el archivo `/components/PoemsSection.tsx`
2. Busca el array `poemsData` (línea 12 aproximadamente)
3. Agrega tu nuevo poema siguiendo este formato:

```typescript
{
  id: 4,
  title: "Título de tu poema",
  content: "Primera línea del poema\nSegunda línea del poema\nTercera línea",
  date: "2024-12-03"
}
```

### ⚠️ IMPORTANTE:
- Usa `\n` para crear saltos de línea entre versos
- El `id` debe ser único (usa el siguiente número disponible)
- No olvides la coma `,` entre cada poema (excepto el último)

### Ejemplo completo:
```typescript
const poemsData: Poem[] = [
  {
    id: 1,
    title: "Tus Ojos",
    content: "Hay luces que nunca quisiera que se apaguen,\ntus ojos, por ejemplo.",
    date: "2024-12-03"
  },
  {
    id: 2,
    title: "Mi Nuevo Poema",
    content: "Aquí va tu poema\nCon múltiples líneas\nTan bello como tu amor",
    date: "2024-12-05"
  }
];
```

---

## 🎵 AGREGAR CANCIONES/AUDIOS

**Archivos a editar:** 
1. `/public/audios/` (para subir los archivos MP3)
2. `/components/SongsSection.tsx` (para agregar la información)

### Pasos:

#### 1. Sube tu archivo de audio:
- Graba o prepara tu canción en formato MP3
- Nómbrala sin espacios ni tildes, ejemplo: `mi-cancion-favorita.mp3`
- Súbela a la carpeta `/public/audios/`

#### 2. Agrega la información:
- Abre `/components/SongsSection.tsx`
- Busca el array `songsData` (línea 17 aproximadamente)
- Agrega tu canción:

```typescript
{
  id: 3,
  title: "Título de tu canción",
  description: "Una dedicatoria o descripción corta",
  audioUrl: "/audios/mi-cancion-favorita.mp3",
  date: "2024-12-03"
}
```

### ⚠️ IMPORTANTE:
- El `audioUrl` debe coincidir EXACTAMENTE con el nombre del archivo que subiste
- Usa el formato: `/audios/nombre-del-archivo.mp3`
- El `id` debe ser único
- No olvides la coma `,` entre cada canción (excepto la última)

### Ejemplo completo:
```typescript
const songsData: Song[] = [
  {
    id: 1,
    title: "Mi Primera Canción Para Ti",
    description: "Una canción especial",
    audioUrl: "/audios/cancion1.mp3",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Te Amo",
    description: "Dedicada con todo mi corazón",
    audioUrl: "/audios/te-amo.mp3",
    date: "2024-12-03"
  }
];
```

---

## 📷 AGREGAR FOTOS

**Archivo a editar:** `/components/AlbumSection.tsx`

### Pasos:

#### Opción 1: Aquí en el editor
Sube la foto y yo la agrego automáticamente.

#### Opción 2: Cuando esté en Vercel

1. Sube tus fotos a `/public/photos/`
2. Abre `/components/AlbumSection.tsx`
3. Busca el array `photosData` (línea 12 aproximadamente)
4. Agrega tu foto:

```typescript
{
  id: 2,
  imageUrl: "/photos/nombre-foto.jpg",
  caption: "Descripción de la foto",
  date: "2024-12-03"
}
```

---

## 🎤 CONFIGURAR AUDIO Y AVATAR DE BIENVENIDA

### Avatar (Tu foto):
1. Prepara una foto tuya (cuadrada preferiblemente)
2. Nómbrala exactamente: `avatar.jpg`
3. Súbela a `/public/avatar.jpg`

### Audio de bienvenida:
1. Graba tu mensaje: "Hola mi amor, te hice esto para demostrarte cuánto te amo, así que, continuemos"
2. Guárdalo como: `welcome-audio.mp3`
3. Súbelo a `/public/welcome-audio.mp3`

---

## 📁 ESTRUCTURA DE CARPETAS

```
mi-proyecto/
├── public/
│   ├── audios/
│   │   ├── cancion1.mp3
│   │   ├── cancion2.mp3
│   │   └── te-amo.mp3
│   ├── photos/
│   │   ├── foto1.jpg
│   │   └── foto2.jpg
│   ├── avatar.jpg
│   └── welcome-audio.mp3
├── components/
│   ├── PoemsSection.tsx    ← Edita el array poemsData
│   ├── SongsSection.tsx    ← Edita el array songsData
│   └── AlbumSection.tsx    ← Edita el array photosData
```

---

## 🚀 SUBIR CAMBIOS A VERCEL

### Primera vez:
1. Sube tu proyecto a GitHub
2. Conecta GitHub con Vercel
3. Vercel desplegará automáticamente

### Actualizar contenido:
1. Edita los archivos de componentes en GitHub (botón del lápiz)
2. Haz commit
3. Vercel actualizará automáticamente en 1-2 minutos

---

## 💡 CONSEJOS

✅ **HACER:**
- Usar IDs únicos y consecutivos (1, 2, 3, 4...)
- Nombrar archivos sin espacios: `mi-audio.mp3` ✓
- Usar formato de fecha: `2024-12-03`
- Poner comas entre elementos (excepto el último)

❌ **NO HACER:**
- Nombres con espacios: `mi audio.mp3` ✗
- IDs duplicados
- Olvidar las comas entre elementos
- Olvidar cerrar llaves `}`

---

## 📝 EJEMPLO RÁPIDO: Agregar un Poema

1. Abre `/components/PoemsSection.tsx`
2. Encuentra:
```typescript
const poemsData: Poem[] = [
  {
    id: 1,
    title: "Tus Ojos",
    ...
  },
  // ← AGREGA AQUÍ
];
```

3. Agrega tu poema antes del `];`:
```typescript
const poemsData: Poem[] = [
  {
    id: 1,
    title: "Tus Ojos",
    ...
  },
  {
    id: 4,
    title: "Tu Nuevo Poema",
    content: "Aquí va el texto\nCon saltos de línea",
    date: "2024-12-03"
  }
];
```

---

¡Listo! Con esto puedes actualizar todo el contenido fácilmente 💕
