import whitelist from "./whitelist.js";

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS error"));
    }
  },
  credentials: true,
};

export default corsOptions;
