const mongose=require('mongoose');

const facultySchema=new mongose.Schema({

      
      name: String,
      initials: String,    
      department: String,             // Fixed CSE
     designation: String,           // Professor/Lecturer
     image: String,                 // optional
     courses: [String],             // ["Programming 1", "DSA", "DBMS"]
     avgRating: {
      type: Number,
      default: 0
     },             // auto calculate
     totalReviews: {
      type: Number,
      default: 0
     }


})
module.exports=mongose.model('faculty',facultySchema);