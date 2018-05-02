var loadRoutes = function (db, router, crypto) {
    // Get all posts
    var model = db.loadModel('Student');
    var fields = '_id isActive firstName middleName lastName gender classroom aadhar parent pickup rollNo idcard school address createdOn createdBy modifiedOn modifiedBy';
    router.get('/students\.:ext/:page/:pageSize/:sortBy/:sortType?', function (req, res) {
        db.loadModel('Idcard');
        db.loadModel('School');
        db.loadModel('Pickup');
        db.loadModel('Parent');
        //db.loadModel('Classroom');
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

        }).populate('idcard').populate('school').populate('classroom').populate('parent').populate('pickup')
            .exec().then(function (doc) {
            var data = new Object();
            data.data = doc;
            model.count({}, function (err, count) {
                data.total = count;
                res.status(200).json(data);
            });
        });
    });
    router.post('/students/add\.:ext?', function (req, res) {
        const studentModel = model;

        const newStudent = new studentModel({
            isActive: req.body.student.isActive,
            firstName: req.body.student.firstName,
            middleName: req.body.student.middleName,
            lastName: req.body.student.lastName,
            gender: req.body.student.gender,
            classRoom: req.body.student.classRoom,
            idcard: req.body.student.idcard,
            school: req.body.student.school,
            address:req.body.student.address,
            aadhar: req.body.student.aadhar,
            parent:req.body.student.parent,
            pickup:req.body.student.pickup,
            rollNo:req.body.student.rollNo,
            createdOn: req.body.student.createdOn,
            createdBy: req.body.student.createdBy,
        });
        studentModel.create(newStudent, function (err, doc) {
            res.status(200).json(doc);
        });

    });
    router.post('/students/login\.:ext?', function (req, res) {
        db.loadModel('StudentInfo');
        model.findOne({email:req.body.email, password:crypto.encrypt(req.body.password)}, fields, function (err, doc) {
            res.status(200).json(doc);
        }).populate('idcard')
            .exec().then(function (doc) {
        });
    });
    router.get('/students/view.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id},fields, function (err, doc) {
            var data = new Object();
            data.data = doc;
            if(doc) {
                modelInfo.find({student: req.params.id}, 'subject', function (err, doc1) {
                    data.subjects = doc1;
                    res.status(200).json(data);
                });
            }
        });
    });
    router.get('/students/getDetail\.:ext/:id', function (req, res) {
        db.loadModel('StudentInfo');
        model.findOne({_id : req.params.id}, fields, function (err, doc) {
            // delete doc.password;
            res.status(200).json(doc);
        }).populate('studentInfo')
            .exec().then(function (doc) {
        });
    });
    router.post('/students/update\.:ext?', function (req, res) {
        const studentModel = model;
        const studentInfoModel = db.loadModel('StudentInfo');

        const studentData = {
            isActive: req.body.student.isActive,
            firstName: req.body.student.firstName,
            middleName: req.body.student.middleName,
            lastName: req.body.student.lastName,
            gender: req.body.student.gender,
            classRoom: req.body.student.classRoom,
            idcard: req.body.student.idcard,
            school: req.body.student.school,
            address:req.body.student.address,
            aadhar: req.body.student.aadhar,
            parent:req.body.student.parent,
            pickup:req.body.student.pickup,
            rollNo:req.body.student.rollNo,
            modifiedOn: req.body.student.modifiedOn,
            modifiedBy: req.body.student.modifiedBy
        };

        studentModel.findByIdAndUpdate(req.body.student._id,studentData, function (err, doc) {
        });
        model.findOne({_id: req.body.student._id},fields, function (err, doc) {
            res.status(200).json(doc);
        }).populate('studentInfo')
            .exec().then(function (doc) {
        });
    });
    router.get('/students/delete\.:ext/:id?', function (req, res) {
        model.findOne({_id : req.params.id}).remove().exec();
        model.find({}, function (err, doc) {
            res.status(200).json(doc);
        });
    });
};
module.exports.loadRoutes = loadRoutes;
