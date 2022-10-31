import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
const EmpEdit = () => {
  const { empid } = useParams();

  //   const [empdata, empdatachange] = useState({});

  useEffect(() => {
    // first fetch: get data by id from server
    fetch("http://localhost:8000/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        namechange(resp.name);
        emailchange(resp.email);
        phonechange(resp.phone);
        activechange(resp.isactive);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  }, []);

  // make state for every attribute
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, validationchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { id, name, email, phone, active };

    // second fetch: send and edit data by id to server
    fetch("http://localhost:8000/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };

  return (
    // Input Form Data
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Input ID */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled="disabled" className="form-control"></input>
                    </div>
                  </div>
                  {/* Input Name */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input required value={name} onMouseDown={(e) => validationchange(true)} onChange={(e) => namechange(e.target.value)} className="form-control"></input>
                      {name.length == 0 && validation && <span className="text-danger">Enter the name</span>}
                    </div>
                  </div>
                  {/* Input Email */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input value={email} onChange={(e) => emailchange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>
                  {/* Input Phone */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input value={phone} onChange={(e) => phonechange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input checked={active} onChange={(e) => activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
