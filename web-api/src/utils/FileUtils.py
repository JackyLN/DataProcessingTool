import datetime
import time
from os import path

def GenerateFileName(filename, outExtension):

  current = time.mktime(datetime.datetime.now().timetuple())

  return path.splitext(filename)[0] + '_' + str(current) + outExtension