import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    api
      .get("/trainers")
      .then((response) => {
        setTrainers(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteTrainer = (id) => {
    if (!window.confirm("are you sure you want to delete this trainer")) return;

    api
      .delete(`/trainer/${id}`)
      .then(() => {
        setTrainers(trainers.filter((t) => t.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <AdminLayout title="Trainers" text="manage your gym trainers">
      <div className="page-content bg-light p-3 p-md-4">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="text-capitalize mb-1">
              <i className="fa-solid fa-person-running me-2"></i>
              Trainers management
            </h2>
            <p className="text-muted mb-0">
              manage and track all gym trainers
            </p>
          </div>

          <Link to="/trainers/add" className="btn btn-primary">
            <i className="fa-solid fa-plus me-2"></i>
            Add new trainer
          </Link>
        </div>

        {/* Trainers Grid */}
        {trainers.length > 0 ? (
          <div className="row g-4">
            {trainers.map((trainer) => (
              <div
                className="col-12 col-sm-6 col-lg-4"
                key={trainer.id}
              >
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={trainer.img}
                    className="card-img-top"
                    alt="trainer"
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title mb-1">{trainer.name}</h5>
                    <small className="text-muted mb-3">
                      Joined: {trainer.hireDate}
                    </small>

                    {/* Actions */}
                    <div className="mt-auto d-flex flex-wrap justify-content-center gap-2">
                      <Link
                        to={`/trainers/edit/${trainer.id}`}
                        className="btn btn-sm btn-outline-warning"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/trainers/${trainer.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </Link>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteTrainer(trainer.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center p-4 shadow-sm">
            <h4 className="text-muted mb-3">No trainers found</h4>
            <Link to="/trainers/add" className="btn btn-primary">
              Add Trainer
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
