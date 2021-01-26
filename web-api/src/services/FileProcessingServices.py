from __main__ import app

@app.route('/file/test', methods=['GET'])
def test():
    return 'it works!'