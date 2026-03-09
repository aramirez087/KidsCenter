# Kids Center Costa Rica

Sitio web para Kids Center, un centro especializado en terapia de lenguaje, enseñanza de idiomas y refuerzo académico para niños en Costa Rica.

## 📁 Estructura del Proyecto

El proyecto está organizado de forma modular para facilitar el mantenimiento:

```
KidsCenter/
├── index.html              # Archivo original (monolítico)
├── index-static.html       # Versión para GitHub Pages
├── index-modular.html      # Versión modular (desarrollo)
├── styles.css             # Estilos principales
├── script.js              # JavaScript principal
├── build.js               # Script para combinar archivos
│
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── navigation.html
│   │   ├── footer.html
│   │   ├── dividers.html
│   │   ├── urgency-banner.html
│   │   └── chat-widget.html
│   │
│   ├── sections/          # Secciones de la página
│   │   ├── hero.html
│   │   ├── age-programs.html
│   │   ├── about.html
│   │   ├── features.html
│   │   ├── services.html
│   │   ├── testimonials.html
│   │   ├── faq.html
│   │   ├── gallery.html
│   │   └── contact.html
│   │
│   └── schemas/           # Datos estructurados para SEO
│       └── structured-data.js
│
└── images/               # Imágenes del sitio
    ├── logo.jpg
    ├── teacher-1.jpg
    ├── teacher-2.jpg
    └── teacher-3.jpg
```

## 🚀 Uso

### Para GitHub Pages (Producción)

1. Usa `index.html` (archivo original completo) o `index-static.html`
2. Ambos funcionan directamente en GitHub Pages sin necesidad de servidor

### Para Desarrollo Local

1. **Opción 1**: Usa `index.html` (todo en un archivo)
2. **Opción 2**: Usa `index-modular.html` con un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx http-server
   ```

### Para Combinar Archivos

Si usas la versión modular y quieres generar un archivo único:

```bash
node build.js
```

Esto creará `index-combined.html` con todo el contenido integrado.

## 🎨 Características

- **Diseño Responsivo**: Adaptado para móviles, tablets y desktop
- **SEO Optimizado**: Meta tags, Schema.org, Open Graph
- **Chat Integrado**: Widget de n8n para atención al cliente
- **Animaciones**: Transiciones suaves y efectos visuales
- **Modular**: Código organizado en componentes reutilizables

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript vanilla
- n8n Chat Widget
- Google Fonts

## 📝 Mantenimiento

### Editar una sección

1. Navega a `src/sections/` o `src/components/`
2. Edita el archivo HTML correspondiente
3. Si usas GitHub Pages, actualiza manualmente `index.html` o ejecuta `node build.js`

### Agregar una nueva sección

1. Crea el archivo en `src/sections/nueva-seccion.html`
2. Agrégalo a la lista en `index-modular.html` o `build.js`
3. Actualiza el archivo principal si es necesario

## 📱 Contacto

- **Instagram**: [@kidscentercr](https://www.instagram.com/kidscentercr/)
- **Email**: kidscentercr@gmail.com
- **Teléfono**: +506 2234-5678

## 📄 Licencia

© 2024 Kids Center Costa Rica. Todos los derechos reservados.