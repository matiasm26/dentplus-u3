import express from "express";
import { engine } from "express-handlebars";
import affiliateRoutes from "./routes/affiliate.routes";

const app = express();
const PORT = 3000;

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));

app.use("/affiliates", affiliateRoutes);

app.get("/", (req, res) => {
  res.render("home", {
    title: "DentPlus"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});