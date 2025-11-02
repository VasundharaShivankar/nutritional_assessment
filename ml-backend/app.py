from flask import Flask, request, jsonify, render_template
from utils import process_image, predict_with_vgg16, load_trained_model, predict_image  # Import functions from utils.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = None
class_indices = None

@app.before_first_request
def load_model():
    global model, class_indices
    model_path = 'model/vgg16_finetuned.h5'
    model = load_trained_model(model_path)
    # Assuming class indices are known or saved, here hardcoded for example
    class_indices = {
        'onycholysis': 0,
        'psoriasis': 1,
        'skin_infection': 2,
        'stunted_growth': 3
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/routes', methods=['GET'])
def list_routes():
    import urllib
    output = []
    for rule in app.url_map.iter_rules():
        methods = ','.join(rule.methods)
        line = urllib.parse.unquote(f"{rule.endpoint}: {rule} [{methods}]")
        output.append(line)
    return jsonify(routes=output)

import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file part in the request'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        img_path = os.path.join('uploads', filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(img_path)
        try:
            predictions = process_image(img_path)
        except ImportError as e:
            return jsonify({'error': str(e) + ' Please install or clone yolov5 repository properly.'}), 500
        except Exception as e:
            return jsonify({'error': 'Processing error: ' + str(e)}), 500
        return jsonify({'predictions': predictions})
    else:
        return jsonify({'error': 'Invalid file type'}), 400

@app.route('/vgg16', methods=['POST'])
def vgg16():
    if 'image' not in request.files:
        print("No image file part in the request")
        return "No image file part in the request", 400
    file = request.files['image']
    if file.filename == '':
        print("No selected file")
        return "No selected file", 400
    if file and allowed_file(file.filename):
        # Check file extension for supported formats (exclude avif)
        ext = file.filename.rsplit('.', 1)[1].lower()
        if ext == 'avif':
            print("AVIF image format not supported")
            return "AVIF image format not supported. Please upload JPEG or PNG images.", 400
        filename = secure_filename(file.filename)
        img_path = os.path.join('uploads', filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(img_path)
        print(f"Received image file: {filename}")
        try:
            predictions = predict_image(model, img_path, class_indices=class_indices)
        except Exception as e:
            print(f"Processing error: {str(e)}")
            return "Processing error: " + str(e), 500

        # Find top prediction
        top_pred = max(predictions, key=lambda x: x['probability'])
        disease = top_pred['label']
        probability = top_pred['probability']

        # Disease details mapping
        disease_details = {
            'onycholysis': 'Onycholysis is the painless separation of the nail from the nail bed.',
            'psoriasis': 'Psoriasis is a chronic autoimmune condition that causes skin cells to build up rapidly.',
            'skin_infection': 'Skin infections are caused by bacteria, viruses, or fungi affecting the skin.',
            'stunted_growth': 'Stunted growth is a condition where a child is significantly shorter than average for their age.'
        }

        details = disease_details.get(disease, 'No details available.')

        # Prepare plain text response
        response_text = f"Disease: {disease}\nProbability: {probability:.2%}\nDetails: {details}"
        print(f"Prediction result: {response_text}")

        return response_text, 200
    else:
        print("Invalid file type")
        return "Invalid file type", 400

if __name__ == '__main__':
    app.run(debug=True)

