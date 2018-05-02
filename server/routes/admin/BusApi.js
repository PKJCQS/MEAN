var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Bus');
    var fields = '_id isActive busNo driver route school createdOn createdBy modifiedOn modifiedBy';
    router.get('/buss\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
        db.loadModel('School');
        db.loadModel('Route');
        db.loadModel('Driver');
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
        }).populate('school').populate('route').populate('driver')
            .exec().then(function (doc) {
        });
    });
    router.post('/buss/add\.:ext"?', function (req, res) {
        const busModel = model;
        const newBus = new busModel(req.body.bus);
        busModel.create(newBus, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/buss/autocomplete\.:ext/:str?', function (req, res) {
        model.find({'uuid' : new RegExp(req.params.str, 'i'),'isActive':true}, '_id uuid isActive', function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/buss/autocomplete-not-in-teacher-student\.:ext/:str?', function (req, res) {
        var  teacher = db.loadModel('Teacher');
        var  student = db.loadModel('Student');
        teacher.find({}, function (err, doc) {
            var usedT = doc.map(function (cl) { return cl.bus; });
            student.find({}, function (err, doc) {
                var usedS = doc.map(function (st) { return st.bus; });
                model.find({_id:{
                        $nin: usedT,
                        $nin: usedS,
                    },'isActive': true}, '_id mac isActive', function (err, doc) {
                    res.status(200).json(doc);
                });
            });
        });
    });
    router.get('/buss/view\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/buss/update\.:ext?', function (req, res) {
        model.findByIdAndUpdate(req.body.bus._id,req.body.bus, function (err, doc) {
        });

        model.findOne({_id: req.body.bus._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/buss/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;