import Link from "next/link";
import baseUrl from "../helpers/baseUrl";
const Home = ({ products }) => {
  const productList = products.map((product) => {
    return (
      <div className="card" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl} />
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>RS {product.price}</p>
        </div>
        <div className="card-action">
          <Link
            // href={"product/[id]"}
            href={`product/${product._id}`}
            // href={`/blog/${encodeURIComponent(post.slug)}`}
          >
            <a>View Product</a>
          </Link>
        </div>
      </div>
    );
  });

  return <div className="rootcard">{productList}</div>;
};

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
}

export default Home;
