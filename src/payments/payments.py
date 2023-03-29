from fondy.api import API
import uuid
import time
import pprint
import os

api = API(
    merchant_id = os.environ.get('fondy_merchant_id'),
    merchant_key = os.environ.get('fondy_merchant_key')
)

order_id = str(uuid.uuid4())
response = api.checkout(order_id, 1000, "Order #342")
print(response)

time.sleep(60)

pprint.pprint(api.order_status(order_id))
