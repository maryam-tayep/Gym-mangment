import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Session() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api
      .get("/sessions")
      .then((result) => {
        setSessions(result.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteSession = (id) => {
    if (!window.confirm("Are you sure you want to delete this session")) return;

    api.delete(`/sessions/${id}`).then(() => {
      setSessions(sessions.filter((s) => s.id !== id));
    });
  };

  return (
    <AdminLayout
      title="Sessions management"
      text="manage your gym sessions"
    >
      <div className="page-content bg-light p-3 p-md-4">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="text-capitalize mb-1">
              <i className="fa-solid fa-calendar me-2"></i>
              Sessions management
            </h2>
            <p className="text-muted mb-0">
              manage and track all gym sessions
            </p>
          </div>

          <Link to="/sessions/add" className="btn btn-primary">
            <i className="fa-solid fa-plus me-2"></i>
            Add new session
          </Link>
        </div>

        {/* Table Card */}
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="mb-3">
              Sessions List
              <span className="text-muted ms-2">({sessions.length})</span>
            </h5>

            {/* Responsive Table */}
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Start</th>
                    <th>End</th>
                    <th className="d-none d-md-table-cell">
                      Description
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {sessions.length > 0 ? (
                    sessions.map((session) => (
                      <tr key={session.id}>
                        <td className="fw-semibold">{session.name}</td>
                        <td>{session.capacity}</td>
                        <td>{session.startTime}</td>
                        <td>{session.endTime}</td>

                        {/* Hide description on small screens */}
                        <td className="d-none d-md-table-cell">
                          {session.description}
                        </td>

                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            <Link
                              to={`/sessions/edit/${session.id}`}
                              className="btn btn-sm btn-outline-warning"
                            >
                              Edit
                            </Link>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteSession(session.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No sessions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

