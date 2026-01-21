import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";

export default function AddCategories() {
  const validationSchema = Yup.object({
    name: Yup.string().required("category name is required"),
  });
  return (
    <>
      <AdminLayout
      title={"Add categories"}
      text={"manage your categories"}>
        <div className="page-content">
          <div className="card p-4">
            <h3 className="mb-4">Add New ctegory</h3>
            <Formik
              initialValues={{
                name: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                api
                  .post("", values)
                  .then((resulte) => {
                    console.log(resulte.data.data);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <div className="card">
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

                  <button type="submit" className="btn btn-primary">
                    Submit{" "}
                  </button>
                </Form>
              </div>
            </Formik>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
