import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto min-h-screen max-w-7xl pb-2">{children} </main>
  );
};

export default UserLayout;
