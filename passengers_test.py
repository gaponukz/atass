import unittest
from db.utils.entities import AuthorizedUser
from db.utils.errors import UserNotFoundError
from db.memory_passengers_db import MemoryPassengerDatabase

class EntitiesTest(unittest.TestCase):
    def test_register(self):
        db = MemoryPassengerDatabase()
        self.assertEqual(len(db), 0)

        passenger = AuthorizedUser("Mark", "Dor", "3804628643")

        db.add_one(passenger)
        self.assertEqual(len(db), 1)
        self.assertFalse(passenger.is_authenticated)
        self.assertEqual(db.get_one(passenger.id), passenger)

        with self.assertRaises(UserNotFoundError):
            db.login("3804628643", "1234")
        
        db.register_one(passenger, "1234")

        self.assertTrue(passenger.is_authenticated)
        self.assertEqual(len(db), 1)

        self.assertEqual(db.login("3804628643", "1234"), passenger)

        db.remove_one(passenger.id)
        self.assertEqual(len(db), 0)

if __name__ == "__main__":
    unittest.main()
