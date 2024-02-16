import express from 'express'
import bp from 'body-parser'

const app = express();
const PORT = process.env.PORT || 8080

app.use(bp.json());
app.use(bp.urlencoded({extended: false}))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})