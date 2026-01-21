import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../style/form.css";

export default function Register() {
  const [preview, setPreview] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone must be 11 digits")
      .required("Phone is required")
      .nullable(),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    building_number: Yup.string().required("Building number is required"),
    gender: Yup.string().required("Gender is required"),
    height: Yup.number().required("Height is required"),
    weight: Yup.number().required("Weight is required"),
    blood_type: Yup.string().required("Blood type is required"),
    note: Yup.string().nullable(),
    last_health_rec_update: Yup.date().nullable(),
    join_date: Yup.date().required("Join date is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    profile_image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 2000000) // 2MB
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
      ),
  });

  return (
    <div className="auth-container">
      <div className="auth-card p-4">
        <h2 className="text-center">Sign Up To GymFlow</h2>
        <p className="text-center text-muted mb-4">
          Create a new member account
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            city: "",
            street: "",
            building_number: "",
            gender: "",
            height: "",
            weight: "",
            blood_type: "",
            note: "",
            last_health_rec_update: "",
            join_date: "",
            password: "",
            confirmPassword: "",
            profile_image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const formData = new FormData();
            for (let key in values) {
              formData.append(key, values[key]);
            }

            axios
              .post("http://localhost:8000/api/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
              })
              .then((res) => {
                alert("Member registered successfully!");
                resetForm();
                setPreview(null);
              })
              .catch((err) => {
                alert("Error registering member");
                console.error(err);
              });
          }}
        >
          {({ setFieldValue, values }) => (
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

              {/* Height & Weight */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Height</label>
                  <Field type="number" name="height" className="form-control" />
                  <ErrorMessage
                    name="height"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Weight</label>
                  <Field type="number" name="weight" className="form-control" />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="form-error text-danger"
                  />
                </div>
              </div>

              {/* Blood Type */}
              <div className="mb-3">
                <label className="form-label">Blood Type</label>
                <Field as="select" name="blood_type" className="form-control">
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Field>
                <ErrorMessage
                  name="blood_type"
                  component="div"
                  className="form-error text-danger"
                />
              </div>

              {/* Note */}
              <div className="mb-3">
                <label className="form-label">Note</label>
                <Field
                  as="textarea"
                  rows="3"
                  name="note"
                  className="form-control"
                />
                <ErrorMessage
                  name="note"
                  component="div"
                  className="form-error text-danger"
                />
              </div>

              {/* Last Health Record Update */}
              <div className="mb-3">
                <label className="form-label d-block">
                  Last Health Record Update
                </label>
                <Field
                  type="date"
                  name="last_health_rec_update"
                  className="form-control"
                />
                <ErrorMessage
                  name="last_health_rec_update"
                  component="div"
                  className="form-error text-danger"
                />
              </div>

              {/* Join Date */}
              <div className="mb-3">
                <label className="form-label d-block">Join Date</label>
                <Field type="date" name="join_date" className="form-control" />
                <ErrorMessage
                  name="join_date"
                  component="div"
                  className="form-error text-danger"
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="form-error text-danger"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="form-error text-danger"
                />
              </div>

              {/* Profile Image */}
              <div className="mb-3">
                <label className="form-label">Profile Image</label>
                <input
                  type="file"
                  name="profile_image"
                  className="form-control"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("profile_image", event.currentTarget.files[0]);
                    setPreview(URL.createObjectURL(event.currentTarget.files[0]));
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

              <button type="submit" className="btn btn-primary w-100 submit-btn">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
