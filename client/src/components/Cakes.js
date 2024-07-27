import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cakes = () => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await axios.get('/api/cakes');
        setCakes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCakes();
  }, []);

  return (
    <div>
      <h1>Cakes</h1>
      <ul>
        {cakes.map((cake) => (
          <li key={cake._id}>
            <h2>{cake.name}</h2>
            <p>{cake.description}</p>
            <p>${cake.price}</p>
            <img src={cake.imageUrl} alt={cake.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cakes;
