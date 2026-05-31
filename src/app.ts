import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";

import affiliateRoutes from "./routes/affiliate.routes";
import authRoutes from "./routes/auth.routes";
import { requireAuth } from "./middleware/requireAuth";

const app = express();
const PORT = 3000;

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dentplus-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", authRoutes);

app.use("/affiliates", requireAuth, affiliateRoutes);

app.get("/", (req, res) => {
  res.render("home", {
    title: "DentPlus"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});