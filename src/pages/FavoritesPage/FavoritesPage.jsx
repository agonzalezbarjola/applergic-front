import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./FavoritePage.scss";
import qs from "qs";
import Favorite from "../../components/Favorite/Favorite";

function FavoritesPage() {
  const [dataUser, setDataUser] = useState([]);
  const [update, setUpdate] = useState(false);
  const idUser = JSON.parse(sessionStorage.getItem("id"));

  const getUser = async () => {
    const res = await axios.get(`http://localhost:8000/api/users/${idUser}`, {
      headers: {
        Authorization: {
          toString() {
            return `Bearer ${sessionStorage.getItem("token")}`;
          },
        },
      },
    });
    setDataUser(res.data.userDB.fav);

    // .then((res) => {
    //   console.log(res);
    //   setProduct(res.data.res)
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  function handleClick(e) {
    e.preventDefault();
    console.log(e.target.name);
    const idProduct = e.target.name;
    const deleteFavorite = async () => {
      const res = await axios.patch(
        `http://localhost:8000/api/users/delete/${idUser}/${idProduct}`,
        {
          headers: {
            Authorization: {
              toString() {
                return `Bearer ${sessionStorage.getItem("token")}`;
              },
            },
          },
        }
      );

      console.log(res);
      setUpdate(!update);
    };
    deleteFavorite();
  }

  useEffect(() => {
    getUser();
  }, [update]);
  console.log(dataUser);

  return (
    <div className="c-Favoritepage">
      <h3>Aquí tienes una lista de tus productos favoritos.</h3>
      {dataUser.map((item) => (
        <div key={item._id} className="c-Favoritepage__products">
          <div className="c-Favoritepage__products--img">
            <img src={item.image} alt="" />
          </div>
          <div className="c-Favoritepage__products--info">
            <p>{item.name}</p>
            <p>{item.brand}</p>
          </div>
          <input
            className="c-Favoritepage__products--input"
            type="button"
            value=""
            name={item._id}
            onClick={handleClick}
          />
        </div>
      ))}
      <Link to="/home" className="c-Favoritepage__btn">
        <button className="button">Volver</button>
      </Link>
    </div>
  );
}

export default FavoritesPage;
