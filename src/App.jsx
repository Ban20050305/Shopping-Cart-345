import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const products = [
    { id: 1, name: 'CRYBABY x Powerpuff Girls Series Figures', price: 380, image: 'https://prod-eurasian-res.popmart.com/default/20240304_164111_296715__1200x1200.jpg' },
    { id: 2, name: 'SKULLPANDA The Sound Series Figures', price: 380, image: 'https://prod-thailand-res.popmart.com/default/20240624_162258_467294____1_____1200x1200.jpg' },
    { id: 3, name: 'We are Twinkle Twinkle Series Figures', price: 380, image: 'https://prod-thailand-res.popmart.com/default/20240815_092126_348378____1-1_____1200x1200.jpg' },
    { id: 4, name: 'SKULLPANDA The Sound Series Figures', price: 380, image: 'https://prod-thailand-res.popmart.com/default/20240625_101712_684735____1_____1200x1200.jpg' },
    { id: 5, name: 'THE MONSTERS Playing Games Series Scene Sets', price: 380, image: 'https://prod-thailand-res.popmart.com/default/20240911_101616_634314____1_____1200x1200.jpg' },
    { id: 6, name: 'Hirono Shelter Series Figures', price: 380, image: 'https://prod-thailand-res.popmart.com/default/20240715_095555_134897____1_____1200x1200.jpg' },
    { id: 7, name: 'PUCKY The Feast Series Figures', price: 380, image: 'https://prod-eurasian-res.popmart.com/default/20240520_100548_536518____1_____1200x1200.jpg' },
    { id: 8, name: 'Universal Despicable Me 4 Series Figures', price: 380, image: 'https://prod-eurasian-res.popmart.com/default/20240617_151101_369055____8_____1200x1200.jpg' },
    { id: 9, name: 'HACIPUPU Adventures In The Woods Series Figures', price: 380, image: 'https://prod-eurasian-res.popmart.com/default/20240527_100302_301656____1_____1200x1200.jpg' },
    { id: 10, name: 'THE MONSTERS Almost Hidden Series Figures', price: 4560, image: 'https://prod-eurasian-res.popmart.com/default/20240411_171223_980428__1200x1200.jpg' },
    { id: 11, name: 'THE MONSTERS Forest Secret Base Series Blocks-Juice Maker', price: 1750, image: 'https://prod-eurasian-res.popmart.com/default/20240612_095520_221025____7_____1200x1200.jpg' },
    { id: 12, name: 'AZURA White Night Galaxy Figure', price: 1050, image: 'https://prod-thailand-res.popmart.com/default/20240807_143110_189328____1_____1200x1200.jpg' },
    { id: 13, name: 'PUCKY Egg Bunny Figure', price: 1050, image: 'https://prod-eurasian-res.popmart.com/default/20240321_135750_029217__1200x1200.jpg' },
    { id: 14, name: 'Peach Riot Rise Up Series Figures', price: 430, image: 'https://prod-eurasian-res.popmart.com/default/20231215_094240_950398__1200x1200.jpg' },
    { id: 15, name: 'Romantic Ring Box Series 3 Scene Sets', price: 430, image: 'https://prod-thailand-res.popmart.com/default/20240723_174124_468795____1_____1200x1200.jpg' },
    { id: 16, name: 'Sweet Bean Hot Spring Travel Figure', price: 1050, image: 'https://prod-eurasian-res.popmart.com/default/20240607_160743_552143____1_____1200x1200.jpg' },
    { id: 17, name: 'Sweet Bean Growth Illustration Series Figures', price: 430, image: 'https://prod-eurasian-res.popmart.com/default/1_jfldKbHaTg_1200x1200.jpg' },
    { id: 18, name: 'Yoki Christmas Series', price: 320, image: 'https://prod-thailand-res.popmart.com/default/20240709_120004_576864____1_____1200x1200.jpg' },
    { id: 19, name: 'Sanrio characters Sweet Best Series', price: 320, image: 'https://prod-eurasian-res.popmart.com/default/1_IzNrcxqj4R_1200x1200.jpg' },
    { id: 20, name: 'MEGA SPACE MOLLY 1000% Palmer House', price: 31900, image: 'https://prod-thailand-res.popmart.com/default/20240910_170148_744503____1_____1200x1200.jpg' },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (id) => {
    const existingProduct = cart.find((item) => item.id === id);
    if (existingProduct.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== id));
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <h1 className="header-title">ART TOY</h1>

      <div className="container">
        <div className="search-bar">
          <input 
            type="text" 
            className="search-input" 
            placeholder="ค้นหา..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3 className="product-title">{product.name}</h3>
              <p>ราคา: ฿{product.price.toLocaleString()}</p>
              <button onClick={() => addToCart(product)}>Add To Cart</button>
            </div>
          ))}
        </div>

        <div className="cart-container">
          <h2>ตะกร้าสินค้า</h2>
          <div className="cart">
            {cart.length === 0 ? (
              <p>ตะกร้าสินค้าว่างเปล่า</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} width="50" height="50" />
                    <span>{item.name} - ฿{item.price.toLocaleString()} x {item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)}>ลบ</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3>ราคารวม: ฿{totalPrice.toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;