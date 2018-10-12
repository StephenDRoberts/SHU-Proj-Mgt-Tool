module.exports = {
    provideData: function (app, req, res) {
        app.get('myDb').collection('projects').find({}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    }
}