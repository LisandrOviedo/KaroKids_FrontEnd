import React from "react";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { getUserByEmail } from "@/redux/userAction";

import { getFavorites } from "@/redux/favoritosActions";

import ProductCard from "../ProductList/ProductCard";

const FavoriteProducts = () => {
  const { user } = useContext(authContext);

  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.users.user);
  const favorites = useSelector((state) => state.favorites.favoritesDB);

  const [dataCharged, setDataCharged] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    const renderFavorites = async () => {
      if (!dataCharged && loginUser.usuario_id !== undefined) {
        const { payload } = await dispatch(getUserByEmail(user.email));
        dispatch(getFavorites(payload.usuario_id));
        setDataCharged(true);
      }
    };

    if (favorites.length > 0) setDataCharged(true);

    const manejarCambiosDeAncho = () => {
      setAnchoPantalla(window.innerWidth);
    };

    window.addEventListener("resize", manejarCambiosDeAncho);

    renderFavorites();
    return () => {
      window.removeEventListener("resize", manejarCambiosDeAncho);
    };
  }, [user, loginUser.usuario_id, dataCharged]);

  useEffect(() => {}, [favorites]);

  return (
    <article className="container flex flex-col items-center mb-4 min-h-screen w-full pt-28 mx-auto">
      <header className="text-4xl font-semibold">
        <h2 className="text-2xl mx-6 xl:text-3xl">Mis Favoritos</h2>
      </header>

      <div className="h-full overflow-y-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 md:pl-10 gap-y-4 py-4 flex justify-between gap-8">
        {user.accessToken ? (
          favorites && favorites.length ? (
            favorites &&
            favorites?.map((producto, i) => {
              return (
                <ProductCard
                  key={i}
                  id={producto.producto_id}
                  imageSrc={producto.imagen_principal}
                  imageAlt={producto.nombre}
                  name={producto.nombre}
                  price={producto.precio}
                  myFavorites={favorites}
                />
              );
            })
          ) : (
            <p className="">Agrega productos a tus favoritos</p>
          )
        ) : (
          <p>
            Debes iniciar sesión para poder visualizar tus productos favoritos
          </p>
        )}
      </div>
      <Link to="/productos">
        <span className="mx-6 text-sm"> ⬅ Seguir comprando </span>
      </Link>
    </article>
  );
};

export default FavoriteProducts;
