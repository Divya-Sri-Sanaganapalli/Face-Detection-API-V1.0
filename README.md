# Azure-FACE-API

<h2> What is Face Detection API V1.0 ? </h2>

Face API can detect faces in an image, returns faceId's, face rectangles, landmarks, and attributes. The Face Detection API takes image in the form of image url or image file and returns JSON responses, and uses standard HTTP response codes. 

<h5> Face ID </h5> - Unique identifier string for each detected face in an image. 

<h5> Face rectangles </h5> - Top, left, width, height of the face 
<img src="https://images.readwrite.com/wp-content/uploads/2020/01/History-of-Facial-Recognition-Technology-825x500.jpg.webp" alt = "face rectangle img" width="500" height = "300">
<h5> Face Landmarks </h5> - Set of easy-to-find points on a face, such as the pupils or the tip of the nose. By default, there are 27 predefined landmark points. The following figure shows all 27 points:
<img src="https://github.com/Divya-Sri-Sanaganapalli/Azure-FACE-API/blob/main/FaceLandmarks.png" alt="face attribute img" width="600" height="400">

<h5> Face attributes </h5>  - Extracts face related attributes, such as age, gender, smile, facialHair, glasses, emotion, hair, makeup, occlusion, accessories, blur, exposure, noise, qualityForRecognition.

<h2> How is Face Detection API V1.0 built ?</h2>
 
 - Programming Language: Node JS, Express JS 
 - Protocol : HTTP 
 - API Playground : [Swagger](https://swagger.io/)
 - Image Storage : [Multer](https://www.npmjs.com/package/multer) 
 - API used : Azure Face API V1.0 - Detect, recognitionModel - "recognition_03".
 
 <h2> How Face Detection API V1.0 works ? </h2>
  
  When the user uploads the image either URL or image file for the face detection, The Face Detection API V1.0 hits the Azure Face API V1.0 - Detect. The Azure Face   API V1.0 - Detect, performs the face detection, returns the face ID, face rectangles, face landmarks and face attributes of that image in the form of JSON      response. 
