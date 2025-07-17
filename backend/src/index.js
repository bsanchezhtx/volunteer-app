import express from "express";
import cors from "cors";
import verifyJWT from "./middleware/verifyJWT.js";
import corsOptions from "./config/corsOptions.js";
import register from "./routes/register.js";
import auth from "./routes/auth.js";
import refresh from "./routes/refresh.js";
import logout from "./routes/logout.js";
import allowCredentials from "./middleware/allowCredentials.js";
// import profile from "./routes/profile.js";
// import events from "./routes/events.js";
// import match from "./routes/match.js";
// import notifications from "./routes/notifications.js";
// import history from "./routes/history.js";

const app = express();
app.use(express.json());
app.use(allowCredentials);
app.use(cors(corsOptions));

app.use("/api/register", register);
app.use("/api/auth", auth);
app.use("/api/refresh", refresh);
app.use("/api/logout", logout);

// all routes below this middleware will be protected with a jwt
app.use(verifyJWT);

// app.use("/api/profile", profile);
// app.use("/api/events", events);
// app.use("/api/match", match);
// app.use("/api/notifications", notifications);
// app.use("/api/history", history);

app.use((_, res) => res.status(404).json({ msg: "Not found" }));

const PORT = 4000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

export default app;
