import express from "express"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors());
const PORT = 5000

const users = [{
    username: 'bobesponja',
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}]
const tweets = [{
    username: "bobesponja",
    tweet: "eu amo o hub"
},
{
    username: "bobesponja",
    tweet: "eu odeio o hub"
}]

app.post("/sign-up", (req, res) => {
    const user = req.body

    users.push(user)

    res.status(200).send("OK")

})

app.post("/tweets", (req, res) => {

    const tweet = req.body


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

