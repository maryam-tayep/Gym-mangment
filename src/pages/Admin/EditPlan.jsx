import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPlan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    api
      .get(`/plans/${id}`)
      .then((res) => {
        setPlan(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Plan name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
    is_active: Yup.string().required("Status is required"),
    duration_days: Yup.number().required("dary required"),
  });

  if (!plan) {
    return (
      <AdminLayout title="Edit Plan" text="Loading plan data">
        <div className="page-content">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Plan" text="Update gym plan">
      <div className="page-content">
        <div className="card p-4">
          <h3 className="mb-4">Edit Plan</h3>

          <Formik
            enableReinitialize
            initialValues={{
              name: plan.name || "",
              description: plan.description || "",
              price: plan.price || "",
              is_active: plan.status || "active",
              duration_days: plan.duration_days || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              api
                .put(`/plans/${id}`, values)
                .then(() => {
                  navigate("/plans");
                })
                .catch((err) => console.log(err))
                .finally(() => setSubmitting(false));
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Name */}

                <div className="mb-3">
                  <label className="form-label">Plan Name</label>
                  <Field name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="small"
                    className="text-danger"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control"
                    rows="3"
                  />
                  <ErrorMessage
                    name="description"
                    component="small"
                    className="text-danger"
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <Field type="number" name="price" className="form-control" />
                  <ErrorMessage
                    name="price"
                    component="small"
                    className="text-danger"
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <Field as="select" name="is_active" className="form-select">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="small"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="duration_days" className="form-label">
                    Duration Days
                  </label>
                  <Field
                    as="number"
                    name="duration_days"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="duration_days"
                    component="small"
                    className="text-danger"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  submit {isSubmitting ? "Saving..." : "Update Plan"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AdminLayout>
  );
}
