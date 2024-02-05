var express = require('express');
const router = express.Router()
let nodemailer = require('nodemailer');
let Docsmodel = require("../models/docsModel")
const {
    adminLoginPage,
    adminLogin,
    adminDashboard,
    viewAllTouristplaces,
    addHotelForm,
    addNewHotel,
    viewAllHotel,
    deleteHotel,
    editHotelForm,
    editHotel,
    addHospitalForm,
    addNewHospital,
    viewAllHospital,
    deleteHospital,
    editHospitalForm,
    editHospital,
    addCollegeForm,
    addNewCollege,
    viewAllColleges,
    deleteCollege,
    editCollegeForm,
    editCollege,

    addIndustryForm,
    addNewIndustry,
    viewAllIndustries,
    deleteIndustry,
    editIndustryForm,
    editIndustry,

    addJobForm,
    addNewJob,
    viewAllJobs,
    deleteJob,
    editJobForm,
    editJob,

    addTheaterForm,
    addNewTheater,
    viewAllTheaters,
    deleteTheater,
    editTheaterForm,
    editTheater,

    addTravelAgencyForm,
    addNewTravelAgency,
    viewAllTravelAgencies,
    deleteTravelAgency,
    editTravelAgencyForm,
    editTravelAgency,
    addLibraryForm,
    addNewLibrary,
    viewAllLibraries,
    deleteLibrary,
    editLibraryForm,
    editLibrary,
    adminLogout,
    viewAllStudents,
    viewAllJobSeekers,
    viewAllTourists,
    addTourist,
    getTourist,
    addDocs

} = require("../controllers/admin-controller");
const checkAdmin = require("../middleware/checkAdmin");
const docsModel = require('../models/docsModel');

/* GET users listing. */
router.get("/addDocs",(req,res)=>{
    try {
        res.render("admin/add-new-docs")
    } catch (error) {
        console.log(error)
    }
})
router.post('/addDocs',async(req,res)=>{
    try {
        console.log(req.body,req.files,req.body)
        let docid = await Docsmodel.create(req.body)
        let docsId = docid._id
        let docName = req.files.doc;
        let uploadPath = "./public/docs/"+ docsId  + ".pdf"
        docName.mv(uploadPath,(err,row)=>{
                if(!err) res.redirect("/admin/addDocs")
                else{
                        res.status(400);
                        res.redirect("/admin/addDocs")
                  }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("Error while uploading docs")
    }
})

router.get("/getDoc",async(req,res)=>{
    try {
        let docs = await docsModel.find({})
        res.render("admin/get-docs",{docs})
    } catch (error) {
        console.log(error)
    }
})
router.route('/login').get(adminLoginPage).post(adminLogin);
router.route('/logout').get(adminLogout);
router.route('/').get(checkAdmin, adminDashboard);

 router.route('/get-Tourist-add-page').get(checkAdmin,getTourist)

router.route('/view-all-students').get(checkAdmin, viewAllStudents);
router.route('/view-all-job-seekers').get(checkAdmin, viewAllJobSeekers);
router.route('/view-all-tourists').get(checkAdmin, viewAllTourists);

router.route('/add-hotel').get(checkAdmin, addHotelForm).post(checkAdmin, addNewHotel);
router.route('/view-all-hotels').get(checkAdmin, viewAllHotel);
router.route('/delete-hotel/:id').get(checkAdmin, deleteHotel);
router.route('/edit-hotel/:id').get(checkAdmin, editHotelForm).post(checkAdmin, editHotel);

router.route('/add-hospital').get( addHospitalForm).post( addNewHospital);
router.route('/view-all-hospitals').get(viewAllHospital);
router.route('/delete-hospital/:id').get(deleteHospital);
router.route('/edit-hospital/:id').get(editHospitalForm).post(editHospital);

router.route('/add-college').get(checkAdmin, addCollegeForm).post(checkAdmin, addNewCollege);
router.route('/view-all-colleges').get(checkAdmin, viewAllColleges);
router.route('/delete-college/:id').get(checkAdmin, deleteCollege);
router.route('/edit-college/:id').get(checkAdmin,editCollegeForm).post(checkAdmin, editCollege);
router.route('/add-tourist').post(checkAdmin,addTourist)
router.route('/add-Industry').get(checkAdmin, addIndustryForm).post(checkAdmin, addNewIndustry);
router.route('/view-all-industries').get(checkAdmin, viewAllIndustries);
router.route('/delete-Industry/:id').get(checkAdmin, deleteIndustry);
router.route('/edit-Industry/:id').get(checkAdmin, editIndustryForm).post(checkAdmin, editIndustry);


router.route('/add-Job').get(checkAdmin, addJobForm).post(checkAdmin, addNewJob);
router.route('/view-all-Jobs').get(checkAdmin, viewAllJobs);
router.route('/delete-Job/:id').get(checkAdmin, deleteJob)
router.route('/edit-Job/:id').get(checkAdmin, editJobForm).post(checkAdmin, editJob);

router.route('/add-library').get(checkAdmin, addLibraryForm).post(checkAdmin, addNewLibrary);
router.route('/view-all-libraries').get(checkAdmin, viewAllLibraries);
router.route('/delete-library/:id').get(checkAdmin, deleteLibrary)
router.route('/edit-library/:id').get(checkAdmin, editLibraryForm).post(checkAdmin, editLibrary);

router.route('/add-theater').get(checkAdmin, addTheaterForm).post(checkAdmin, addNewTheater);
router.route('/view-all-theaters').get(checkAdmin, viewAllTheaters);
router.route('/delete-theater/:id').get(checkAdmin, deleteTheater)
router.route('/edit-theater/:id').get(checkAdmin, editTheaterForm).post(checkAdmin, editTheater);
router.get('/getPlace', checkAdmin,viewAllTouristplaces)


router.get("/addCertificate",(req,res)=>{
    try {
        res.render("admin/addCertificate")
    } catch (error) {
      console.log(error)  
    }
})
router.get("/viewCertificate",(req,res)=>{
    try {
        res.render("admin/viewCertificate")
    } catch (error) {
      console.log(error)  
    }
})
router.post("/add-Certificate",(req,res)=>{
        try {
            let {image} = req.files;
            let {regNo} = req.body;
            let {email} = req.body;
            console.log(image,regNo,email)
            console.log("mailing to comapny",req.params)
            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                  user:'ecommercetest246@gmail.com',
                  pass:'iftgqrcgrduigxuk'
                },
                tls:{
                  rejectUnauthorized:false,
                },
              })

              let mailOption  = {
                from:"Commen  education platform",
                to:email,
                subject:"Certfication Compleated",
                text:"Your certificate has been issued please use link to downlard certificate http://localhost:4000/admin/viewCertificate",
              };

              transporter.sendMail(mailOption,function(err,info){
                if(err){
                  console.log(err)
                }else{
                  console.log("emailsent Succecfully")
                  image.mv('./public/Certificate/' + regNo + ".jpg").then((err) => {
                    if (!err) {
                        return res.redirect('/admin/addCertificate')
                    }
                    return res.redirect('/admin/addCertificate')
                })
                }
              })
           
        } catch (error) {
            console.log(error)
        }
})
module.exports = router;
