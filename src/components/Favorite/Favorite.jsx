import React from "react";

function Favorite({ props }) {
  console.log(props);
  const products = JSON.parse(sessionStorage.getItem("favorites"));
  console.log(products);
  return <div>
  {products.res.map((item) => 
  <div>
      <p>{item.name}</p>
      <p>{item.brand}</p>
      <img src={item.image} alt=""/>
  </div>)}
  <button>Volver</button>
  </div>;
}

export default Favorite;
