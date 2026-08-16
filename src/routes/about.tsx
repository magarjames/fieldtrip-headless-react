import { createFileRoute } from '@tanstack/react-router';
import { BrandPages } from '@/components/northline/BrandPages';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return <BrandPages initialTab="about" />;
}
