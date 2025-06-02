import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4} from "uuid";
import path from "path"
import fs from "fs"

const app = express();

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static("uploads"));

const storage = multer.diskStorage({// in this we tell that we save in the disk Storage 
    destination: function (req, file, cb) {
    cb(null, './uploads'); // Save to 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uuidv4() + path.extname //in thid we create the file name
    (file.originalname));
  }
});

//multer configuration
const upload = multer({storage:storage}); // here storage information is stored

app.post('/uplo',upload.single('file'),(req,res)=>{// here (file) is the name that is 
// given when we upload the file through the postman
    const lessonId=uuidv4();
    const videoPath=req.file.path;
    const outputPath = `./uploads/courses/${lessonId}`
    const hlsPath=`${outputPath}/index.m3u8`
    console.log("hlsPath:",hlsPath);

    if(!fs.existsSync(outputPath)){
      fs.mkdirSync(outputPath,{recursive: true})
    }
    //ffmpeg

    
});



app.listen(3000, () => {
    console.log("listen at port 3000");
})