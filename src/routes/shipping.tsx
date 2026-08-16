import { createFileRoute } from '@tanstack/react-router';
import { BrandPages } from '@/components/northline/BrandPages';

export const Route = createFileRoute('/shipping')({
  component: ShippingPage,
});

function ShippingPage() {
  return <BrandPages initialTab="shipping" />;
}
