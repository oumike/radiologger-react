from tinydb import TinyDB, Query
from requests import request, get

class ReferenceUpdater:

    ebi_file = ''
    db = ''

    def __init__(self):
        self.ebi_file = 'http://www.eibispace.de/dx/sked-b19.csv'
        self.db = TinyDB('reference.json')

    def update_database(self):
        self.db.purge_tables()
        schedule_table = self.db.table('schedule_table')
        with get(self.ebi_file) as reader:
        # with open('sked-b19.csv', encoding='latin-1') as reader:
            i = 0
            for line in reader.text.split('\n'):
                if (i != 0):
                    sched = line.split(';')
                    schedule_table.insert({'frequency': sched[0]})
                    print(str(i) + ' rows inserted')
                i = i + 1