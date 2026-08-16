import { createFileRoute } from '@tanstack/react-router';
import { BrandPages } from '@/components/northline/BrandPages';

export const Route = createFileRoute('/returns')({
  component: ReturnsPage,
});

function ReturnsPage() {
  return <BrandPages initialTab="returns" />;
}
