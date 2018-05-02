var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('ClassRoom');
    var fields = '_id isActive name school gateway createdOn createdBy modifiedOn modifiedBy';
    router.get('/classrooms\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
        db.loadModel('School');
        db.loadModel('Gateway');
        var skip = parseInt(req.params.pageSize * req.params.page);
        var pagination = new Object();
        if(parseInt(req.params.pageSize))
            pagination.limit = parseInt(req.params.pageSize);
        if(skip)
            pagination.skip = skip;
        pagination.sort = {};
        var sortBy = req.params.sortBy;
        var sortType = req.params.sortType;
        if (sortBy && sortType){
            pagination.sort[sortBy] = sortType;
        }
        model.find({}, fields, pagination, function (err, doc) {
            var data = new Object();
            data.data = doc;
            model.count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        }).populate('school').populate('gateway')
            .exec().then(function (doc) {
        });
    });
    router.post('/classrooms/add\.:ext"?', function (req, res) {
        const classroomModel = model;
        const newClassRoom = new classroomModel(req.body.classroom);
        classroomModel.create(newClassRoom, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/classrooms/autocomplete\.:ext/:str?', function (req, res) {
        model.find({'name' : new RegExp(req.params.str, 'i'),'isActive':true}, '_id name isActive', function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/classrooms/view\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/classrooms/update\.:ext?', function (req, res) {
        model.findByIdAndUpdate(req.body.classroom._id,req.body.classroom, function (err, doc) {
        });

        model.findOne({_id: req.body.classroom._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/classrooms/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
