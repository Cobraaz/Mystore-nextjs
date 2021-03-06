import { useRouter } from "next/router";
import baseUrl from "../../helpers/baseUrl";
import { useRef, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import cookie2 from "js-cookie";

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const modalRef = useRef(null);
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  if (router.isFallback) {
    return <h1>loading...</h1>;
  }

  const AddToCart = async () => {
    console.log("quantity", quantity);
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({ quantity, productId: product._id }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: error, classes: "red" });
      cookie2.remove("user");
      cookie2.remove("token");
      router.push("/login");
    }
    M.toast({ html: res2.message, classes: "green" });
  };

  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure you want to delete</p>
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light #1565c0 blue darken-3">
            Cancel
          </button>
          <button
            className="btn waves-effect waves-light #c62828 red darken-3"
            onClick={() => deleteProduct()}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });

    const res2 = await res.json();
    router.push("/");
  };

  return (
    <div className="container center-align">
      <h3>{product.name}</h3>
      <img src={product.mediaUrl} style={{ width: "30%" }} />
      <h5>Rs.{product.price}</h5>
      <input
        type="number"
        style={{ width: "400px", margin: "10px" }}
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.valueAsNumber)}
        placeholder="Quantity"
      />
      {user ? (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => AddToCart()}
        >
          Add
          <i className="material-icons right">add</i>
        </button>
      ) : (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => router.push("/login")}
        >
          Login To Add
          <i className="material-icons right">add</i>
        </button>
      )}

      <p className="left-align">{product.description}</p>
      {user.role != "user" && (
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light #c62828 red darken-3"
        >
          Delete
          <i className="material-icons left">delete</i>
        </button>
      )}

      {getModal()}
    </div>
  );
};

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return { props: { product: data } };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "603fe9e3801c8cb57b8f28e0" } }, // See the "paths" section below
    ],
    fallback: true, // See the "fallback" section below
  };
}

// export async function getServerSideProps({ params: { id } }) {
//   const res = await fetch(`http://localhost:3000/api/product/${id}`);
//   const data = await res.json();
//   return { props: { product: data } };
// }

export default Product;
