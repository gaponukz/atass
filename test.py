import dataclasses
import pprint
import typing

@dataclasses.dataclass
class Passenger:
    name: str
    move_from: str
    move_to: str

BUS_SITS: typing.Final = 5 # Max of sits in bus
AVIABLE = typing.Literal['A', 'B', 'C', 'D'] # All (sub)spots
BUS_PATH: typing.Final = typing.get_args(AVIABLE)

sits: dict[typing.Literal[AVIABLE], dict[typing.Literal[AVIABLE], int]] = {}

passengers: list[Passenger] = [
    Passenger("Adam", "A", "D"),
    Passenger("Max", "A", "C"),
    Passenger("Anna", "B", "D"),
    Passenger("Olivia", "B", "D"),
    Passenger("Ethan", "B", "D"),
    Passenger("Charlotte", "B", "D"),
    Passenger("Aiden", "B", "D"),
    Passenger("Amelia", "B", "D"),
    Passenger("Ava", "B", "D"),
    Passenger("Sophia", "B", "D")
]

sits = {item: {jtem: 0 for jtem in BUS_PATH if jtem != item} for item in BUS_PATH} # all aviable from-to routes

if __name__ == "__main__":
    for passenger in passengers:
        for spot in BUS_PATH[BUS_PATH.index(passenger.move_from)+1:BUS_PATH.index(passenger.move_to)]:
            if sits[passenger.move_from][spot] == BUS_SITS:
                raise type("BusFullError", (Exception,), {})()
            
            sits[passenger.move_from][spot] += 1

    pprint.pprint(sits)
