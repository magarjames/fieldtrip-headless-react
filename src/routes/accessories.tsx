import { createFileRoute } from '@tanstack/react-router';
import { VivreLayout } from '@/components/northline/VivreLayout';

export const Route = createFileRoute('/accessories')({
  component: AccessoriesPage,
});

function AccessoriesPage() {
  return (
    <VivreLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-black">Accessories</h1>
        <p className="text-lg md:text-xl text-black/60 font-medium tracking-wide">Coming soon. Stay tuned.</p>
      </div>
    </VivreLayout>
  );
}
