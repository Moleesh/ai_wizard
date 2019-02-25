import os
from flask import Flask, request, send_file
from imageai.Detection import ObjectDetection
from flask_cors import CORS, cross_origin
import tensorflow as tf
global graph, model
graph = tf.get_default_graph()


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
execution_path = os.getcwd()


@app.route('/', methods=['POST'])
@cross_origin()
def hello_world():
    with graph.as_default():
        file = request.files['file']
        # file.save(os.path.join(execution_path, file.filename))
        detector = ObjectDetection()

        detector.setModelTypeAsRetinaNet()
        detector.setModelPath(os.path.join(
            execution_path, "resnet50_coco_best_v2.0.1.h5"))
        detector.loadModel()
        detector.detectObjectsFromImage(
            input_image=file, output_image_path=os.path.join(execution_path, file.filename))

# for eachObject in detections:
#     print(eachObject["name"], " : ", eachObject["percentage_probability"])

    return ""
# for eachObject in detections:
#     print(eachObject["name"], " : ", eachObject["percentage_probability"])

# detections, extracted_images = detector.detectObjectsFromImage(input_image=os.path.join(
#     execution_path, "image.jpg"), output_image_path=os.path.join(execution_path, "imagenew.jpg"), extract_detected_objects=True)


@app.route('/', methods=['GET'])
@cross_origin()
def my_view_func():
    filename = request.args.get('filename')
    return send_file(filename, mimetype='image/gif')


if __name__ == '__main__':
    app.run()
