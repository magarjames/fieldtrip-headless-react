import Client from 'shopify-buy';

// Initialize the Shopify Buy client
// We use environment variables so you don't commit your API keys to GitHub
const domain = import.meta.env.VITE_SHOPIFY_DOMAIN || 'your-store.myshopify.com';
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'your-storefront-api-token';

export const shopifyClient = Client.buildClient({
  domain: domain,
  storefrontAccessToken: storefrontAccessToken,
  apiVersion: '2024-01',
});
