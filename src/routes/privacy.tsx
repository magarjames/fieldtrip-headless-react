import { createFileRoute } from '@tanstack/react-router';
import { BrandPages } from '@/components/northline/BrandPages';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
});

function PrivacyPage() {
  return <BrandPages initialTab="privacy" />;
}
