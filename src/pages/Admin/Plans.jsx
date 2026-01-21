import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api
      .get("/plans")
      .then((res) => {
        setPlans(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePlan = (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    api.delete(`/plans/${id}`).then(() => {
      setPlans(plans.filter((plan) => plan.id !== id));
    });
  };

  return (
    <AdminLayout
      title="Plans Management"
      text="Manage your plans & create new plans"
    >
      <div className="page-content bg-light p-3 p-md-4">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="mb-1">
              <i className="fa-solid fa-list me-2"></i>
              Plans Management
            </h2>
            <p className="text-muted mb-0">
              Manage and track all gym plans
            </p>
          </div>

          <Link to="/plans/add" className="btn btn-primary">
            <i className="fa-solid fa-plus me-2"></i>
            Add New Plan
          </Link>
        </div>

        {/* Plans Grid */}
        <div className="row g-4">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={plan.id}
              >
                <div className="card h-100 shadow-sm border-0">

                  {/* Card Header */}
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-semibold text-truncate">
                      {plan.name}
                    </h6>

                    <div className="d-flex gap-2">
                      <Link
                        to={`/plans/edit/${plan.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </Link>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deletePlan(plan.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    <p className="text-muted small flex-grow-1">
                      {plan.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h5 className="mb-0 fw-bold">
                        ${plan.price}
                      </h5>

                      <span
                        className={`badge ${
                          plan.status === "active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {plan.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="card p-5 text-center shadow-sm">
                <h4 className="text-muted mb-3">
                  No plans available now
                </h4>
                <Link to="/plans/add" className="btn btn-primary">
                  Add Your First Plan
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

