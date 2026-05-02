import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [env] = useState(window.location.hostname);

  useEffect(() => {
    axios.get('/api/catalogue/products')
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const addToCart = (product) => {
    axios.post(`/api/cart/cart/user123`, {
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: 1
    }).then(() => {
      setCart(prev => [...prev, product]);
      alert(`${product.name} added to cart!`);
    });
  };

  if (loading) return <div style={styles.loading}>Loading RoboShop...</div>;

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>🤖 RoboShop</h1>
        <span style={styles.env}>env: {env}</span>
        <span style={styles.cartCount}>🛒 {cart.length}</span>
      </header>

      <main style={styles.main}>
        <h2>Products</h2>
        <div style={styles.grid}>
          {products.map(p => (
            <div key={p._id} style={styles.card}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p style={styles.price}>${p.price}</p>
              <p style={styles.category}>{p.category}</p>
              <button
                style={styles.button}
                onClick={() => addToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  app:      { fontFamily: 'Arial, sans-serif', margin: 0 },
  header:   { background: '#1a1a2e', color: 'white', padding: '15px 30px',
              display: 'flex', alignItems: 'center', gap: '20px' },
  env:      { fontSize: '12px', background: '#333', padding: '4px 8px',
              borderRadius: '4px', marginLeft: 'auto' },
  cartCount:{ fontSize: '18px', cursor: 'pointer' },
  main:     { padding: '30px' },
  grid:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px', marginTop: '20px' },
  card:     { border: '1px solid #ddd', borderRadius: '8px', padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  price:    { color: '#e44d26', fontWeight: 'bold', fontSize: '20px' },
  category: { color: '#888', fontSize: '12px', textTransform: 'uppercase' },
  button:   { background: '#1a1a2e', color: 'white', border: 'none',
              padding: '10px 20px', borderRadius: '4px', cursor: 'pointer',
              width: '100%', marginTop: '10px', fontSize: '14px' },
  loading:  { display: 'flex', justifyContent: 'center', alignItems: 'center',
              height: '100vh', fontSize: '24px' }
};

export default App;