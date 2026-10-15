import Client from 'shopify-buy';

// Initialize the Shopify Buy client
// We use environment variables so you don't commit your API keys to GitHub
const domain = import.meta.env.VITE_SHOPIFY_DOMAIN || 'k0n4k0-ac.myshopify.com';
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'b546a31614bfb5436dcbfa881be466a3';

export const shopifyClient = Client.buildClient({
  domain: domain,
  storefrontAccessToken: storefrontAccessToken,
  apiVersion: '2024-01',
});
