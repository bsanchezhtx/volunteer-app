import app from "./app.js";

const PORT = 4000;


if (!process.env.JEST_WORKER_ID) {
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

export default app;     


