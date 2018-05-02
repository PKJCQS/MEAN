var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Pickup');
    var fields = '_id isActive address lat lng createdOn createdBy modifiedOn modifiedBy';
    router.get('/pickups\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
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
        });
    });
    router.get('/pickups/autocomplete\.:ext/:str?', function (req, res) {
        model.find({'address' : new RegExp(req.params.str, 'i'),'isActive':true}, fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.post('/pickups/add\.:ext"?', function (req, res) {
        const pickupModel = model;
        const newPickup = new pickupModel(req.body.pickup);
        pickupModel.create(newPickup, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/pickups/view\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            res.status(200).json(doc);
        })
    });
    router.post('/pickups/update\.:ext?', function (req, res) {
        model.findByIdAndUpdate(req.body.pickup._id,req.body.pickup, function (err, doc) {
        });

        model.findOne({_id: req.body.pickup._id},fields, function (err, doc) {
            res.status(200).json(doc);
        });
    });
    router.get('/pickups/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        })
    });
};
module.exports.loadRoutes = loadRoutes;
