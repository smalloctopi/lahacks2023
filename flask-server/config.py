# from dotenv import load_dotenv
import os
import redis

basedir = os.path.abspath(os.path.dirname(__file__)) + '/instance'

# load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET"]
    # SECRET_KEY = "secret"


    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    # SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    SQLALCHEMY_DATABASE_URI = "sqlite:///hackathon.db"
    # SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "db.sqlite")



    # SESSION_TYPE = "redis"
    SESSION_TYPE = "filesystem"

    SESSION_PERMANENT = False # change back to False
    SESSION_USE_SIGNER = True
    # SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")

    SESSION_COOKIE_SAMESITE="None" # testing these
    SESSION_COOKIE_SECURE=True

    # UPLOAD_FOLDER = "uploads"
    # UPLOAD_PATH = "uploads"
