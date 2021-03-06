import { parseCookies } from "nookies";

const account = () => {
  return <div>Account</div>;
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { location: "/login" });
    res.end();
  }
  return {
    props: {},
  };
}

export default account;
