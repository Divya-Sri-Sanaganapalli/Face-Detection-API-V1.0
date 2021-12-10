const { default: axios } = require('axios');
var express = require('express'); 
const app = express(); // express server
const port = 3000;
var multer = require('multer');  
const path = require('path'); 
require('dotenv').config(); 

//swagger configuration
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
            title: 'Swagger for Face Detection API',
            version: '1.0.0',
            description: 'The Azure Face API V1.0 - Detect, performs the face detection, returns the face ID, face rectangles, face landmarks and face attributes of that image in the form of JSON response.'
        },
        host: '67.205.172.73:3000', 
        basePath: '/',
    },
    apis: ['server.js'],
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

//Azure Face API key and URI 
let subscriptionKey = process.env.API_KEY;
let face_api_uri = process.env.API_URL;

// Multer Configuration
var image_storage = multer.diskStorage({     
    destination: './html/uploaded/files', //  destination folder where the uploaded files are stored.
    filename: (req, file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}_${(file.originalname)}`) 
    }
});

const upload = multer({
  storage: image_storage,         
  limits: {
      fileSize: 6000000    //file size limit is 6 MB
  },
  fileFilter: function (req, file, cb) {
      var ext = path.extname(file.originalname); 
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif'  && ext !== '.bmp') { 
          return cb(new  multer.MulterError('Allowed file formats PNG, JPG/JPEG, GIF, BMP!!'));
      }
      cb(null, true)
  },
});

// Swagger Playground!

/**
 * @swagger
 * /api/v1/detectFace:
 *    post:
 *      description: Detects the faces in image and returns faceid, faceRectangle, faceLandmarks and faceAttributes
 *      consumes:
 *          - multipart/form-data
 *      produces:
 *          - application/json
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


app.post('/api/v1/detectFace', upload.single('imageFile'), (req, res) => {
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
            res.send(resp.data); 
        }else{
        return res.status(400).json( {
            error : {
                code:"NoFaceDetected",
                message:"No face detected in the given input"
            }
        });
    } })
    .catch(error =>{
        console.error(error.response);
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
                code: error.code,
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
