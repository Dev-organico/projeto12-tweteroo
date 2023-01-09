import express from "express"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors());
const PORT = 5000

const users = [{
    username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}]
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

    if(!users.find(el => el.username === tweet.username)) return res.status(401).send("UNAUTHORIZED")

    if(!tweet.tweet || typeof(tweet.tweet) !== "string" ) return res.status(400).send("Todos os campos são obrigatórios!")

    

    tweets.push(tweet)
    res.status(201).send("OK")

})

app.get("/tweets/:USERNAME", (req, res) => {

    userName = req.params.USERNAME

    const lastTen = (tweets.slice(-10, tweets.length))

    let newLast = []

    lastTen.forEach(el => {
        users.find(i => {
            if (el.username === userName) {
                newLast.push({
                    username: i.username,
                    avatar: i.avatar,
                    tweet: el.tweet
                })
            }
        })
    })




    res.status(200).send(newLast)

})



app.listen(PORT, () => {
    console.log(`running on ${PORT}`)
    console.log("testing")
})

