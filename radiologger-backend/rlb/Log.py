from flask_restplus import Namespace, Resource, fields
from tinydb import TinyDB, Query

api = Namespace('logs', description='Logs made')

log = api.model('Log', {
    'id': fields.String(required=True, description='The log identifier'),
})

db = TinyDB('reference.json')
logs_table = db.table('logs')

@api.route('/')
class LogList(Resource):
    @api.doc('list_logs')
    @api.marshal_list_with(log)
    def get(self):
        return logs_table.all()

@api.route('/<int:id>')
class Log(Resource):
    @api.doc('get_log')
    @api.marshal_with(log)
    def get(self, id):
        return logs_table.search(Query()['id'] == id)
