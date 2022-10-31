import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EmpDetail = () => {
  const { empid } = useParams();

  const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  }, []);
  return (
    <div>
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-title">
          <h2>Employee Detail</h2>
        </div>
        <div className="card-body"></div>

        {empdata && (
          <div>
            <h3>The employee ID: {empdata.id}</h3>
            <h1>The employee name is: {empdata.name}</h1>
            <h3>Contact Details</h3>
            <h4>The employee email: {empdata.email}</h4>
            <h4>The employee phone number: {empdata.phone}</h4>
            <Link className="btn btn-danger" to="/">
              Back to Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpDetail;
