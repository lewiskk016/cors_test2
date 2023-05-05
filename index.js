// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// if (process.env.NODE_ENV === "development") {
//     console.log("In development mode");
//     require("dotenv").config();
// }


// const app = express();
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     next();
// });

// app.use(cors());

// app.get("/", (req, res) => {
//     if (req.query.url) {
//         axios.get(req.query.url)
//             .then(data => res.send(data.data))
//     } else {
//         res.send("Helloooooooo World!!!")
//     }
// })


// app.listen(5001, () => {
//     console.log("Listening on port 5001");
// })



const express = require("express");
const cors = require("cors");
const corsAnywhere = require("cors-anywhere");
const axios = require("axios");
if (process.env.NODE_ENV === "development") {
    console.log("In development mode");
    require("dotenv").config();
}

// const host = "localhost";
// const port = 5001;

const app = express();

// Configure CORS headers
app.use(cors({
  origin: true,
  methods: ["GET", "HEAD", "OPTIONS"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Create CORS Anywhere server
const corsServer = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"]
});

// Proxy GET requests through CORS Anywhere server
app.get("/", (req, res) => {
  if (req.query.url) {
    const url = req.query.url;
    axios.get(url)
      .then(response => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error fetching data");
      });
  } else {
    res.send("Hello World!");
  }
});

// // Start server
// corsServer.listen(port, host, () => {
//   console.log(`CORS proxy server running on ${host}:${port}`);
// });

corsServer.listen(5001, () => {
    console.log("Listening on port 5001");
})
