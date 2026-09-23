# Entry Calendar

Frontend de una aplicación de agenda/citas construida con React y TypeScript. Permite gestionar tipos de cita, crear y editar citas, visualizarlas en un calendario mensual y buscarlas desde una vista de inicio con próximas citas.

## Características

- **Inicio**: listado de próximas citas con búsqueda.
- **Calendario**: vista mensual con las citas agendadas por día.
- **Citas**: creación y edición de citas, incluyendo personas interesadas asociadas.
- **Tipos de cita**: administración (crear, editar, listar) de los tipos disponibles.
- **Tema claro/oscuro** y **soporte multi-idioma** (español/inglés).
- Diseño responsivo con sidebar colapsable.

## Stack técnico

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como bundler y dev server
- [React Router](https://reactrouter.com/) para el ruteo
- [TanStack Query](https://tanstack.com/query) para el manejo de estado del servidor (fetch, cache, mutaciones)
- [Axios](https://axios-http.com/) como cliente HTTP
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) para formularios y validación
- [i18next](https://www.i18next.com/) / [react-i18next](https://react.i18next.com/) para internacionalización
- [date-fns](https://date-fns.org/) para manejo de fechas
- [Tailwind CSS](https://tailwindcss.com/) para estilos
- [Lucide](https://lucide.dev/) para iconografía

## Requisitos previos

- Node.js 18+
- [pnpm](https://pnpm.io/)
- Una API backend corriendo (el proyecto consume una API REST propia para citas y tipos de cita)

## Puesta en marcha

1. Instala las dependencias:

   ```bash
   pnpm install
   ```

2. Copia el archivo de variables de entorno y ajusta la URL de la API:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_API_URL=http://localhost:65432
   ```

3. Levanta el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

## Scripts disponibles

| Comando        | Descripción                                  |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo con HMR      |
| `pnpm build`   | Compila TypeScript y genera el build de producción |
| `pnpm preview` | Sirve el build de producción localmente       |
| `pnpm lint`    | Ejecuta ESLint sobre el proyecto              |

## Estructura del proyecto

```
src/
├── api/            # Cliente HTTP (Axios) y servicios CRUD por recurso
├── components/     # Componentes de UI compartidos (layout, formularios, feedback, etc.)
├── features/       # Módulos por dominio: home, calendar, appointments, appointmentTypes
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── schemas/    # Validaciones con Yup
│       └── utils/
├── hooks/          # Hooks genéricos y reutilizables entre features
├── lib/            # Utilidades (fechas, i18n, variables de entorno, estilos, etc.)
├── locales/        # Archivos de traducción (en, es)
├── router.tsx       # Definición de rutas de la app
└── main.tsx         # Punto de entrada
```

Cada `feature` sigue el mismo patrón: `pages` para las vistas ruteadas, `components` para piezas de UI propias del dominio, `hooks` para lógica de datos/estado específica, y `schemas`/`utils` cuando aplica.

## API

La app consume una API REST configurada mediante `VITE_API_URL`. Los recursos principales son `/appointments` y `/appointment_types`; el cliente HTTP y el manejo de errores están centralizados en `src/api`.
