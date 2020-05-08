from flask_restplus import Api
from flask import Flask
from rlb.Station import api as station_api
from rlb.SourceDestination import api as sourcedestination_api
from rlb.Log import api as log_api
from werkzeug.contrib.fixers import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)

api = Api(
    app,
    title='Radio Logger API',
    version='0.1',
    description='Back-end for a companion to shortwave DX listening.'
)

api.add_namespace(station_api)
api.add_namespace(sourcedestination_api)
api.add_namespace(log_api)

if __name__ == '__main__':
    app.run(debug=True)