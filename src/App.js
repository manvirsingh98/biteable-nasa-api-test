import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { getRoverInfo, getAllPictures } from "./api/api";
import "./App.css";

function App() {
  const rovers = ["Curiosity", "Opportunity", "Spirit"];

  const [showRover, setShowRover] = useState({});
  const [photos, setPhotos] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    rover: "",
    date: "",
    camera: "",
  });

  //useEffect
  useEffect(() => {
    if (values.rover) {
      getRoverInfo(values.rover).then((result) => {
        setShowRover(result.photo_manifest);
      });
    }
    if (values.date) {
      const { cameras } = showRover.photos.find(
        (photo) => photo.earth_date === values.date
      );
      setCameras(cameras);
    }
    if (values.rover && values.date && values.camera) {
      setVisible(true);
    }
  }, [values.rover, values.date, values.camera, showRover.photos]);

  //handle onChange event
  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  //handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.rover && values.date && values.camera) {
      getAllPictures(values.rover, values.date, values.camera).then(
        (result) => {
          setPhotos(result.photos);
        }
      );
    }
  };

  return (
    <div className="App">
      <div className="App-header py-5 bg-dark text-white d-flex justify-content-center align-items-center">
        {showRover && (
          <div className="text-capitalize text-center">
            <h1>{showRover.name ? showRover.name : "Welcome To NASA Rover"}</h1>
            <p>
              {showRover.landing_date &&
                `Rover launched on ${showRover.landing_date}`}
            </p>
          </div>
        )}
      </div>
      <div className="App-rover">
        <Container>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <label>Please choose a rover</label>
                <select
                  className="form-select form-select-lg mb-3 mt-2"
                  aria-label=".form-select-lg example"
                  onChange={handleChange}
                  name="rover"
                >
                  <option value="">Please select rover</option>
                  {rovers.map((rover) => (
                    <option key={rover} value={rover}>
                      {rover}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <Row>
                  <>
                    {showRover.photos && (
                      <Col>
                        <div>
                          <label>Please choose date</label>
                          <select
                            className="form-select form-select-lg mt-2 mb-3"
                            aria-label=".form-select-lg example"
                            onChange={handleChange}
                            name="date"
                          >
                            <option value="">Choose</option>

                            {showRover.photos.map((photo) => (
                              <option key={photo.sol} value={photo.earth_date}>
                                {photo.earth_date}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    )}
                    {cameras.length > 0 && (
                      <Col>
                        <div>
                          <label>Please choose camera</label>
                          <select
                            className="form-select form-select-lg mt-2 mb-3"
                            aria-label=".form-select-lg example"
                            onChange={handleChange}
                            name="camera"
                          >
                            <option value="">Choose</option>
                            {cameras.map((camera) => (
                              <option key={camera} value={camera.toLowerCase()}>
                                {camera}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
                    )}
                    {visible && (
                      <Col>
                        <button
                          className="btn btn-lg btn-primary"
                          style={{ marginTop: "33px" }}
                          type="submit"
                        >
                          Submit
                        </button>
                      </Col>
                    )}
                  </>
                </Row>
              </Col>
            </Row>
          </form>
        </Container>
        <Container>
          <Row className="py-4">
            {photos.length === 0 && (
              <p>
                No pictures found. please select your choices or{" "}
                <span className="text-danger">select different camera</span>
              </p>
            )}
            {photos.length > 0 &&
              photos.map((photo) => (
                <Col sm={3} key={photo.id} className="mb-4">
                  <div className="card  shadow-lg" style={{ height: "100%" }}>
                    <img
                      src={photo.img_src}
                      className="card-img-top h-100"
                      alt={photo.img_src}
                    ></img>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
