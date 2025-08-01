import express from "express";
import cors from "cors";

import auth         from "./routes/auth.js";
import profile      from "./routes/profile.js";
import events       from "./routes/events.js";
import match        from "./routes/match.js";
import notifications from "./routes/notifications.js";
import history      from "./routes/history.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",          auth);
app.use("/api/profile",       profile);
app.use("/api/events",        events);
app.use("/api/match",         match);
app.use("/api/notifications", notifications);
app.use("/api/history",       history);

export default app;
