class RouteBusIsFullError(Exception):
    def __init__(self, max_passengers_number):
        self.max_passengers_number = max_passengers_number
        super().__init__(f"You try to add more than {max_passengers_number} passengers for route")

class CannotKillPassengersError(Exception):
    def __init__(self, passengers_number):
        self.passengers_number = passengers_number
        super().__init__(f"Already booked {passengers_number} places, cannot set value, remove few")

class PassengerNotFoundError(Exception):
    def __init__(self):
         super().__init__("Can not find passenger with that identifier")
