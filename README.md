

<h2> What is Face Detection API V1.0 ? </h2>

Face API can detect faces in an image, returns faceId's, face rectangles, landmarks, and attributes. The Face Detection API takes image in the form of image url or image file and returns JSON responses, and uses standard HTTP response codes. 

<h5> Face ID </h5> - Unique identifier string for each detected face in an image. 

<h5> Face rectangles </h5> - Rectangle area for the face location on image.
<img src="https://github.com/Divya-Sri-Sanaganapalli/Azure-FACE-API/blob/main/FaceRectangle.png" alt = "face rectangle img" width="700" height = "300">

<h5> Face Landmarks </h5> - Set of easy-to-find points on a face, such as the pupils or the tip of the nose. By default, there are 27 predefined landmark points. The following figure shows all 27 points:
<img src="https://github.com/Divya-Sri-Sanaganapalli/Azure-FACE-API/blob/main/FaceLandmarks.png" alt="face attribute img" width="600" height="400">

<h5> Face attributes </h5>  - Extracts face related attributes, such as age, gender, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise, qualityForRecognition.

<h2> How is Face Detection API V1.0 built ?</h2>

 - Consumed API : Azure Face API V1.0 - Detect, recognitionModel - "recognition_03"
 - Programming Language: Node JS, Express JS 
 - Protocol : HTTP 
 - File upload : [Multer](https://www.npmjs.com/package/multer), Function - diskStorage 
 - API Playground : [Swagger](https://swagger.io/)
 
 <h2> How Face Detection API V1.0 works ? </h2>
  
When the user uploads the image either URL or image file, The Face Detection API V1.0 hits the Azure Face API V1.0 - Detect. The Azure  Face API V1.0 - Detect, performs the face detection, returns the face ID, face rectangles, face landmarks and face attributes of that image in the form of JSON response. 

**If the image URL is given as input in request body to this API, then URL is directed to Azure Face API and In case of image file upload, the file is upload and saved in server and URL of the saved file is then directed to Azure Face API**

It can detect upto 100 faces for an image and Faces are ranked by face rectangle size from large to small.

 <h2> How to consume Face Detection API V1.0 API ? </h2>
 
 <h4> Input constraints: </h4>
 
  - The Allowed image file formats are JPEG, PNG, GIF (the first frame), and BMP format are supported.
  - The Image file Size is from 1KB to 6MB.
  - The minimum detectable face size is 36x36 pixels in an image no larger than 1920x1080 pixels. Images with dimensions higher than 1920x1080 pixels will need a proportionally larger minimum face size.
 
 <h3> Try out this API with Postman! </h3>
 
 Set request method to 'POST' and set the Request URL as
 
 ```
 https://67.205.172.73:3000/api/v1/detectFace
 
 ```
 - Input Image URL :  In Request Body > form-data, Set Key as 'imageURL' and value as '<input image url>' 
 
 - Input Image File upload: In Request Body > form-data, Set Key as 'imageFile' and upload an image file in value 
 
 
 <h3>Video Demonstration for using this API using Postman! </h3>
  
  
  
 <h3> Try out with Swagger Playground! </h3>
 
 ```
 http://67.205.172.73:3000/docs

 ```
  
  <h3>Video Demonstration for using this API using Swagger! </h3>

  https://user-images.githubusercontent.com/86088469/145495282-b848bde4-728c-4054-bedb-665f9c2bf72a.mp4




  
  <h3> Responses </h3> 
  
  <h3> Response Status : 200 - Successfull Response Recieved </h3> 
  JSON fields in response body and its description 
  
  | Fields | Type | Description |
  | --- | --- | --- |  
  | faceId | String | Unique faceId of the detected face, created by detection API and it will expire 24 hours after the detection call.|
  | faceRectangle | Object | A rectangle area for the face location on image. It returns top, left, width, height. |
  | faceLandmarks | Object | An array of 27-point face landmarks pointing to the important positions of face components with X and Y coordinates. |
  | faceAttributes | Object | Attributes include age, gender, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise, qualityForRecognition. <br /> - age: An Estimated visual age i.e how old a person looks rather than actual biological age. <br /> - gender: male or female <br /> smile: smile intensity, a number 0 to 1. <br /> - facialHair: Return lengths in three facial hair areas: moustache, beard and sideburns. The length is a number between [0,1]. 0 for no facial hair in this area, 1 for long or very thick facial hairs in this area. <br /> - headPose: 3-D roll/yaw/pitch angles for face direction. glasses: glasses type. Values include 'NoGlasses', 'ReadingGlasses', 'Sunglasses', 'SwimmingGoggles'. <br /> - emotion: emotion intensity, including neutral, anger, contempt, disgust, fear, happiness, sadness and surprise. <br /> - hair: group of hair values indicating whether the hair is visible, bald, and hair color if hair is visible.  makeup: whether eye, lip areas are made-up or not. <br /> - accessories: accessories around face, including 'headwear', 'glasses' and 'mask'. Empty array means no accessories detected. Note this is after a face is detected. Large mask could result in no face to be detected. <br /> - blur: face is blurry or not. Level returns 'Low', 'Medium' or 'High'. Value returns a number between [0,1], the larger the blurrier. <br /> - exposure: face exposure level. Level returns 'GoodExposure', 'OverExposure' or 'UnderExposure'. <br /> - noise: noise level of face pixels. Level returns 'Low', 'Medium' and 'High'. Value returns a number between [0,1], the larger the noisier. <br /> - occlusion: whether each facial area is occluded. including forehead, eyes and mouth.  <br /> -qualityForRecognition: the overall image quality regarding whether the image being used in the detection is of sufficient quality to attempt face recognition on. The value is an informal rating of low, medium, or high. Only "high" quality images are recommended for person enrollment and quality at or above "medium" is recommended for identification scenarios. |

  
  

  <h4> Sample Success Response </h4>
  
  ```
  [
    {
        "faceId": "fcebf0bb-285c-4614-acce-6285ca909ff6",
        "faceRectangle": {
            "top": 282,
            "left": 213,
            "width": 311,
            "height": 311
        },
        "faceLandmarks": {
            "pupilLeft": {
                "x": 293.2,
                "y": 377.1
            },
            "pupilRight": {
                "x": 435.3,
                "y": 359.7
            },
            "noseTip": {
                "x": 372.1,
                "y": 450.8
            },
            "mouthLeft": {
                "x": 306.5,
                "y": 513.7
            },
            "mouthRight": {
                "x": 438.9,
                "y": 500.5
            },
            "eyebrowLeftOuter": {
                "x": 229.8,
                "y": 354.1
            },
            "eyebrowLeftInner": {
                "x": 316.1,
                "y": 344.1
            },
            "eyeLeftOuter": {
                "x": 270.8,
                "y": 382.7
            },
            "eyeLeftTop": {
                "x": 289.2,
                "y": 370.9
            },
            "eyeLeftBottom": {
                "x": 293.4,
                "y": 384.3
            },
            "eyeLeftInner": {
                "x": 311.1,
                "y": 376.2
            },
            "eyebrowRightInner": {
                "x": 386,
                "y": 340.2
            },
            "eyebrowRightOuter": {
                "x": 485.2,
                "y": 325.1
            },
            "eyeRightInner": {
                "x": 413.8,
                "y": 364.2
            },
            "eyeRightTop": {
                "x": 431.6,
                "y": 352.2
            },
            "eyeRightBottom": {
                "x": 433.6,
                "y": 366.5
            },
            "eyeRightOuter": {
                "x": 454.2,
                "y": 360.3
            },
            "noseRootLeft": {
                "x": 340.1,
                "y": 377.5
            },
            "noseRootRight": {
                "x": 378.5,
                "y": 373.5
            },
            "noseLeftAlarTop": {
                "x": 332.8,
                "y": 427.1
            },
            "noseRightAlarTop": {
                "x": 395.6,
                "y": 417.6
            },
            "noseLeftAlarOutTip": {
                "x": 328.3,
                "y": 454.5
            },
            "noseRightAlarOutTip": {
                "x": 412.9,
                "y": 442.8
            },
            "upperLipTop": {
                "x": 375,
                "y": 498.6
            },
            "upperLipBottom": {
                "x": 377.6,
                "y": 512.4
            },
            "underLipTop": {
                "x": 379.3,
                "y": 517.8
            },
            "underLipBottom": {
                "x": 381.9,
                "y": 535.9
            }
        },
        "faceAttributes": {
            "smile": 1,
            "gender": "female",
            "age": 30,
            "facialHair": {
                "moustache": 0,
                "beard": 0,
                "sideburns": 0
            },
            "glasses": "ReadingGlasses",
            "emotion": {
                "anger": 0,
                "contempt": 0,
                "disgust": 0,
                "fear": 0,
                "happiness": 1,
                "neutral": 0,
                "sadness": 0,
                "surprise": 0
            },
            "blur": {
                "blurLevel": "low",
                "value": 0.04
            },
            "exposure": {
                "exposureLevel": "goodExposure",
                "value": 0.53
            },
            "noise": {
                "noiseLevel": "low",
                "value": 0
            },
            "makeup": {
                "eyeMakeup": true,
                "lipMakeup": true
            },
            "accessories": [
                {
                    "type": "glasses",
                    "confidence": 0.98
                }
            ],
            "occlusion": {
                "foreheadOccluded": false,
                "eyeOccluded": false,
                "mouthOccluded": false
            },
            "hair": {
                "bald": 0.11,
                "invisible": false,
                "hairColor": [
                    {
                        "color": "blond",
                        "confidence": 0.97
                    },
                    {
                        "color": "brown",
                        "confidence": 0.89
                    },
                    {
                        "color": "red",
                        "confidence": 0.52
                    },
                    {
                        "color": "other",
                        "confidence": 0.19
                    },
                    {
                        "color": "gray",
                        "confidence": 0.17
                    },
                    {
                        "color": "black",
                        "confidence": 0.06
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

<h3> Response Status : 400 - Bad Request </h3> 

  - If API is requested with invalid or broken image URL then the following JSON error response will be displayed 
  
  ```
      {
        "error": {
           "code": "InvalidURL",
           "message": "Invalid image URL or error downloading from target server. Remote server error returned: \"The SSL connection could not be established, see              inner exception.\""
       }
     }

 ```
  
  - If API is requested without specifying any uploading image file or image url the following JSON error response will be displayed
  
  ```
           {
            "error" : {
                "code": "MissingInput",
                "message": "You should either input image url or upload image file"
         }
       }
  ```
  
  - If the input images doesn't have any human faces then the following JSON error response will be displayed
  
  ```
           {
            "error" : {
                "code": "NoFaceDetected",
                "message": "No face detected in the given input"
          }
        }
  ```
  
  - If API is requested with image URL and file upload at same time, then following JSON error response will be displayed

  ```
          {
            "error" : {
                "code": "InvalidInputs",
                "message": "You are allowed to input either URL or file. Requesting both at the same time is not allowed"
            }
         }
  ```
  
  - If API is requested with unsupported image file formats, then the following JSON error response will be displayed

  ```
          {
            "error": {
                "code": "Allowed file formats PNG, JPG/JPEG, GIF, BMP!!",
                "message": "Bad Request"
          }
        }
  ```
  
  - If API is requested with the file size larger than 6 MB, then the following JSON error response will be displayed

  ```
         {
           "error": {
               "code": "LIMIT_FILE_SIZE",
               "message": "Bad Request"
           }
         }
       
   ```
  
  <h3> Response Status : 500 - Internal Server Error </h3> 
  
  If there is problem from Azure API service, then the following JSON error response will be displayed
  ```
        {
           "error": {
               "message": "Internal Server Error"
             }
        }
  ```
 
