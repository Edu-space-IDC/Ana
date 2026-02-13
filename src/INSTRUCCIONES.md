# 🎁 Instrucciones para Personalizar tu Página Web Romántica

## 📁 Estructura de Archivos

Tu página web está lista para personalizar. Aquí te explico cómo agregar tu contenido:

---

## 🎵 Agregar Canciones

**Archivo:** `/data/songs.json`

Para agregar tus canciones:

1. Sube tus archivos de audio (MP3) a la carpeta `/public/audios/` de tu proyecto
2. Edita el archivo `/data/songs.json` y agrega nuevas canciones siguiendo este formato:

```json
{
  "id": 3,
  "title": "Nombre de tu canción",
  "description": "Descripción o dedicatoria",
  "audioUrl": "/audios/nombre-archivo.mp3",
  "date": "2024-12-03"
}
```

**Ejemplo completo:**
```json
[
  {
    "id": 1,
    "title": "Mi Primera Canción Para Ti",
    "description": "Una canción especial",
    "audioUrl": "/audios/cancion1.mp3",
    "date": "2024-01-15"
  },
  {
    "id": 2,
    "title": "Tu nueva canción",
    "description": "Dedicada con amor",
    "audioUrl": "/audios/nueva-cancion.mp3",
    "date": "2024-12-03"
  }
]
```

---

## 📖 Agregar Poemas

**Archivo:** `/data/poems.json`

Para agregar poemas:

1. Edita el archivo `/data/poems.json`
2. Agrega nuevos poemas siguiendo este formato:

```json
{
  "id": 3,
  "title": "Título del Poema",
  "content": "Aquí va tu poema.\nUsa \\n para saltos de línea.\nCada verso en una línea nueva.",
  "date": "2024-12-03"
}
```

**Ejemplo completo:**
```json
[
  {
    "id": 1,
    "title": "Tu Sonrisa",
    "content": "Tu sonrisa ilumina mis días,\nTus ojos son mi guía,\nEn ti encontré la alegría,\nEres todo lo que quería.",
    "date": "2024-01-20"
  }
]
```

---

## 📷 Agregar Fotos al Álbum

**Archivo:** `/data/photos.json`

Para agregar fotos:

1. Sube tus fotos a la carpeta `/public/photos/` de tu proyecto
2. Edita el archivo `/data/photos.json` y agrega nuevas fotos:

```json
{
  "id": 4,
  "imageUrl": "/photos/nombre-foto.jpg",
  "caption": "Descripción de la foto",
  "date": "2024-12-03"
}
```

**Ejemplo completo:**
```json
[
  {
    "id": 1,
    "imageUrl": "/photos/foto1.jpg",
    "caption": "Nuestro primer día juntos",
    "date": "2024-01-01"
  }
]
```

---

## 🎤 Configurar el Audio y Avatar de Bienvenida

### Avatar (Tu Foto)
1. Guarda tu foto como `/public/avatar.jpg`
2. Asegúrate que sea una foto cuadrada para que se vea bien en el círculo

### Audio de Bienvenida
1. Graba tu mensaje de audio
2. Guárdalo como `/public/welcome-audio.mp3`
3. Este es el audio que se reproducirá cuando ella presione "Escucha mi mensaje"

---

## 🚀 Subir a Vercel

### Primera vez:

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Sube tu proyecto a GitHub
3. Importa el proyecto desde GitHub en Vercel
4. Vercel detectará automáticamente que es un proyecto React y lo desplegará

### Actualizaciones futuras:

Para agregar más contenido después de subir a Vercel:

**Opción 1 - Editar en GitHub:**
1. Ve a tu repositorio en GitHub
2. Navega a los archivos JSON en `/data/`
3. Haz clic en el ícono del lápiz para editar
4. Agrega tu nuevo contenido
5. Haz commit de los cambios
6. Vercel automáticamente actualizará tu sitio en 1-2 minutos

**Opción 2 - Editar localmente:**
1. Edita los archivos JSON en tu computadora
2. Sube los archivos de audio/fotos a `/public/`
3. Haz commit y push a GitHub
4. Vercel actualizará automáticamente

---

## 📂 Estructura de Carpetas Recomendada

```
/public/
  /audios/
    - cancion1.mp3
    - cancion2.mp3
  /photos/
    - foto1.jpg
    - foto2.jpg
  - avatar.jpg
  - welcome-audio.mp3

/data/
  - songs.json
  - poems.json
  - photos.json
```

---

## 💡 Consejos Importantes

1. **IDs únicos:** Cada canción, poema y foto debe tener un ID único y secuencial
2. **Formato de fechas:** Usa el formato YYYY-MM-DD (por ejemplo: 2024-12-03)
3. **Nombres de archivos:** Sin espacios ni caracteres especiales. Usa guiones: `mi-cancion.mp3`
4. **Tamaño de archivos:** Intenta que las fotos no sean muy grandes (máximo 2MB cada una)
5. **Formato de audio:** MP3 es el más compatible

---

## 🎨 Personalización Adicional

Si quieres cambiar colores o textos del diseño, los archivos principales son:
- `/components/WelcomeScreen.tsx` - Pantalla de bienvenida
- `/components/MainScreen.tsx` - Pantalla principal con pestañas
- `/components/SongsSection.tsx` - Sección de canciones
- `/components/PoemsSection.tsx` - Sección de poemas
- `/components/AlbumSection.tsx` - Sección de álbum

---

## ❤️ ¡Disfruta creando este regalo especial!

Si tienes dudas, recuerda que cada archivo JSON tiene ejemplos que puedes seguir.
