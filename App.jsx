import { useState, useEffect } from 'react';
//import './App.css';
import './Window.css';
import styles from './Timer.module.css';

function App() {
  // internal styling to categories
  const catstyle = {
    backgroundColor: 'lightblue',
    padding: '10px',
    borderRadius: '5px',
  };

  const prodstyle = (index) => ({
    color: index % 2 === 0 ? 'darkblue' : 'darkgreen',
  });

  // countdown timer
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);

      return () => {
        clearTimeout(timer); //cleanup
      };
    }
  }, [time]);

  // decide circle color based on count
  const getTimerColor = () => {
    if (time > 5) return styles.green;
    if (time >= 3) return styles.orange;
    return styles.red;
  };

  // window resize
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // cleanup fxn to remove event listener or unmount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const Categories = [
    {
      name: 'Electronics',
      products: ['Laptop', 'Smartphones', 'Tablet'],
    },
    {
      name: 'Clothing',
      products: ['Shirts', 'Jeans', 'Jacket'],
    },
  ];
  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Categories & Products</h1>
        {Categories.map((cat, index) => (
          <div key={index} style={catstyle}>
            <h2>{cat.name}</h2>
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              {cat.products.map((product, idx) => (
                <li key={idx} style={prodstyle(idx)}>
                  {product}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`container ${width > 768 ? 'wide' : 'narrow'}`}>
        <h1>Window width : {width}px</h1>
      </div>

      <div className={styles.timerContainer}>
        <div
          className={`${styles.timerCircle} ${
            time > 0 ? getTimerColor() : styles.blink
          }`}
        >
          {time > 0 ? time : "Time's up!"}
        </div>
      </div>
    </>
  );
}
export default App;
