import os
import firebase_admin
from firebase_admin import credentials, firestore

def initialize_firebase_admin():
    cred = credentials.Certificate(os.environ.get("FIREBASE_ADMIN_SDK_PATH"))
    firebase_admin.initialize_app(cred)
    return firestore.client()