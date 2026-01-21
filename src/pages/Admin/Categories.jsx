import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/category")
      .then((result) => {
        setCategories(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCategory = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    api.delete(`/category/${id}`).then(() => {
      setCategories(categories.filter((cat) => cat.id !== id));
    });
  };

  return (
    <AdminLayout
      title="Category Management"
      text="Manage and track all sessions Categories"
    >
      <div className="page-content">
        <div className="header d-flex align-items-center justify-content-between">
          <div>
            <h2>
              <i className="fa-solid fa-list me-2"></i>
              Categories Management
            </h2>
            <p className="text-muted">
              Manage and track all sessions Categories
            </p>
          </div>

          <Link to="/category/add" className="btn btn-sm btn-primary">
            Add New Category
          </Link>
        </div>

        <div className="card mt-4">
          <h5 className="p-3">
            Categories list ({categories.length})
          </h5>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                      <Link
                        to={`/category/edit/${category.id}`}
                        className="me-3 text-warning"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </Link>

                      <button
                        className="btn text-danger"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
