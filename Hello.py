import os
from flask import Flask, request, send_from_directory
from werkzeug.utils import secure_filename
from imageai.Detection import ObjectDetection
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

UPLOAD_FOLDER = os.path.dirname(os.path.realpath(__file__))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/', methods=['POST'])
@cross_origin()
def hello_world():

    file = request.files['file']
 #   file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

    # fake user agent of Safari

    execution_path = os.getcwd()
    detector = ObjectDetection()
    detector.setModelTypeAsRetinaNet()
    detector.setModelPath(os.path.join(
        execution_path, "resnet50_coco_best_v2.0.1.h5"))
    detector.loadModel()
    detections = detector.detectObjectsFromImage(
        input_image=file, output_image_path=os.path.join(execution_path, "imagenew.jpg"))

# for eachObject in detections:
#     print(eachObject["name"], " : ", eachObject["percentage_probability"])

    return ""
# for eachObject in detections:
#     print(eachObject["name"], " : ", eachObject["percentage_probability"])

# detections, extracted_images = detector.detectObjectsFromImage(input_image=os.path.join(
#     execution_path, "image.jpg"), output_image_path=os.path.join(execution_path, "imagenew.jpg"), extract_detected_objects=True)


if __name__ == '__main__':
    app.run()
