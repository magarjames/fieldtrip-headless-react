// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Vite rejects requests whose Host header it does not recognise, which is
  // DNS-rebinding protection and worth keeping. A Cloudflare quick tunnel
  // forwards its own hostname, so the dev server 403s behind one. This allows
  // that one domain rather than turning the protection off with `true`.
  vite: {
    server: { allowedHosts: [".trycloudflare.com"] },
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

