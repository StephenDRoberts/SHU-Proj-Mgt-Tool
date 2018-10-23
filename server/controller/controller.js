module.exports = {
    provideData: function (app, req, res) {
        app.get('myDb').collection('projects').find({}).toArray(function (err, docs) {
            if (err) {
                console.error(err)
            }
            res.json(docs)
        })
    },

    saveData: function (app, req, res) {
        let data = req.body
        // console.log(data)
        // console.log(data[0])
        app.get('myDb').collection('projects').updateOne(
            {'user': 'user1'},
            {$set: {
                'projects':data.projects
            },
        },
        {upsert:true},
        function(err,dbresp){
            if(err){
                console.error(err)
            }
        })
        
    }

}