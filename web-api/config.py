# import os
# class Config(object):
#     DEBUG = False
#     TESTING = False
#     CSRF_ENABLED = True
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
#     TWITTER_OAUTH_CLIENT_KEY = os.environ.get("TWITTER_OAUTH_CLIENT_KEY")
#     TWITTER_OAUTH_CLIENT_SECRET = os.environ.get("TWITTER_OAUTH_CLIENT_SECRET")
#     PORT = os.environ.get("PORT")

# class ProductionConfig(Config):
#     DEBUG = False
#     SECRET_KEY = "9asdf8980as8df9809sf6a6ds4f3435fa64ˆGggd76HSD57hsˆSDnb"
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

# class DevelopmentConfig(Config):
#     ENV = "development"
#     DEVELOPMENT = True
#     SECRET_KEY = "secret_for_test_environment"
#     OAUTHLIB_INSECURE_TRANSPORT = True
#     SQLALCHEMY_TRACK_MODIFICATIONS = True

import os

class FlaskConfig():
  DEBUG = True
  TESTING = False
  DEVELOPMENT = True
  ENV = "development"
  #SERVER_NAME= os.environ.get("SERVER_NAME")
  SERVER_NAME='localhost:7701'
  CSRF_ENABLED = True