const express = require('express');
const app = express();
PORT = process.env.PORT || 5000

const articleInfo = {
    "Healthy-Diet": {
        comments:[],
    }
    
};


// Initailize Middleware, function in express.. It parses incomming JSON payload => Alternative Body parser
app.use(express.json({extended: false}))

app.post('/api/articles/:name/add-comments', (req, res)=>{
    const {username, text} = req.body
    const articleName = req.params.name
    articleInfo[articleName].comments.push({ username, text })
    res.status(200).send(articleInfo[articleName]);
    
})

app.listen(PORT, ()=> {
    console.log("Server started");
})