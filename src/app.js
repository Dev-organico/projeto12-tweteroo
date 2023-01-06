import express from "express"
import cors from "cors"

const app = express();
app.use(cors());
const PORT = 5000

app.get("/", (req, res) => {
    console.log("running")
})




app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
    console.log("testing")
})