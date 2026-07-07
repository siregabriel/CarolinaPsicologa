# Configurar Supabase (para que los cambios del admin se publiquen de verdad)

Sin esto, el admin funciona en "modo local": los cambios solo se ven en tu navegador.
Con Supabase configurado, todo lo que edites (textos, imágenes, PDF, artículos) lo ven **todos los visitantes**.

Tiempo estimado: 10 minutos. Costo: $0 (plan gratuito).

## 1. Crear el proyecto

1. Entra a [supabase.com](https://supabase.com) y crea una cuenta gratis.
2. Crea un proyecto nuevo (nombre: `carolina-avila`, región: la más cercana, ej. `us-west-1`).
3. Guarda la contraseña de la base de datos donde no la pierdas.

## 2. Crear la tabla y permisos

En el dashboard de Supabase → **SQL Editor** → pega y ejecuta esto:

```sql
-- Tabla única para todo el contenido del sitio
create table site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table site_content enable row level security;

-- Cualquiera puede LEER (los visitantes ven el contenido)
create policy "lectura publica" on site_content
  for select using (true);

-- Solo usuarios autenticados pueden ESCRIBIR (el admin)
create policy "escritura autenticada insert" on site_content
  for insert with check (auth.role() = 'authenticated');
create policy "escritura autenticada update" on site_content
  for update using (auth.role() = 'authenticated');
create policy "escritura autenticada delete" on site_content
  for delete using (auth.role() = 'authenticated');

-- Bucket público para imágenes y PDFs
insert into storage.buckets (id, name, public) values ('media', 'media', true);

create policy "lectura publica media" on storage.objects
  for select using (bucket_id = 'media');
create policy "subida autenticada media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
```

## 3. Crear el usuario admin

Dashboard → **Authentication → Users → Add user**:
- Email: el correo de Carolina (ej. `contacto@carolinaavila.com`)
- Password: una contraseña fuerte
- Marca "Auto Confirm User"

Con este correo y contraseña se entrará a `/admin`.

## 4. Conectar el sitio

Dashboard → **Settings → API**. Copia `Project URL` y `anon public key`.

**En tu computadora (desarrollo):** crea un archivo `.env` en la raíz del proyecto:

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...tu-llave-anon...
```

**En Vercel (producción):** Project → Settings → Environment Variables → agrega las mismas dos variables → Redeploy.

## 5. Instalar la dependencia y probar

```bash
npm install
npm run dev
```

Entra a `/admin`, inicia sesión con el correo y contraseña del paso 3, edita algo y guarda.
Abre el sitio en otro navegador (o incógnito): el cambio debe verse. Eso confirma que se publica para todos.

## Notas

- La llave `anon` es pública por diseño; la seguridad la dan las políticas RLS del paso 2 (leer todos, escribir solo autenticados).
- Si las variables no están configuradas, el sitio no falla: vuelve automáticamente al modo local (localStorage).
- Las imágenes y PDFs subidos quedan en el bucket `media` con URLs públicas permanentes.
