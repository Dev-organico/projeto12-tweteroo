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

    if(user.username.length === 0 || typeof(user.username) !== "string" || user.username === null) return res.sendStatus(400)

    if(user.avatar.length === 0 || typeof(user.avatar) !== "string" || user.avatar === null) return res.sendStatus(400)


    users.push(user)

    res.status(200).send("OK")

})

app.post("/tweets", (req, res) => {

    const tweet = req.body

    if(tweet.username.length === 0 || typeof(tweet.username) !== "string" || !tweet.username) return res.sendStatus(400)

    if(tweet.tweet.length === 0 || typeof(tweet.tweet !== "string" || !tweet.tweet)) return res.sendStatus(400)


    if (!users.find(el => el.username === tweet.username)) return res.send("UNAUTHORIZED")

    tweets.push(tweet)
    res.send("OK")

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

