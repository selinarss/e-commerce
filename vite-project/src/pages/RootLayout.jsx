import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Categories from "../components/Categories";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <Categories />
      <main>
        <Outlet />
      </main>
    </>
  );
};
