import React from "react";
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"

export default function AdminLayout({ title, text, children }) {
  return (
    <>
      <NavBar
        title={title}
        text={text}
        user="Admin"
        email="admin@gym.com"
      />

      <div className="d-flex">
        <SideBar />

        <main className="flex-grow-1 p-4 mt-5">
          {children}
        </main>
      </div>
    </>
  );
}

