import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      req.nextUrl;
      const notProtected = [
        "/api/receipts",
        "/",
        "/register",
        "/img/bg-image.png",
      ];
      if (notProtected.includes(req.nextUrl.pathname)) return true;

      if (token) return true;
      return false;
    },
  },
});
