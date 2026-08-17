const query = `{
  products(first: 5) {
    edges {
      node {
        title
        descriptionHtml
      }
    }
  }
}`;

fetch('https://projusbt.myshopify.com/api/2024-01/graphql.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': '32d0d0df93cbcc240953a55ed9c4eeeb'
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => {
    data.data.products.edges.forEach(edge => {
        console.log("TITLE:", edge.node.title);
        console.log("DESC:", edge.node.descriptionHtml);
        console.log("-----------------------");
    });
});
