from flask_restplus import Namespace, Resource, fields
from tinydb import TinyDB, Query

api = Namespace('sourcedestinations', description='Source/Destinations in the schedule')

source_destination = api.model('SourceDestination', {
    'id': fields.String(required=True, description='The source/destintion identifier'),
    'name': fields.String(required=True, description='Name of the source/destination'),
})

db = TinyDB('reference.json')
sourcedestination_table = db.table('sourcedestination')

@api.route('/')
class SourceDestinationList(Resource):
    @api.doc('list_sourcedestinations')
    @api.marshal_list_with(source_destination)
    def get(self):
        return sourcedestination_table.all()

@api.route('/<int:id>')
class SourceDestination(Resource):
    @api.doc('get_sourcedestination')
    @api.marshal_with(source_destination)
    def get(self, id):
        return sourcedestination_table.search(Query()['id'] == id)