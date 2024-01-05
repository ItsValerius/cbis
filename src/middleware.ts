import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const notProtected = ["/api/receipts", "/"];
      if (notProtected.includes(req.nextUrl.pathname)) return true;

      if (token) return true;
      return false;
    },
  },
});
