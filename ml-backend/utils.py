import os
import shutil
import random
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np

def split_dataset(source_dir, train_dir, val_dir, val_ratio=0.2):
    """
    Split dataset into train and validation folders.

    Args:
        source_dir (str): Path to source dataset directory with class subfolders.
        train_dir (str): Path to output train directory.
        val_dir (str): Path to output validation directory.
        val_ratio (float): Ratio of validation data.

    """
    if not os.path.exists(train_dir):
        os.makedirs(train_dir)
    if not os.path.exists(val_dir):
        os.makedirs(val_dir)

    classes = [d for d in os.listdir(source_dir) if os.path.isdir(os.path.join(source_dir, d))]

    for cls in classes:
        cls_source = os.path.join(source_dir, cls)
        cls_train = os.path.join(train_dir, cls)
        cls_val = os.path.join(val_dir, cls)

        if not os.path.exists(cls_train):
            os.makedirs(cls_train)
        if not os.path.exists(cls_val):
            os.makedirs(cls_val)

        files = os.listdir(cls_source)
        random.shuffle(files)
        val_count = int(len(files) * val_ratio)

        val_files = files[:val_count]
        train_files = files[val_count:]

        for f in train_files:
            shutil.copy2(os.path.join(cls_source, f), os.path.join(cls_train, f))
        for f in val_files:
            shutil.copy2(os.path.join(cls_source, f), os.path.join(cls_val, f))

def load_trained_model(model_path):
    """
    Load the trained Keras model from file.
    """
    model = load_model(model_path)
    return model

def predict_image(model, image_path, target_size=(224, 224), class_indices=None):
    """
    Predict the class of an image using the trained model.

    Args:
        model: Loaded Keras model.
        image_path (str): Path to the image file.
        target_size (tuple): Image size for resizing.
        class_indices (dict): Mapping from class names to indices.

    Returns:
        List of dicts with label and probability.
    """
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # normalize

    preds = model.predict(img_array)[0]
    if class_indices:
        inv_map = {v: k for k, v in class_indices.items()}
        results = [{"label": inv_map[i], "probability": float(preds[i])} for i in range(len(preds))]
    else:
        results = [{"class": i, "confidence": float(preds[i])} for i in range(len(preds))]
    return results
