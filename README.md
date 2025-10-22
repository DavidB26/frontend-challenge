# frontend-challenge (RIMAC)

Pequeño SPA en **React + Vite** que implementa el flujo: **Login → Plans → Summary**, con **rutas protegidas**, validaciones y diseño responsive.

## 🔍 Demo

* **Producción (Vercel):** [https://frontend-challenge-david-beslanga.vercel.app/](https://frontend-challenge-david-beslanga.vercel.app/)
* **Rama principal:** `main`

## 🔒 Acceso / Flujo

* **Pantalla inicial:** `/` (equivalente a `/login`)
* **Credenciales demo:**

  * **DNI:** `30216147`
  * **Celular:** `130216147`
* **Flujo:** `Login → /plans → /summary`
* **Botón "Volver a login" (en /plans):** limpia sesión y redirige a `/login`.
* **Guardas:**

  * `GuestRoute`: si hay sesión, redirige a `/plans`.
  * `ProtectedRoute`: sin sesión, redirige a `/login`.

## 🏠 Arquitectura

```
src/
  components/           # Layout, Header, Guards
  pages/                # Login, Plans, Summary, Logout
  utils/                # auth helpers (AUTH_KEY, setAuth, isAuthenticated)
  assets/               # Imágenes optimizadas
  App.jsx               # Definición de rutas y guards
  main.jsx              # Bootstrap
```

### Decisiones clave

* **Estado de sesión** simple con `localStorage` (clave `auth_token`).
* **Helpers de auth:** `setAuth()`, `isAuthenticated()` para aislar la lógica.
* **Rutas protegidas:** `ProtectedRoute` y `GuestRoute` usando `<Outlet/>`.
* **Assets:** importados como módulos (evita rutas rotas `/src/...` en build).
* **Accesibilidad:** `aria-*`, `role="alert"`, `aria-live`, labels y focus.

## ▶️ Scripts

```bash
# Desarrollo
npm install
npm run dev

# Build producción
npm run build

# Preview local del build
npm run preview
```

## ⚙️ Variables / Entorno

* No se requieren variables secretas para el demo.
* Endpoint demo: `https://rimac-front-end-challenge.netlify.app/api/user.json`

## 🤍 Validaciones

* **Documento:** `DNI` (8 dígitos), `CE`, `PAS` (formatos restringidos).
* **Celular:** 9 dígitos.
* **Checks obligatorios:** Privacidad y Comunicaciones.
* **Errores accesibles:** `role="alert"`, `aria-live="polite"`.

## 🗺️ Routing

```jsx
// App.jsx (resumen)
<Route path="/logout" element={<Logout />} />   // Pública, limpia sesión
<Route element={<GuestRoute />}>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
</Route>
<Route element={<ProtectedRoute />}>
  <Route path="/plans" element={<Plans />} />
  <Route path="/summary" element={<Summary />} />
</Route>
```

## 🔐 Seguridad

* El guardado en `localStorage` es **solo para demo**. En producción:

  * Preferir **cookies httpOnly** + verificación del token en backend.
  * Manejar expiración/refresh y revocación de sesión.
  * Validar permisos en backend.

## 🧰 Calidad de código

* (Opcional) ESLint + Prettier + Husky + lint-staged
  *No incluidos para mantener simplicidad.*

## ♿️ Accesibilidad

* Inputs con `label` asociado y `aria-invalid`.
* Mensajes de error con `role="alert"` y `aria-live="polite"`.
* Controles de selección accesibles.
* Contrastes y tamaños adecuados en móviles.

## ⚡ Performance / UX

* Imágenes importadas (evita rutas absolutas rotas).
* Validaciones por campo.
* Navegación con `replace: true` para evitar volver a rutas protegidas.

## 🚀 Deploy (Vercel)

* **Build Command:** `npm run build`
* **Output:** `dist`
* **Rewrites SPA:** (si se usa `vercel.json`)

```json
{
  "version": 2,
  "builds": [{ "src": "package.json", "use": "@vercel/static-build" }],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

## 🛠️ Próximos pasos

* Migrar a **TypeScript** (tipos de `User`, `Plan`).
* Tests unitarios con **Vitest + React Testing Library**:

  * Cálculo de edad.
  * Flujo `login → plans → summary`.
  * Guards: acceso/denegación según token.
* Componentes atómicos (Button, Input, RadioTile).
* Store global ligera (**Zustand** o Context API).
* Manejo de loaders y errores de red.

---

**Autor:** David Beslanga
[frontend-challenge-david-beslanga.vercel.app](https://frontend-challenge-david-beslanga.vercel.app/)
