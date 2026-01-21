import AdminLayout from "../../layouts/AdminLayout";
import members from "./Members";
import trainers from "./Trainers";
import plans from "./Plans";
import sessions from "./Session";
import SessionsChart from "../../components/Charts/SessionsChart";
import { Link } from "react-router-dom";
import MemberGraph from "../../components/Charts/MemberGraph";

export default function Dashboard() {
  return (
    <AdminLayout title="Admin dashboard" text="manage your gym flow">
      <div className="page-content">
        <div className="dashboard-page">
          <div className="row ">
            <div className="members col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card ">
                <p className="text-muted">total members</p>
                <div className=" d-flex justify-content-between">
                  <h4>{members.length}</h4>
                  <h4>
                    <i className=" fa-solid fa-people-group text-primary"></i>
                  </h4>
                </div>
              </div>
            </div>
            <div className="trainers col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card">
                <p className="text-muted">total trainers</p>
                <div className=" d-flex justify-content-between">
                  <h4>{trainers.length}</h4>
                  <h4>
                    <i className=" fa-solid fa-person-running text-primary"></i>
                  </h4>
                </div>
              </div>
            </div>
            <div className=" plans col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card card">
                <p className="text-muted">total plans</p>
                <div
                  className=" d-flex justify-content-between
                "
                >
                  <h4>{plans.length}</h4>
                  <h4>
                    <i className=" fa-solid fa-list-check text-primary"></i>
                  </h4>
                </div>
              </div>
            </div>
            <div className=" sessions col-12 col-sm-6 col-lg-3 mb-3">
              <div className="card card">
                <p className="text-muted">total sessions</p>
                <div
                  className=" d-flex justify-content-between
                "
                >
                  <h4>{sessions.length}</h4>
                  <h4>
                    <i className=" fa-solid fa-calendar text-primary"></i>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="card card mt-5">
            <h3 className="text-capitalize "> quick actions </h3>
            <div className="row gap-5 mt-3 ">
              <div className="members  card  col-12 col-md-6 col-lg-2  bg-info">
                <Link to={"/members/add"} className="nav-link text-light">
                  {" "}
                  <i className=" fa-solid text-light fa-people-group"></i> Add
                  New member{" "}
                </Link>
              </div>
              <div className="trainers  card col-12 col-md-6 col-lg-3 bg-warning">
                <Link to={"/trainers/add"} className="nav-link text-light">
                  {" "}
                  <i className=" fa-solid text-light fa-person-running"></i> Add
                  New Trainer{" "}
                </Link>
              </div>
              <div className="plans  card col-12 col-md-6 col-lg-3 bg-success">
                <Link to={"/plans/add"} className="nav-link text-light">
                  {" "}
                  <i className=" fa-solid text-light fa-people-group"></i> Add
                  New Plan{" "}
                </Link>
              </div>
              <div className="sessions  card col-12 col-md-6 col-lg-2  bg-primary">
                <Link to={"/sessions/add"} className="nav-link text-light">
                  {" "}
                  <i className=" fa-solid text-light fa-people-group"></i> Add
                  New session{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-4 ">
            <div className="col-8 col-lg-6 mb-4">
              <SessionsChart/>
            </div>
            <div className="col-8 col-lg-6 mb-4">
              <MemberGraph/>
            </div>
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
}
