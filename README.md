# Azure-FACE-API

<h2> What is Face Detection API V1.0 ? </h2>

Face API can detect faces in an image, returns faceId's, face rectangles, landmarks, and attributes. The Face Detection API takes image in the form of image url or image file and returns JSON responses, and uses standard HTTP response codes. 

<h5> Face ID </h5> - Unique identifier string for each detected face in an image. 

<h5> Face rectangles </h5> - Rectangle area for the face location on image.
<img src="https://github.com/Divya-Sri-Sanaganapalli/Azure-FACE-API/blob/main/FaceRectangle.png" alt = "face rectangle img" width="700" height = "300">

<h5> Face Landmarks </h5> - Set of easy-to-find points on a face, such as the pupils or the tip of the nose. By default, there are 27 predefined landmark points. The following figure shows all 27 points:
<img src="https://github.com/Divya-Sri-Sanaganapalli/Azure-FACE-API/blob/main/FaceLandmarks.png" alt="face attribute img" width="600" height="400">

<h5> Face attributes </h5>  - Extracts face related attributes, such as age, gender, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise, qualityForRecognition.

<h2> How is Face Detection API V1.0 built ?</h2>

 - Consumed API : Azure Face API V1.0 - Detect, recognitionModel - "recognition_03", detectionModel - "detection_01".
 - Programming Language: Node JS, Express JS 
 - Protocol : HTTP 
 - File upload : [Multer](https://www.npmjs.com/package/multer) 
 - API Playground : [Swagger](https://swagger.io/)
 
 <h2> How Face Detection API V1.0 works ? </h2>
  
  - When the user uploads the image either URL or image file for the face detection, The Face Detection API V1.0 hits the Azure Face API V1.0 - Detect. The Azure  Face API V1.0 - Detect, performs the face detection, returns the face ID, face rectangles, face landmarks and face attributes of that image in the form of JSON      response. It can detect upto 100 faces for an image and Faces are ranked by face rectangle size from large to small.

  
 <h2> How to consume Face Detection API V1.0 API ? </h2>
 
 <h4> Input requirements: </h4>
 
  - The Allowed image file formats are JPEG, PNG, GIF (the first frame), and BMP format are supported.
  - The Image file Size is from 1KB to 6MB.
  - The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
 
 <h3> Try out this API with Postman! </h3>
 
 - Input Image URL : Set request method to 'POST' and set the Request URL as
 ```
 "https://67.205.172.73:3000/api/v1/detectFace?imageURL=<paste image url here>"
 
 ```
 - Input Image File upload: Set request method to 'POST', set the Request URL as below, Set 'body', form-data and give KEY as imageURL, upload file in VALUE.
 
 ```
 https://67.205.172.73:3000/api/v1/detectFace
 
 ```
 
 <h3>Video Demonstration for using this API using Postman! </h3>
  
  
 <h3> Try out with Swagger Playground! </h3>
 
 ```
  - http://67.205.172.73:3000/docs

 ```
 
  <h5> Request Headers </h5>
  
  For Input Image URL then Set Header as 
  
  ```
  'Content-Type': 'application/json'
 
  ```
  
  For Input Image File upload then Set Header as  
  
  ```
  'Content-Type': 'multipart/form-data'
   
  ```
  
  <h3>Video Demonstration for using this API with Swagger! </h3>
  
  
  
  <h3> Responses and its meaning: </h3> 
  
  
  
  
  <h5> Sample Success Response </h5>
  
  ```
  [
    {
        "faceId": "c0d65972-1815-4156-8dcc-0b4b391e3b7a",
        "faceRectangle": {
            "top": 204,
            "left": 427,
            "width": 271,
            "height": 271
        },
        "faceLandmarks": {
            "pupilLeft": {
                "x": 493.7,
                "y": 282.6
            },
            "pupilRight": {
                "x": 620.3,
                "y": 275.5
            },
            "noseTip": {
                "x": 571.1,
                "y": 350.8
            },
            "mouthLeft": {
                "x": 510.7,
                "y": 402.3
            },
            "mouthRight": {
                "x": 620.6,
                "y": 400.9
            },
            "eyebrowLeftOuter": {
                "x": 433.5,
                "y": 272.1
            },
            "eyebrowLeftInner": {
                "x": 520.8,
                "y": 254.8
            },
            "eyeLeftOuter": {
                "x": 473.6,
                "y": 289.2
            },
            "eyeLeftTop": {
                "x": 491,
                "y": 276.3
            },
            "eyeLeftBottom": {
                "x": 495.5,
                "y": 294
            },
            "eyeLeftInner": {
                "x": 515.4,
                "y": 286
            },
            "eyebrowRightInner": {
                "x": 591,
                "y": 252.5
            },
            "eyebrowRightOuter": {
                "x": 661.9,
                "y": 249
            },
            "eyeRightInner": {
                "x": 600.2,
                "y": 282.4
            },
            "eyeRightTop": {
                "x": 619.6,
                "y": 267.4
            },
            "eyeRightBottom": {
                "x": 622.4,
                "y": 287.2
            },
            "eyeRightOuter": {
                "x": 643,
                "y": 277.1
            },
            "noseRootLeft": {
                "x": 544,
                "y": 290.2
            },
            "noseRootRight": {
                "x": 577.2,
                "y": 289.9
            },
            "noseLeftAlarTop": {
                "x": 542.8,
                "y": 330.4
            },
            "noseRightAlarTop": {
                "x": 589.4,
                "y": 327.2
            },
            "noseLeftAlarOutTip": {
                "x": 527.3,
                "y": 354.9
            },
            "noseRightAlarOutTip": {
                "x": 608,
                "y": 351.9
            },
            "upperLipTop": {
                "x": 571.7,
                "y": 392.9
            },
            "upperLipBottom": {
                "x": 572.4,
                "y": 398.4
            },
            "underLipTop": {
                "x": 574.3,
                "y": 418.3
            },
            "underLipBottom": {
                "x": 574.6,
                "y": 430.8
            }
        },
        "faceAttributes": {
            "smile": 0.98,
            "gender": "female",
            "age": 28,
            "facialHair": {
                "moustache": 0,
                "beard": 0,
                "sideburns": 0
            },
            "glasses": "NoGlasses",
            "emotion": {
                "anger": 0,
                "contempt": 0.02,
                "disgust": 0,
                "fear": 0,
                "happiness": 0.98,
                "neutral": 0,
                "sadness": 0,
                "surprise": 0
            },
            "blur": {
                "blurLevel": "medium",
                "value": 0.55
            },
            "exposure": {
                "exposureLevel": "goodExposure",
                "value": 0.57
            },
            "noise": {
                "noiseLevel": "medium",
                "value": 0.37
            },
            "makeup": {
                "eyeMakeup": true,
                "lipMakeup": true
            },
            "accessories": [],
            "occlusion": {
                "foreheadOccluded": false,
                "eyeOccluded": false,
                "mouthOccluded": false
            },
            "hair": {
                "bald": 0.03,
                "invisible": false,
                "hairColor": [
                    {
                        "color": "black",
                        "confidence": 1
                    },
                    {
                        "color": "brown",
                        "confidence": 0.67
                    },
                    {
                        "color": "gray",
                        "confidence": 0.59
                    },
                    {
                        "color": "other",
                        "confidence": 0.51
                    },
                    {
                        "color": "blond",
                        "confidence": 0.05
                    },
                    {
                        "color": "red",
                        "confidence": 0.02
                    },
                    {
                        "color": "white",
                        "confidence": 0
                    }
                ]
            },
            "qualityForRecognition": "high"
        }
    }
]

```


  
