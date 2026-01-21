import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../style/form.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function AddMembers() {
  const navigate = useNavigate;
  const { id } = useParams();
  const [member, SetMember] = useState([null]);
  useEffect(() => {
    api
      .get(`/members/${id}`)
      .then((resulte) => {
        SetMember(resulte.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone must be 11 digits")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    building_number: Yup.string().required("Building number is required"),
    gender: Yup.string().required("Gender is required"),
    height: Yup.number().required("hight is required"),
    weight: Yup.number().required("weight is required"),
    blood_type: Yup.string().required("blood type is required"),
    note: Yup.string().nullable("note can be nullable"),
    last_health_rec_update: Yup.date().nullable("can be nullable"),
    join_date: Yup.date().required("join date is required"),
    profile_image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 2000000), 
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)),
      ),
  });

  if (!member) {
    return (
      <AdminLayout title="Edit Trainer" text="Loading trainer  data">
        <div className="page-content">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={"edit members"} text={"edit your members info"}>
      <div className="auth-container">
        <div className="auth-card p-4">
          <h2 className="text-center">Sign Up To GymFlow</h2>
          <p className="text-center text-muted mb-4">edit member account</p>

          <Formik
            initialValues={{
              name: member.name || "",
              email: member.email || "",
              phone: member.phone || "",
              city: member.city || "",
              street: member.street || "",
              building_number: member.building_number || "",
              gender: member.gender || "",
              height: member.height || "",
              weight: member.weight || "",
              blood_type: member.blood_type || "",
              note: member.note || "",
              last_health_rec_update: member.last_health_rec_update || "",
              join_date: member.join_date || "",
              profile_image: null || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              api
                .put(`members/${id}`, values)
                .then(() => navigate("/members"))
                .catch((err) => console.log(err))
                .finally(() => setSubmitting(false));
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <Field name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <Field name="phone" className="form-control" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                {/* Address */}
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">City</label>
                    <Field name="city" className="form-control" />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="form-error text-danger"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Street</label>
                    <Field name="street" className="form-control" />
                    <ErrorMessage
                      name="street"
                      component="div"
                      className="form-error text-danger"
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Building No.</label>
                    <Field name="building_number" className="form-control" />
                    <ErrorMessage
                      name="building_number"
                      component="div"
                      className="form-error text-danger"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label d-block">Gender</label>
                  <div className="gender-group d-flex gap-4">
                    <label>
                      <Field type="radio" name="gender" value="male" /> Male
                    </label>
                    <label>
                      <Field type="radio" name="gender" value="female" /> Female
                    </label>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor=" height" className="form-label">
                    Height
                  </label>
                  <Field type="number" className="form-control" name="height" />
                  <ErrorMessage
                    name="height"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor=" weight" className="form-label">
                    Weight
                  </label>
                  <Field type="number" className="form-control" name="weight" />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="blood_type" className="form-label">
                    Blood Type
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="blood_type"
                  />
                  <ErrorMessage
                    name="blood_type"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="note" className="form-label">
                    Note
                  </label>
                  <Field
                    as="textarea"
                    rows="4"
                    className="form-control"
                    name="note"
                  />
                  <ErrorMessage
                    name="note"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="last_health_rec_update"
                    className="form-label d-block"
                  >
                    last health record update
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    name="last_health_rec_update"
                  />
                  <ErrorMessage
                    name="last_health_rec_update"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                {/* join date*/}
                <div className="mb-3">
                  <label htmlFor="join_date" className="form-label d-block">
                    Join Date
                  </label>
                  <Field
                    type="date"
                    className="form-control"
                    name="join_date"
                  />
                  <ErrorMessage
                    name="join_date"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    name="profile_image"
                    className="form-control"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue(
                        "profile_image",
                        event.currentTarget.files[0],
                      );
                      setPreview(
                        URL.createObjectURL(event.currentTarget.files[0]),
                      );
                    }}
                  />
                  <ErrorMessage
                    name="profile_image"
                    component="div"
                    className="form-error text-danger"
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="img-preview mt-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100 submit-btn"
                >
                  {isSubmitting ? "Saving..." : "Update member"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AdminLayout>
  );
}
