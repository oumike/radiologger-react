from flask import Flask, jsonify
from rlb.ReferenceUpdater import ReferenceUpdater

app = Flask(__name__)

@app.route('/')
def index():
    return "there be nothing here but dragons and smelly feet"

@app.route('/updatestations')
def updatestations():
    ru = ReferenceUpdater()
    ru.update_database()
    return jsonify({'updated': 'true'})

if __name__ == '__main__':
    app.run(debug=True)