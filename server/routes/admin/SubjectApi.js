var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var fields = '_id name isActive createdOn createdBy modifiedOn modifiedBy';
    var Subject = db.loadModel('Subject');
    router.get('/subjects\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
        var skip = parseInt(req.params.pageSize * req.params.page);
        var pagination = new Object();
        if(parseInt(req.params.pageSize))
            pagination.limit = parseInt(req.params.pageSize);
        if(skip)
            pagination.skip = skip;

        var sortBy = req.params.sortBy;
        var sortType = req.params.sortType;
        if (sortBy && sortType){
            pagination.sort = {};
            pagination.sort[sortBy] = sortType;
        }


        Subject.find({}, fields, pagination, function (err, doc) {
            var data = new Object();
            data.data = doc;
            Subject.count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        });
    });
    router.get('/subjects/autocomplete\.:ext/:str?', function (req, res) {
        Subject.find({'name' : new RegExp(req.params.str, 'i'),'isActive':true}, '_id name isActive', function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/subjects/add\.:ext"?', function (req, res) {
        const subjectModel = Subject;
        if(req.body.subject.password)
            req.body.subject.password = crypto.encrypt(req.body.subject.password);
        const newSubject = new subjectModel(req.body.subject);
        subjectModel.create(newSubject, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/subjects/login\.:ext?', function (req, res) {
        Subject.findOne({username:req.body.username, password:crypto.encrypt(req.body.password)},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/subjects/view\.:ext/:id?', function (req, res) {
        Subject.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/subjects/update\.:ext?', function (req, res) {
        if(typeof  req.body.subject.password != 'undefined')
            req.body.subject.password = crypto.encrypt(req.body.subject.password);
        Subject.findByIdAndUpdate(req.body.subject._id,req.body.subject, function (err, doc) {
        });

        Subject.findOne({_id: req.body.subject._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/subjects/delete\.:ext/:id?', function (req, res) {
        Subject.findOne({_id : req.params.id}).remove().exec();
        Subject.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
