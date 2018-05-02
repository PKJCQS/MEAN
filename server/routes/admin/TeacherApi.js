var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Teacher');
    var modelInfo = db.loadModel('TeacherInfo');
    var fields = '_id isActive firstName lastName email mobile idcard school address createdOn createdBy modifiedOn modifiedBy';
    router.get('/teachers\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
        db.loadModel('TeacherInfo');
        db.loadModel('Idcard');
        db.loadModel('school');
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

        }).populate('idcard').populate('school')
            .exec().then(function (doc) {
            var data = new Object();
            data.data = doc;
            model.count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        });
    });
    router.post('/teachers/add\.:ext?', function (req, res) {
        const teacherModel = model;
        const teacherInfoModel = db.loadModel('TeacherInfo');

        const newTeacher = new teacherModel({
            isActive: req.body.teacher.isActive,
            firstName: req.body.teacher.firstName,
            lastName: req.body.teacher.lastName,
            email: req.body.teacher.email,
            mobile: req.body.teacher.mobile,
            idcard: req.body.teacher.idcard,
            school: req.body.teacher.school,
            address:req.body.teacher.address,
            password: crypto.encrypt(req.body.teacher.password),
            createdOn: req.body.teacher.createdOn,
            createdBy: req.body.teacher.createdBy,
        });
        teacherModel.create(newTeacher, function (err, doc) {
            if(req.body.teacher.subjects) {
                for(var i=0; i<req.body.teacher.subjects.length; i++) {
                    var teacherInfo = new teacherInfoModel({
                        teacher: doc._id,
                        subject: req.body.teacher.subjects[i],
                    });
                    teacherInfoModel.create(teacherInfo, function (err, doc1) {
                        model.find({}, function (err, doc) {
                            res.status(200).json(doc);
                        });
                    });
                }
            }
        });

    });
    router.post('/teachers/login\.:ext?', function (req, res) {
        db.loadModel('TeacherInfo');
        model.findOne({email:req.body.email, password:crypto.encrypt(req.body.password)}, fields, function (err, doc) {
            res.status(200).json(doc);
        }).populate('idcard')
            .exec().then(function (doc) {
        });
    });
    router.get('/teachers/view.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            var data = new Object();
            data.data = doc;
            if(doc) {
                modelInfo.find({teacher: req.params.id}, 'subject', function (err, doc1) {
                    data.subjects = doc1;
                    res.status(200).json(data);
                });
            }
        });
    });
    router.get('/teachers/getDetail\.:ext/:id', function (req, res) {
        db.loadModel('TeacherInfo');
        model.findOne({_id : req.params.id}, fields, function (err, doc) {
            // delete doc.password;
            res.status(200).json(doc);
        }).populate('teacherInfo')
            .exec().then(function (doc) {
        });
    });
    router.post('/teachers/update\.:ext?', function (req, res) {
        const teacherModel = model;
        const teacherInfoModel = db.loadModel('TeacherInfo');

        const teacherData = {
            isActive: req.body.teacher.isActive,
            firstName: req.body.teacher.firstName,
            lastName: req.body.teacher.lastName,
            email: req.body.teacher.email,
            mobile: req.body.teacher.mobile,
            idcard: req.body.teacher.idcard,
            school: req.body.teacher.school,
            address:req.body.teacher.address,
            password: req.body.teacher.password ? crypto.encrypt(req.body.teacher.password) : '',
            modifiedOn: req.body.teacher.modifiedOn,
            modifiedBy: req.body.teacher.modifiedBy
        };

        teacherModel.findByIdAndUpdate(req.body.teacher._id,teacherData, function (err, doc) {
        });
        teacherInfoModel.find({teacher : req.body.teacher._id}).remove().exec();
        if(req.body.teacher.subjects) {
            for(var i=0; i<req.body.teacher.subjects.length; i++) {
                var teacherInfo = new teacherInfoModel({
                    teacher: req.body.teacher._id,
                    subject: req.body.teacher.subjects[i],
                });
                teacherInfoModel.create(teacherInfo, function (err, doc1) {

                });
            }
        }
        model.findOne({_id: req.body.teacher._id},fields, function (err, doc) {
            res.status(200).json(doc);
        }).populate('teacherInfo')
            .exec().then(function (doc) {
        });
    });
    router.get('/teachers/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        });
    });
};
module.exports.loadRoutes = loadRoutes;
