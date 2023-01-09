import express from "express"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors());
const PORT = 5000

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const user = req.body

    if(!user.avatar|| !user.username) return res.status(400).send("Todos os campos são obrigatórios!")

    if(typeof(user.username) !== "string" || typeof(user.avatar) !== "string" ) return res.sendStatus(400)


   

    users.push(user)
    res.status(201).send("OK")

})

app.post("/tweets", (req, res) => {

    const tweet = req.body

    if(!tweet.tweet|| typeof(tweet.twee) !== "string" ) return res.status(400).send("Todos os campos são obrigatórios!")

    if (!users.find(el => el.username === tweet.username)) return res.status(401).send("UNAUTHORIZED")

    tweets.push(tweet)
    res.status(201).send("OK")

})

app.get("/tweets", (req, res) => {

    const lastTen = (tweets.slice(-10, tweets.length))

    let newLast = []

    lastTen.forEach(el => {
        users.find(i => {
            if (el.username === i.username) {
                newLast.push({
                    username: i.username,
                    avatar: i.avatar,
                    tweet: el.tweet
                })
            }
        })
    })




    res.send(newLast)

})



app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
    console.log("testing")
})

