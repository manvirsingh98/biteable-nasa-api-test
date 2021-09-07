import axios from "axios";

const apiURL = "https://api.nasa.gov/mars-photos/api/v1";
const apiKey = "DEMO_KEY"; // put your key, because my key exceed the api call limit

export const getRoverInfo = async (rover) => {
  const { data } = await axios.get(
    `${apiURL}/manifests/${rover}?api_key=${apiKey}`
  );
  if (data) {
    return data;
  } else {
    return "Bad request";
  }
};

export const getAllPictures = async (rover, date, camera) => {
  const { data } = await axios.get(
    `${apiURL}/rovers/${rover}/photos?camera=${camera}&earth_date=${date}&api_key=${apiKey}`
  );
  if (data) {
    return data;
  } else {
    console.log("bad req");
  }
};
