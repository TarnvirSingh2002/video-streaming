import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4} from "uuid";
import path from "path"
import fs from "fs"
import { exec } from "child_process";//watch me
// import { error } from "console";
// import { stderr, stdout } from "process";

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
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}
`;

  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`)
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
    const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;

    res.json({
      message: "Video converted to HLS format",
      videoUrl: videoUrl,
      lessonId: lessonId
    })
  })
    
});

app.listen(3000, () => {
    console.log("listen at port 3000");
})