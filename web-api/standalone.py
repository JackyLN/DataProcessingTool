import pandas as pd
import glob
import codecs
import os.path
from os import path
import sys

#
# This is standalone python script to run without REST API.
# It requires /input, and /output folder
###
###
###

INPUT_DIR = os.path.dirname(sys.argv[0]) + '/input'
OUTPUT_DIR = os.path.dirname(sys.argv[0]) + '/output'

#Check output directory
check_in = path.exists(INPUT_DIR)
check_out = path.exists(OUTPUT_DIR)

if not check_in:
    sys.exit('Please provide input in "input" directory')
if not check_out:
    sys.exit('Please create an "output" directory')

try:
    #Load input data
    #Only except csv file
    all_files = glob.glob(INPUT_DIR + "/*.csv")

    for filename in all_files:

        doc = codecs.open(filename,'rU','UTF-16') #open for reading with "universal" type set
        df = pd.read_csv(doc, sep='\t')

        #Modify columns
        #df["Ticket Id"] = df["Ticket Id"].astype(str)
        #df["Interaction Fbid"] = df["Interaction Fbid"].astype(str)
        #df["interaction_owner_id"] = df["interaction_owner_id"].astype(str)

        #Check every columns, if it's int64 -> convert to str
        for col in df.columns:
            if pd.api.types.is_int64_dtype(df[col]):
                df[col] = df[col].astype(str)


        file_out = OUTPUT_DIR + '/' + path.splitext(path.basename(filename))[0] + '.xlsx'
        df.to_excel(file_out, index=False)

        print('Converted to: ' + file_out)

except Exception as e:
        print(e)

finally: 
    print('Goodbye!!!')
