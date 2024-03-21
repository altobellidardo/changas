import pandas as pd
import random
import numpy as np

chars = 'abcdefghijklmnopqrstuvwxyz0123456789'

doc = pd.read_csv('C:/Users/mrulli/Desktop/Dev/Changas/data/users_dummy.csv')

id = [random.choice(chars) for i in range(32)]

data = {
    'id_user':f'{id[:8]}-{id[8:12]}-{id[12:16]}-{id[16:20]}-{id[20:]}',
    "name": "Esteban",
  "surname": "Quiroga",
  "mail": "quirogaesteban@gmail.com",
  "phone": 541159876543.0,
  "location": "Tandil, Buenos Aires, Argentina",
  "dni": 22987456,
  "birth": "1996-04-15"
}

print(doc)
doc.loc[len(doc.index)] = ['asfasfa', 'asdasd', 'jtyjgf', 'sdfsdf', 32423423.0, 'htyrsd', 3452, '324543', 1321.0]

doc.to_csv('users_dummy.csv')