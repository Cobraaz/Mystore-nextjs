const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://mystore.cobraaz.vercel.app/"
    : "http://localhost:3000";

export default baseUrl;
