# 🛠️ Guía de DevTools - Modo Desarrollador

## 🎯 ¿Qué es esto?

He creado un **Modo Desarrollador** que te permite agregar contenido (poemas, canciones, fotos) directamente desde la interfaz de la página web, sin necesidad de editar código.

---

## 🚀 ACTIVAR EL MODO DESARROLLADOR

### Paso 1: Abre la Consola del Navegador

**En Chrome/Edge:**
- Presiona `F12` o `Ctrl + Shift + I` (Windows/Linux)
- Presiona `Cmd + Option + I` (Mac)

**En Firefox:**
- Presiona `F12` o `Ctrl + Shift + K`

**En Safari:**
- Primero activa el menú de desarrollo: Safari → Preferencias → Avanzado → Mostrar menú Desarrollo
- Luego presiona `Cmd + Option + C`

### Paso 2: Activa el Modo Desarrollador

En la consola, escribe:

```javascript
enableDevMode()
```

Verás el mensaje:
```
✅ Modo Desarrollador Activado
🔄 Recarga la página para ver los botones
```

### Paso 3: Recarga la Página

Presiona `F5` o `Ctrl + R` (Windows) / `Cmd + R` (Mac)

---

## ✨ USAR LAS FUNCIONALIDADES

Una vez activado el modo desarrollador, verás botones nuevos en cada sección:

### 📖 **Agregar Poemas**
1. Ve a la sección "Poemas"
2. Haz clic en el botón morado **"Agregar Poema"**
3. Completa:
   - **Título:** Ej: "Tus Ojos"
   - **Contenido:** Escribe tu poema (cada línea será un verso)
4. Haz clic en **"Guardar Poema"**
5. ¡Listo! Tu poema aparece instantáneamente

### 🎵 **Agregar Canciones**
1. Ve a la sección "Canciones"
2. Haz clic en el botón rosa **"Agregar Canción"**
3. Completa:
   - **Título:** Ej: "Mi Canción Para Ti"
   - **Descripción:** Ej: "Dedicada con amor"
   - **Archivo de Audio:** Haz clic y selecciona tu archivo MP3/WAV/OGG
4. Haz clic en **"Guardar Canción"**
5. ¡La canción se agrega y puedes reproducirla inmediatamente!

### 📷 **Agregar Fotos**
1. Ve a la sección "Nuestro Álbum"
2. Haz clic en el botón azul **"Agregar Foto"**
3. Completa:
   - **Descripción:** Ej: "Nuestro primer día juntos"
   - **Imagen:** Haz clic y selecciona tu foto
4. Verás una vista previa de la foto
5. Haz clic en **"Guardar Foto"**
6. ¡La foto aparece en el álbum!

---

## 💾 ¿DÓNDE SE GUARDA EL CONTENIDO?

Todo el contenido que agregues se guarda en el **localStorage** del navegador. Esto significa:

✅ **Ventajas:**
- Se guarda automáticamente
- No necesitas subir archivos al servidor
- Los cambios son instantáneos
- No se pierde al cerrar la pestaña

⚠️ **Importante:**
- El contenido solo se guarda en **ese navegador específico**
- Si tu novia abre la página desde otro dispositivo, no verá el contenido agregado
- Si limpias los datos del navegador, se perderá

### Para que tu novia vea el contenido:
Tendrás que agregar el contenido **editando los archivos** en:
- `/components/PoemsSection.tsx`
- `/components/SongsSection.tsx`
- `/components/AlbumSection.tsx`

---

## 🔄 DESACTIVAR EL MODO DESARROLLADOR

Si quieres ocultar los botones de desarrollador:

1. Abre la consola del navegador (`F12`)
2. Escribe:
```javascript
disableDevMode()
```
3. Recarga la página

---

## 🎨 EJEMPLOS DE USO

### Ejemplo 1: Agregar un Poema
```
1. Abre DevTools (F12)
2. Escribe: enableDevMode()
3. Recarga la página
4. Ve a "Poemas"
5. Clic en "Agregar Poema"
6. Título: "Mi Amor Eterno"
7. Contenido: "Eres la luz de mi vida\nMi razón de ser\nTe amaré por siempre"
8. Clic en "Guardar Poema"
```

### Ejemplo 2: Agregar una Canción
```
1. Graba tu canción y guárdala como .mp3
2. Con DevMode activado, ve a "Canciones"
3. Clic en "Agregar Canción"
4. Título: "Para Ti, Mi Amor"
5. Descripción: "Una canción que escribí pensando en ti"
6. Selecciona el archivo .mp3
7. Clic en "Guardar Canción"
8. ¡Ya puedes reproducirla!
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

**No veo los botones después de activar:**
- Asegúrate de haber recargado la página (`F5`)
- Verifica que aparezca el mensaje "✅ Modo Desarrollador Activado"

**El audio no se reproduce:**
- Verifica que el archivo sea MP3, WAV u OGG
- El navegador debe soportar el formato
- Algunos navegadores bloquean la reproducción automática

**Las fotos no se ven:**
- Asegúrate de que sean JPG, PNG o GIF
- El tamaño del archivo no debe ser demasiado grande (recomendado < 5MB)

**Perdí mi contenido:**
- Si limpiaste los datos del navegador, se perderá
- Para contenido permanente, edita los archivos de componentes

---

## 💡 CONSEJOS PRO

1. **Prueba primero con DevMode:** Agrega contenido con los botones para ver cómo se ve
2. **Luego hazlo permanente:** Copia el contenido a los archivos de código
3. **Usa DevMode para demos:** Muéstrale a alguien cómo funciona antes de publicar
4. **Combina ambos métodos:** Contenido base en código + contenido temporal con DevMode

---

## 🔐 SEGURIDAD

- El modo desarrollador es solo **visual**, no afecta el código real
- Solo tú puedes activarlo desde tu navegador
- El contenido agregado no se sube a ningún servidor
- Es seguro experimentar sin miedo a romper nada

---

¡Disfruta creando contenido fácilmente! 💝
