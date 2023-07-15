import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNavBar";
import AdminSideBar from "./AdminSidBar";
import "../Admin/dashboard.rtl.css";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function ChallengeDetails() {
  let history = useHistory();
  const { id } = useParams();
  const { REACT_APP_IP,REACT_APP_IMGPATH,REACT_APP_BACKEND_PORT} = process.env;
  const [challenge, setChallenge] = useState([]);
  const [title, settitle] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [subdescription, setsubdescription] = useState("");
  const [problem, setproblem] = useState([]);
  const [solution, setsolution] = useState("");
  const [problemRepeat, setproblemRepeat] = useState("");
  const [problemPlace, setproblemPlace] = useState("");
  const [negative, setnegative] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/challengedetails/${id}`
        );
        setChallenge(response.challengeDetails);
        // console.log(response);
      } catch (error) {
        // console.error(error.message);
      }
    };

    fetchData();
  }, []);
  const RedirectTosetChallenge = () => {
    history.push("/challenges");
  };
  // #Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("ID", id);
    uploadData.append("title", title);
    uploadData.append("image", image);
    uploadData.append("description", description);
    uploadData.append("problem", problem);
    uploadData.append("solution", solution);
    uploadData.append("problemRepeat", problemRepeat);
    uploadData.append("problemPlace", problemPlace);
    uploadData.append("negative", negative);
    uploadData.append("subtitle", subtitle);
    uploadData.append("subdescription", subdescription);

    axios
      .post(`https://${REACT_APP_IP}:${REACT_APP_BACKEND_PORT}/challengeupdate/`, uploadData)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "Updated") {
          RedirectTosetChallenge();
        }
      })

  };
  return (
    <div>
      {<AdminNav />}
      <div className="container-fluid">
        <div className="row">
          <AdminSideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h4">تحديث التحدى</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary remove_hover"
                  >
                    <i className="far fa-newspaper fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div
                className="card col-md-10"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  padding: "1rem",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          عنوان التحدى
                        </label>
                        <input
                          defaultValue={challenge.Title}
                          onChange={(evt) => settitle(evt.target.value)}
                          type="text"
                          className="form-control"
                          aria-describedby="button-addon2"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          وصف التحدى
                        </label>
                        <textarea
                          defaultValue={challenge.Description}
                          onChange={(evt) => setdescription(evt.target.value)}
                          className="form-control"
                          aria-describedby="button-addon2"
                        ></textarea>
                      </div>
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          عنوان فرعي للتحدي
                        </label>
                        <input
                          defaultValue={challenge.SubTitle}
                          onChange={(evt) => setsubtitle(evt.target.value)}
                          type="text"
                          className="form-control"
                          aria-describedby="button-addon2"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          وصف فرعي للتحدي
                        </label>
                        <textarea
                          defaultValue={challenge.SubDescription}
                          onChange={(evt) => setsubdescription(evt.target.value)}
                          className="form-control"
                          aria-describedby="button-addon2"
                        ></textarea>
                      </div>
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          مشكلة التحدى
                        </label>
                        <textarea
                          defaultValue={challenge.Problems}
                          onChange={(evt) => setproblem(evt.target.value)}
                          className="form-control"
                          aria-describedby="button-addon2"
                        ></textarea>
                      </div>
                   
                    </div>

                    <div className="col-md-6">
                         <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          الأثر السلبي
                        </label>
                        <textarea
                          defaultValue={challenge.Negative}
                          onChange={(evt) => setnegative(evt.target.value)}
                          className="form-control"
                          aria-describedby="button-addon2"
                        ></textarea>
                      </div>
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          الحلول المتوقعة
                        </label>
                        <textarea
                          defaultValue={challenge.Solution}
                          onChange={(evt) => setsolution(evt.target.value)}
                          className="form-control"
                          aria-describedby="button-addon2"
                        ></textarea>
                      </div>
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          معدل التكرار
                        </label>
                        <textarea
                          defaultValue={challenge.ProblemRepeat}
                          onChange={(evt) => setproblemRepeat(evt.target.value)}
                          className="form-control"
                          aria-describedby="button-addon2"
                        ></textarea>
                      </div>
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          اماكن الحدوث
                        </label>
                        <textarea
                          defaultValue={challenge.Places}
                          onChange={(evt) => setproblemPlace(evt.target.value)}
                          className="form-control"
                          aria-describedby="button-addon2"
                        ></textarea>
                      </div>
                      <div className="input-group mb-3">
                        <label
                          className="form-label text-start me-1 mt-1"
                          style={{ display: "block" }}
                        >
                          صورة التحدى
                        </label>
                        <input
                          type="file"
                          defaultValue={challenge.Image}
                          onChange={(evt) => setimage(evt.target.files[0])}
                          className="form-control"
                          id="img"
                          style={{ display: "none" }}
                        />
                        <label
                          className="form-control text-start uploadFile"
                          htmlFor="img"
                        >
                          تحميل صورة
                        </label>
                        <span className="input-group-text">
                          <img
                            src={
                              "https://" +
                              REACT_APP_IP +
                              REACT_APP_IMGPATH +
                              challenge.Image
                            }
                            width="70"
                            height="70"
                            alt="upload image"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="input-group">
                    <button className="py-2 updatearticle" type="submit">
                      إرسال
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default ChallengeDetails;
