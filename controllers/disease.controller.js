var Disease = require('../models/disease.model');


// Main Page
exports.mainPage = function (req, res) {
    let query = Disease.find(null);
    
    query.exec((err, results) => {
        if (err) throw err;
        res.render('index', { diseases: results });
    });
}



exports.search_post = function (req, res) {
    let query = Disease.find(null);


    if (req.body.search.length <= 10) {
        query.where('title').equals(req.body.search);
    } else {
        query.where('syndromes.syndrome').equals(req.body.search);
    }
    query.exec((err, results) => {
        if (err) throw err;
        res.render('screens/search-screen', { diseases: results });
    });
}


exports.select_post = function (req, res) {
    var arr = [];
    arr = req.body.select;
    let query = Disease.findById(arr);

    query.exec((err, results) => {
        if (err) throw err;
        res.render('screens/select-screen', { diseases: results });
    });
}


exports.updatePage = function (req, res) {
    res.render('admins/update');
}
exports.updatePage2 = function (req, res) {
    res.render('admins/update-sy');
}
exports.updatePage3 = function (req, res) {
    res.render('admins/update-tr');
}
// Admin Page
exports.adminPage = function (req, res) {

    let query = Disease.find(null);
    query.exec((err, results) => {
        if (err) throw err;
        res.render('admins/admin', { diseases: results });
    });
}

// Admin Page2
exports.adminPage2 = function (req, res) {

    let query = Disease.findById(req.params.id);
    query.select('syndromes');
    query.exec((err, results) => {
        if (err) throw err;
        // res.status(200).json({ 'success': true, data: results });
        res.render('admins/admin2', { results: results });
    });
}

// Admin Treatment
exports.adminPage3 = function (req, res) {

    let query = Disease.findById(req.params.id);
    query.select('treatments');
    query.exec((err, results) => {
        if (err) throw err;
        // res.status(200).json({ 'success': true, data: results });
        res.render('admins/admin3', { results: results });
    });
}


// Add New Disease
exports.disease_add = function (req, res) {
    var disease = new Disease({
        title: req.body.title
    });
    disease.save((err) => {
        if (err) throw err;
        // res.status(200).json({ 'success': true, 'msg': 'Added Successfully' });
        res.redirect('/admin');
    });
}

// Update Disease
exports.disease_update = function (req, res) {
    Disease.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, results) {
        if (err) throw err;
        res.redirect('/admin');
    });
}

// Delete Disease
exports.disease_delete = function (req, res) {
    Disease.findByIdAndRemove(req.params.id, function (err) {
        if (err) throw err;
        res.redirect('/admin');
    });
}


// Add Syndrome
exports.syndrome_add = function (req, res) {
    Disease.updateOne({ _id: req.params.id },
        {
            $push: {
                syndromes: {
                    syndrome: req.body.syndrome
                }
            }
        }
        , function (err) {
            if (err) throw err;
            // res.status(200).json({ 'success': true, 'msg': 'Syndrome Added Successfully' });
            res.redirect('/admin');
        });
}

// Update Syndrome
exports.syndrome_update = function (req, res) {
    Disease.updateOne({ _id: req.params.id, "syndromes._id": req.params.syid },
        {
            $set: {
                "syndromes.$.syndrome": req.body.syndrome
            }
        }
        , function (err) {
            if (err) throw err;
            res.redirect('/admin');
        });
}

// Delete Syndrome
exports.syndrome_delete = function (req, res) {
    Disease.updateOne({ _id: req.params.id },
        {
            $pull: {
                syndromes: { _id: req.params.syid }
            }
        }
        , function (err) {
            if (err) throw err;
            // res.status(200).json({ 'success': true, 'msg': 'Syndrome Deleted Successfully' });
            res.redirect('/admin');
        });
}


// Add Treatments
exports.treatment_add = function (req, res) {
    Disease.updateOne({ _id: req.params.id },
        {
            $push: {
                treatments: {
                    treatment: req.body.treatment
                }
            }
        }
        , function (err) {
            if (err) throw err;
            // res.status(200).json({ 'success': true, 'msg': 'Syndrome Added Successfully' });
            res.redirect('/admin');
        });
}

// Update treatment
exports.treatment_update = function (req, res) {
    Disease.updateOne({ _id: req.params.id, "treatments._id": req.params.tid },
        {
            $set: {
                "treatments.$.treatment": req.body.treatment
            }
        }
        , function (err) {
            if (err) throw err;
            res.redirect('/admin');
        });
}

// Delete treatment
exports.treatment_delete = function (req, res) {
    Disease.updateOne({ _id: req.params.id },
        {
            $pull: {
                treatments: { _id: req.params.tid }
            }
        }
        , function (err) {
            if (err) throw err;
            // res.status(200).json({ 'success': true, 'msg': 'Syndrome Deleted Successfully' });
            res.redirect('/admin');
        });
}

// all Data
exports.alldata = function (req, res) {
    let query = Disease.find(null);
    query.exec((err, results) => {
        if (err) throw err;
        res.status(200).json({ 'success': true, 'data': results });
    });
}


