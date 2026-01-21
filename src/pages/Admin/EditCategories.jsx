import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCategories() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, SetCategory] = useState([]);
  useEffect(() => {
    api
      .get(`/category/${id}`)
      .then((resulte) => {
        SetCategory(resulte.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("category name is required"),
  });

  if (!category) {
    return (
      <AdminLayout title="Edit Plan" text="Loading plan data">
        <div className="page-content">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }
  return (
    <>
      <AdminLayout
      title={"Edit categories"}
      text={"manage your categories"}>
        <div className="page-content">
          <div className="crd">
            <h3> Edit Category</h3>
            <Formik
              enableReinitialize
              initialValues={{
                name: category.name || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                api
                  .put(`/category/${id}`, values)
                  .then(() => {
                    navigate("/category");
                  })
                  .catch((err) => console.log(err))
                  .finally(() => setSubmitting(false));
              }}
            >
              {({ isSubmitting }) => (
                <Form>

                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <Field name="name" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="small"
                      className="text-danger"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                     {isSubmitting ? "Saving..." : "Update category"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
