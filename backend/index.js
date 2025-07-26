const express = require('express')
const multer = require('multer')
const cors = require('cors')
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express()
const port = 3000

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage })

app.post("/convertFile", upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded',
      })
    }

    const inputPath = path.join(__dirname, req.file.path);
    const outputDir = path.join(__dirname, 'files');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const outputPath = path.join(outputDir, req.file.originalname.replace(/\.[^/.]+$/, "") + ".pdf");

    // LibreOffice command
    
    const sofficePath = 'C:\\Program Files\\LibreOffice\\program\\soffice.exe';
    const command = `"${sofficePath}" --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log("LibreOffice error:", error);
        console.log("stderr:", stderr);
        console.log("stdout:", stdout);
        return res.status(500).json({
          message: 'Error converting docx to PDF',
          stderr: stderr,
          stdout: stdout,
          error: error.message
        });
      }
      res.download(outputPath, () => {
        // Optionally, clean up files here
        // fs.unlinkSync(inputPath);
        // fs.unlinkSync(outputPath);
      });
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// echo "# PDF-Convertor" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Arfatalam/PDF-Convertor.git
// git push -u origin main


// git remote add origin https://github.com/Arfatalam/PDF-Convertor.git
// git branch -M main
// git push -u origin main