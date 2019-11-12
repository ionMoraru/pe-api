import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import setHeaders from "./middlewares/setHeaders";

const app = express();
dotenv.config();
app.use(setHeaders);
const port = 3000;
const { GRANT_TYPE, CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env;

async function getToken() {
  let token;
  try {
    const response = await axios.post(
      `https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire&grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=${SCOPE}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    token = response.data;
  } catch (error) {
    console.error(error);
  }
  return token;
}

async function getPEJobs(page) {
  const token = await getToken();
  let index = page * 10;
  const range = `${index - 10}-${index + 9 - 10}`;

  try {
    const response = await axios.get(
      `https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?publieeDepuis=31&motsCles=batiment&range=${range}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    index += 10;
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

app.get("/jobs/:page", async (req, res) => {
  const page = req.params.page;
  const data = await getPEJobs(page);

  const response = {
    data: data.resultats
  };
  res.json(response);
});

async function getPEJobById(id) {
  const token = await getToken();

  try {
    const response = await axios.get(
      `https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
app.get("/job/:id", async (req, res) => {
  const id = req.params.id;
  const data = await getPEJobById(id);

  res.json(data);
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
