const { default: axios } = require('axios');
var express = require('express'); 
const app = express(); // express server
const port = 3000; // setting the port to localhost:3000
var multer = require('multer'); // multer is middleware for handling the uploading files. Multer adds a body object and a file or files object to the request object.
//var upload = multer({dest:'upload/img'}); // dest is path where the uploaded files are stored. When using dest the upload image has no extension so switched to the multer storage.
//var upload = multer({ storage: storage }) // creates multer storage
const path = require('path'); //requiring path to work with file and directory paths
require('dotenv').config();
//console.log(process.env);

//swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
var cors = require('cors');
app.use(cors());

const options = {
    swaggerDefinition: {
        info: {
            title: 'REST API to detect faces in an image',
            version: '1.0.0',
            description: 'System Integration - Project'
        },
        host: '67.205.172.73:3000', // replace this after deploying in server
        basePath: '/',
    },
    apis: ['server.js'],
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

//face api 
let subscriptionKey = process.env.API_KEY;
let face_api_uri = process.env.API_URL;


var image_storage = multer.diskStorage({     // multer has two storage options diskStorage and memoryStorage but I have used diskStorage because it has full control of storing files to disk.
    destination: './html/uploaded/files', //  destination folder where the uploaded files are stored.
    filename: (req, file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}_${(file.originalname)}`) //specifying the fieldname_date_originalfilename.extension (to make sure the file name is unique) of the file to the uploaded file or else the multer will create the random file names without extensions.
    }
});

const upload = multer({
  storage: image_storage,         
  limits: {
      fileSize: 6000000    //file size limit is 6 MB
  },
  fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname); // ext takes the uploading file extensions
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif'  && ext !== '.bmp') { //validates the file extensions when uploading the image
          return cb(new  multer.MulterError('Allowed file formats PNG, JPG/JPEG, GIF, BMP!!'));
      }
      cb(null, true)
  },
});

/**
 * @swagger
 * /api/v1/detectFace:
 *    post:
 *      description: Detects the faces in image and returns faceid, faceRectangle, faceLandmarks and faceAttributes
 *      parameters:
 *          - in: formData
 *            name: imageURL
 *            description: the image url for face detection
 *            schema: 
 *              type: object
 *              properties: 
 *                 imageURL: string
 *          - in: formData
 *            name: imageFile
 *            type: file
 *            description: The image file for face detection. Allowed file formats PNG, JPG/JPEG, GIF, BMP!!'
 *      responses:
 *          200:
 *              description: Successfully detects the face and provide face id, coordinates of the faces detected from the image
 *          400:
 *              description: Bad Request or invalid request
 *          500:
 *              description: Internal server error        
 */

// multer supports both single and multiple file uploads. upload.single is used to upload single file. In postman to test the file upload the keyword given in upload.single i.e img need to be used.
app.post('/api/v1/detectFace', upload.single('imageFile'), (req, res) => {
    //let inputURL = req.query.imageURL
    let inputURL = req.body.imageURL
    let inputFile = req.file
    // Handling url or file requests
    let imageURL;
    if (inputURL && inputFile) {
        return res.status(400).json( {
            error : {
                code:"InvalidInputs",
                message:"You are allowed to input either URL or file. Requesting both at the same time is not allowed"
            }
        });
    } else if (inputURL) {
        imageURL = inputURL;
    } else if (inputFile) {
        imageURL = `http://67.205.172.73/uploaded/files/${inputFile.filename}` 
    } else {
        return res.status(400).json( {
            error : {
                code:"MissingInput",
                message:"You should either input image url or upload image file"
            }
        });
    }
    let options = {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        },
        params: {
            recognitionModel : "recognition_03",
            returnFaceLandmarks : true,
            returnFaceAttributes : 'age, gender, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise, qualityForRecognition'
        }
    }
    let data = {
        'url': imageURL
    }
    
    axios.post(face_api_uri, data, options)
    .then(resp => { // response from FACE API
        if(resp.data.length!= 0){
            res.send(resp.data); // forwarding current request with FACE API's response data
        }else{
        return res.status(400).json( {
            error : {
                code:"NoFaceDetected",
                message:"No face detected in the given input"
            }
        });
    } })
    .catch(error =>{
        //res.send(CircularJSON.stringify(temp));
        console.error(error.response);
        //res.send(error.response.data);
        res.status(error.response.status).json(
            error.response.data
    )})
});

// Handling multer errors 
function multerErrorHandler(error, req, res, next) {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            error: {
                code: error.code,
                message: "Bad Request"
            }
        })
    }
    else {
        return res.status(500).json({
            error: {
                message: error.message
            }
        })
    }
}

app.use(multerErrorHandler);


app.get('/', (req, res) => {
    res.send('Welcome');
});



app.listen(port, () => {
    console.log('listening to the port: ' + port);
});
