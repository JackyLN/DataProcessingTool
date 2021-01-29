from __main__ import app
from flask import request, jsonify

import pandas as pd
import sys
from os import path

import src.utils.FileUtils as fileUtils

@app.route('/file', methods=['GET'])
def file():
  return {
      "status": 200,
      "message": "OK"
    }

@app.route('/file/upload', methods=['POST'])
def upload():
  data = request.get_json()
  convert = csv_handling(data)
  
  #print(convert)
  #return {"message": "ok"} , 200
  #return convert[0]

  print(convert[0])
  print(convert[1])
  return convert[0], convert[1]


def csv_handling(jsonData):
  try:
    #load data
    #doc = codecs.open(filename,'rU','UTF-16') #open for reading with "universal" type set
    df = pd.DataFrame(jsonData["file"])

    OUTPUT_DIR = path.dirname(sys.argv[0]) + '/output'
    OUTPUT_FILE = fileUtils.GenerateFileName(jsonData["name"], '.xlsx')
    
    #Modify columns
    #df["Ticket Id"] = df["Ticket Id"].astype(str)
    #df["Interaction Fbid"] = df["Interaction Fbid"].astype(str)
    #df["interaction_owner_id"] = df["interaction_owner_id"].astype(str)

    #Check every columns, if it's int64 -> convert to str
    for col in df.columns:
      if pd.api.types.is_int64_dtype(df[col]):
          df[col] = df[col].astype(str)

    file_out = OUTPUT_DIR + '/' + OUTPUT_FILE
    df.to_excel(file_out, index=False)
    
    return {"data": file_out}, 200

  except Exception as e:
    return {"message": e}, 400