var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Driver');
    var fields = '_id isActive name username email licenseNo mobileNo address idcard school createdOn createdBy modifiedOn modifiedBy';
    router.get('/drivers\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
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
    router.post('/drivers/add\.:ext"?', function (req, res) {
        const driverModel = model;
        if(req.body.driver.password){
            req.body.driver.password = crypto.encrypt(req.body.driver.password);
        }
        const newDriver = new driverModel(req.body.driver);
        driverModel.create(newDriver, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/drivers/autocomplete\.:ext/:str?', function (req, res) {
        model.find({'name' : new RegExp(req.params.str, 'i'),'isActive':true}, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/drivers/autocomplete-not-in-teacher-student\.:ext/:str?', function (req, res) {
        var  teacher = db.loadModel('Teacher');
        var  student = db.loadModel('Student');
        teacher.find({}, function (err, doc) {
            var usedT = doc.map(function (cl) { return cl.driver; });
            student.find({}, function (err, doc) {
                var usedS = doc.map(function (st) { return st.driver; });
                model.find({_id:{
                        $nin: usedT,
                        $nin: usedS,
                    },'isActive': true}, '_id mac isActive', function (err, doc) {
                    res.status(200).json(doc);
                });
            });
        });
    });
    router.get('/drivers/view\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/drivers/update\.:ext?', function (req, res) {
        if(req.body.driver.password){
            req.body.driver.password = crypto.encrypt(req.body.driver.password);
        }
        model.findByIdAndUpdate(req.body.driver._id,req.body.driver, function (err, doc) {
        });

        model.findOne({_id: req.body.driver._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/drivers/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
