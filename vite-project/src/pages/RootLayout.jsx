import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Categories from "../components/Categories";

export const RootLayout = () => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Categories />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
//buradan kategoriler kaldırıldı çünkü yapının solda sabit olmasını istiyorum.
