var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Parent');
    var fields = '_id isActive username name email aadhar school address mobile pitStop lat lng pitLat pitLng createdOn createdBy modifiedOn modifiedBy';
    router.get('/parents\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
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
        db.loadModel('School');
        model.find({}, fields, pagination, function (err, doc) {
        }).populate('school')
            .exec().then(function (doc) {
            var data = new Object();
            data.data = doc;
            model.count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        });
    });
    router.post('/parents/login\.:ext?', function (req, res) {
        model.findOne({username:req.body.username, password:crypto.encrypt(req.body.password)},fields, function (err, doc) {
            if(doc.length ==0){
                model.findOne({email:req.body.username, password:crypto.encrypt(req.body.password)},fields, function (err, doc) {
                    res.status(200).json(doc);
                });
            }
            else {
                res.status(200).json(doc);
            }
        });
    });
    router.get('/parents/autocomplete\.:ext/:str?', function (req, res) {
        model.find({'name' : new RegExp(req.params.str, 'i'),'isActive':true}, fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/parents/add\.:ext"?', function (req, res) {
        const parentModel = model;
        if(req.body.parent.password){
            req.body.parent.password = crypto.encrypt(req.body.parent.password);
        }
        const newParent = new parentModel(req.body.parent);
        parentModel.create(newParent, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/parents/view\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/parents/update\.:ext?', function (req, res) {
        if(req.body.parent.password){
            req.body.parent.password = crypto.encrypt(req.body.parent.password);
        }
        model.findByIdAndUpdate(req.body.parent._id,req.body.parent, function (err, doc) {
        });

        model.findOne({_id: req.body.parent._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/parents/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
