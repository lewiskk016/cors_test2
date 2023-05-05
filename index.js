const express = require("express");
const cors = require("cors");
const axios = require("axios");

if (process.env.NODE_ENV === "development") {
    console.log("In development mode");
    require("dotenv").config();
}


const app = express();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use(cors());

app.get("/", (req, res) => {
    if (req.query.url) {
        axios.get(req.query.url)
            .then(data => res.send(data.data))
    } else {
        res.send("Helloooooooo World!!!")
    }
})


app.listen(5001, () => {
    console.log("Listening on port 5001");
})








// const express = require("express");
// const cors = require("cors");
// const corsAnywhere = require("cors-anywhere");
// const axios = require("axios");
// if (process.env.NODE_ENV === "development") {
//     console.log("In development mode");
//     require("dotenv").config();
// }

// // const host = "localhost";
// // const port = 5001;

// const app = express();

// // Configure CORS headers
// app.use(cors({
//   origin: true,
//   methods: ["GET", "HEAD", "OPTIONS"],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }));

// // Create CORS Anywhere server
// const corsServer = corsAnywhere.createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ["origin", "x-requested-with"],
//     removeHeaders: ["cookie", "cookie2"],
//     setHeaders: {
//       "origin": "idk",
//       "x-requested-with": "value"
//     }
//   });

// // Proxy GET requests through CORS Anywhere server
// app.get("/", (req, res) => {
//   if (req.query.url) {
//     const url = req.query.url;
// //     axios.get('http://localhost:5001/?url=https://api.stlouisfed.org/fred/series/observations?series_id=PAYEMS&api_key=8033f2da8ce64ec092c6feb6cbef9b01&observation_start=1999-01-01&file_type=json', {
// //   headers: {
// //     'Origin': 'http://localhost:5001'
// //   }
// // })
// // .then(response => {
// //   console.log(response.data);
// // })
// // .catch(error => {
// //   console.error(error);
// // });
//     axios.get(url)
//       .then(response => {
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         res.send(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).send("Error fetching data");
//       });
//   } else {
//     res.send("Hello World!");
//   }
// });

// // // Start server
// // corsServer.listen(port, host, () => {
// //   console.log(`CORS proxy server running on ${host}:${port}`);
// // });

// corsServer.listen(5001, () => {
//     console.log("Listening on port 5001");
// })
