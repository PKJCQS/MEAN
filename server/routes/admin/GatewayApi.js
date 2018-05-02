var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Gateway');
    var fields = '_id isActive name location mac school ip wifiname wifiPassword gatewayUsername gatewayPassword readingDistance createdOn createdBy modifiedOn modifiedBy schoolInfo';
    router.get('/gateways\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
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
    router.post('/gateways/add\.:ext"?', function (req, res) {
        const gatewayModel = model;
        const newGateway = new gatewayModel(req.body.gateway);
        gatewayModel.create(newGateway, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/gateways/autocomplete\.:ext/:str?', function (req, res) {
        model.find({'mac' : new RegExp(req.params.str, 'i'),'isActive':true}, '_id mac isActive', function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/gateways/autocomplete-not-in-classroom\.:ext/:str?', function (req, res) {
        var  classroom = db.loadModel('Classroom');
        classroom.find({}, function (err, doc) {
            var used = doc.map(function (cl) { return cl.gateway; });
            model.find({_id:{
                    $nin: used
                },'isActive': true}, '_id mac isActive', function (err, doc) {
                res.status(200).json(doc);
            });
        });
    });
    router.get('/gateways/view\.:ext/:id?', function (req, res) {
        db.loadModel('School');
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/gateways/update\.:ext?', function (req, res) {
        model.findByIdAndUpdate(req.body.gateway._id,req.body.gateway, function (err, doc) {
        });

        model.findOne({_id: req.body.gateway._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/gateways/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
