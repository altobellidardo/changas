import pandas as pd
import random
import numpy as np
import json

chars = 'abcdefghijklmnopqrstuvwxyz012345678901234567890123456789'

doc = pd.read_csv('./data/dummy_users.csv')

id = [random.choice(chars) for i in range(32)]

data = json.loads("""
{
'name': 'Carlos',
'surname':'Mendez',
'mail':'carlosmendez@gmail.com',
'phone':5409845994321,
'location':'San Nicolás, Buenos Aires, Argentina',
'birth':'1995-08-23'
}

""".replace('‘', '"').replace('’', '"').replace("'", '"')
)

data["id_user"] = f"{''.join(id[:8])}-{''.join(id[8:12])}-{''.join(id[12:16])}-{''.join(id[16:20])}-{''.join(id[20:])}"
data["picture"] = np.NaN
data["dni"] = int(f"{random.choice([2,3,4])}{''.join([str(random.choice(range(0, 10))) for i in range(7)])}")

#print(data)

doc.loc[len(doc.index)] = data

doc.to_csv('users_dummy.csv', index=False)