var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Idcard');
    var fields = '_id isActive mac uuid major minor password school createdOn createdBy modifiedOn modifiedBy';
    router.get('/idcards\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
        db.loadModel('School');
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
        }).populate('school')
            .exec().then(function (doc) {
        });
    });
    router.post('/idcards/add\.:ext"?', function (req, res) {
        const idcardModel = model;
        const newIdcard = new idcardModel(req.body.idcard);
        idcardModel.create(newIdcard, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/idcards/autocomplete\.:ext/:str?', function (req, res) {
        model.find({'uuid' : new RegExp(req.params.str, 'i'),'isActive':true}, '_id uuid isActive', function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/idcards/autocomplete-not-in-teacher-student\.:ext/:str?', function (req, res) {
        var  teacher = db.loadModel('Teacher');
        var  student = db.loadModel('Student');
        teacher.find({}, function (err, doc) {
            var usedT = doc.map(function (cl) { return cl.idcard; });
            student.find({}, function (err, doc) {
                var usedS = doc.map(function (st) { return st.idcard; });
                model.find({_id:{
                        $nin: usedT,
                        $nin: usedS,
                    },'isActive': true}, '_id mac isActive', function (err, doc) {
                    res.status(200).json(doc);
                });
            });
        });
    });
    router.get('/idcards/view\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/idcards/update\.:ext?', function (req, res) {
        model.findByIdAndUpdate(req.body.idcard._id,req.body.idcard, function (err, doc) {
        });

        model.findOne({_id: req.body.idcard._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/idcards/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
