# TMDb App

Aplicación en React + Vite para explorar películas y series usando la API de The Movie Database (TMDb).

## Características
- Secciones de películas y series
- Agregar películas a favoritos (guardado local)
- Navegación entre secciones

## Instalación
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia la aplicación:
   ```bash
   npm run dev
   ```

## Configuración de API
Necesitas una API Key de TMDb. Regístrate en [TMDb](https://www.themoviedb.org/) y obtén tu key en la sección de configuración de cuenta.

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
VITE_TMDB_API_KEY=tu_api_key_aqui
```

## Estructura principal
- `/src/components` - Componentes reutilizables
- `/src/pages` - Vistas principales (Películas, Series, Favoritos)
- `/src/services` - Lógica de consumo de API

---

¡Listo para explorar películas y series!
