from tinydb import TinyDB, Query
from requests import request, get

class ReferenceUpdater:

    ebi_file = ''
    db = ''

    def __init__(self):

        # a is for Summer, b is for Winter, numbers following are for year
        # implement logic for that
        self.ebi_file = 'http://www.eibispace.de/dx/sked-a20.csv'
        self.db = TinyDB('reference.json')

    def build_schedule_table(self):
        self.db.purge_tables()
        schedule_table = self.db.table('schedule_table')
        with get(self.ebi_file) as reader:
        # with open('sked-b19.csv', encoding='latin-1') as reader:
            i = 0
            for line in reader.text.split('\n'):
            # for line in reader.readlines():
                # line = line.rstrip()
                if (i != 0):
                    sched = line.split(';')
                    # kHz:75;Time(UTC):93;Days:59;ITU:49;Station:201;Lng:49;Target:62;Remarks:135;P:35;Start:60;Stop:60;
                    # 16.4;0000-2400;;NOR;JXN Marine Norway;;NEu;no;1;;
                    # 17.2;0730-0830;24Dec;S;SAQ Grimeton;-CW;Eu;gr;6;1312;2412
                    # 18.2;0000-2400;;IND;VTX Indian Navy;;SAs;v;1;;
                    schedule_table.insert({'frequency': sched[0], 'time': sched[1], 'source': sched[3], 'station': sched[4], 'target': sched[6]})
                    if i % 100 == 0: print(str(i) + ' rows inserted')
                i = i + 1

    def build_reference_db(self):
        schedule_table = self.db.table('schedule_table')
        self.db.purge_table('stations') # DO we need to purge this?
        self.db.purge_table('sourcedestination') # Do we need to purge this? 
        station_index = 0
        sourcedestination_index = 0
        station_table = self.db.table('stations')
        sourcedestination_table = self.db.table('sourcedestination')
        stations_box = []
        sourcedestination_box = []
        for schedule_row in schedule_table.all():
            current_station_id = -1
            if schedule_row['station'] not in stations_box:

                if station_index % 10 == 0: print('station index: ' + str(station_index))
                    
                station_table.insert({'id': station_index, 'name': schedule_row['station']})
                current_station_id = station_index
                station_index = station_index + 1
                stations_box.append(schedule_row['station'])
            else:
                current_station_id = stations_box.index(schedule_row['station'])

            current_source_id = -1
            if schedule_row['source'] not in sourcedestination_box:
                sourcedestination_table.insert({'id': sourcedestination_index, 'name': schedule_row['source']})
                current_source_id = sourcedestination_index
                sourcedestination_index = sourcedestination_index + 1
                sourcedestination_box.append(schedule_row['source'])
            else:
                current_source_id = sourcedestination_box.index(schedule_row['source'])
    
    
