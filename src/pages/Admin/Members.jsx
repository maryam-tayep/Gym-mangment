import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Members() {
  const [members, SetMembers] = useState([]);

  useEffect(() => {
    api
      .get("/members")
      .then((resulte) => {
        SetMembers(resulte.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const DeleteMember = (id) => {
    if (!window.confirm("are you sure you want to delete this member?")) return;

    api.delete(`/members/${id}`).then(() => {
      SetMembers(members.filter((m) => m.id !== id));
    });
  };

  return (
    <AdminLayout title="Manage Members" text="Be careful about your clients">
      <div className="page-content bg-light p-3 p-md-4">
        
        {/* Header */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="text-capitalize mb-1">
              <i className="fa-solid fa-people-group me-2"></i>
              Members management
            </h2>
            <p className="text-muted mb-0">
              manage and track all gym members
            </p>
          </div>

          <Link to="/members/add" className="btn btn-primary">
            <i className="fa-solid fa-plus me-2"></i>
            Add new member
          </Link>
        </div>

        {/* Table Card */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">
              Member list <span className="text-muted">({members.length})</span>
            </h5>

            {/* Responsive Table */}
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Membership</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {members.length > 0 ? (
                    members.map((member) => (
                      <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.phone}</td>
                        <td>{member.membership}</td>
                        <td>
                          <span className="badge bg-primary">
                            {member.status}
                          </span>
                        </td>
                        <td>{member.join_date}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-2 justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => DeleteMember(member.id)}
                            >
                              Delete
                            </button>

                            <Link
                              to="/members/edit"
                              className="btn btn-sm btn-outline-warning"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        No members found
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

