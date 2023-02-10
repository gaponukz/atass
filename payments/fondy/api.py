import json
import hashlib
import requests
from .currencies import CURRENCIES

class API:
    """Basic Fondy API Wrapper"""
    URL_ROOT = 'https://api.fondy.eu/api'
    ENDPOINTS = {
        'order_status': '/status/order_id',
        'p2pcredit': '/p2pcredit/',
        'checkout': '/checkout/redirect/',
        'checkout_url': '/checkout/url/',
    }

    def __init__(self, merchant_id=None, merchant_key=None, server_callback_url=None):
        self.merchant_id = merchant_id
        self.merchant_key = merchant_key
        self.server_callback_url = server_callback_url

    def url(self, action: str) -> str:
        """
        Builds URL to use
        :param self:
        :param action
        :return: url string
        """
        assert action in self.ENDPOINTS, "%s is not within allowed: %s" % (
            action, ', '.join(self.ENDPOINTS.keys()))
        return '%s%s' % (self.URL_ROOT, self.ENDPOINTS[action])

    def request(self, method: str, action: str, data: dict) -> dict:
        """
        :param method:
        :param action:
        :param data:
        :return:
        """
        assert method in ['get', 'post'], "%s method is not allowed" % method
        assert isinstance(data, dict), "data must be dictionary"
        assert action in self.ENDPOINTS, "action %s is not allowed" % action

        headers = {'Content-Type': 'application/json'}
        params = {
            "url": self.url(action),
            "data": self.sign(data),
            "headers": headers
        }
        return getattr(requests, method)(**params).json()

    def get(self, action: str, data: dict) -> dict:
        """
        Wrapper around self.request to simplify get requests
        :param action:
        :param data:
        :return:
        """
        return self.request('get', action, data)

    def post(self, action: str, data: dict) -> dict:
        """
        Wrapper around self.request to simplify post requests
        :param action:
        :param data:
        :return:
        """
        return self.request('post', action, data)

    def sign(self, data):
        """
        Create signature https://portal.fondy.eu/en/info/api/v1.0/3/#chapter-5
        Takes dict like below and adds "signature" into the "request":
        {
          "request":{
            "order_id":"test123456",
            "order_desc":"test order",
            "currency":"USD",
            "amount":"125",
            "signature":"f0ee6288b9295d3b808bcd8d720211c7201245e1", <-- that
            "merchant_id":"1396424"
          }
        }
        """
        assert 'request' in data.keys()
        keys = sorted(data['request'].keys())
        values = [self.merchant_key]
        values += [data['request'][key] for key in keys]
        try:
            raw = '|'.join(values)
        except Exception as e:
            raise Exception(e, values)

        raw_data = raw.encode('utf-8')
        data['request']['signature'] = hashlib.sha1(raw_data).hexdigest()

        return json.dumps(data)

    def order_status(self, order_id):
        """
        Check order status
        https://portal.fondy.eu/en/info/api/v1.0/5#chapter-5-4-json
        """
        assert type(order_id) is str
        data = {
           'request': {
                'order_id': order_id,
                'merchant_id': self.merchant_id,
            }
        }
        return self.post('order_status', data)

    def p2pcredit(self, order_id):
        assert type(order_id) is str
        data = {
           'request': {
                'order_id': order_id,
                'merchant_id': self.merchant_id,
            }
        }
        return self.post('p2pcredit', data)

    def checkout(self, order_id, amount, order_desc='', response_url=None, currency='UAH'):
        assert currency in CURRENCIES, "%s is now valid currency" % currency

        if not isinstance(order_id, str):
            order_id = str(order_id)

        data = {
            "request": {
                "server_callback_url": self.server_callback_url,
                'response_url': response_url,
                "order_id": order_id,
                "currency": currency,
                "merchant_id": str(self.merchant_id),
                "order_desc": order_desc,
                "amount": str(amount),
            }
        }
        return self.post('checkout_url', data)
