__all__ = (
    'PlaceModel',
    'PassengerModel',
    'SpotModel',
    'Route'
)

import uuid
import json

from sqlalchemy.orm import relationship
from sqlalchemy.types import TypeDecorator
from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    DateTime,
    Text
)

from src.db.sql.database import Base

class Dict(TypeDecorator):
    impl = Text(256)

    def process_bind_param(self, value, _):
        if value is not None:
            value = json.dumps(value)

        return value

    def process_result_value(self, value, _):
        if value is not None:
            value = json.loads(value)
        
        return value


class PlaceModel(Base):
    __tablename__ = "places"

    id = Column(String, primary_key=True, default=str(uuid.uuid4()))
    country = Column(String)
    city = Column(String)
    street = Column(String)
    map_url = Column(String, default=None)


class PassengerModel(Base):
    __tablename__ = "passengers"

    id = Column(String, primary_key=True, default=str(uuid.uuid4()))
    
    first_name = Column(String)
    last_name = Column(String)
    phone_number = Column(String)
    email_address = Column(String, default=None)

    moving_from_id = Column(String, ForeignKey('spots.id'))
    moving_towards_id = Column(String, ForeignKey('spots.id'))
    moving_from = relationship("SpotModel", foreign_keys=[moving_from_id])
    moving_towards = relationship("SpotModel", foreign_keys=[moving_towards_id])

    route_id = Column(ForeignKey("routes.id"))
    route = relationship("RouteModel", back_populates="passengers")


class SpotModel(Base):
    __tablename__ = "spots"

    id = Column(String, primary_key=True, default=str(uuid.uuid4()))
    place_id = Column(String, ForeignKey('places.id'))
    date = Column(DateTime)
    is_active = Column(Boolean, default=True)
    place = relationship("PlaceModel", foreign_keys=[place_id])

    route_id = Column(ForeignKey("routes.id"))
    route = relationship("RouteModel", back_populates="sub_spots", foreign_keys=[route_id])


class Route(Base):
    __tablename__ = "routes"

    id = Column(String, primary_key=True, default=str(uuid.uuid4()))
    move_from_id = Column(String, ForeignKey('spots.id'))
    move_to_id = Column(String, ForeignKey('spots.id'))
    passengers_number = Column(Integer)
    passengers = relationship("PassengerModel", back_populates="route", foreign_keys=[PassengerModel.route_id])
    sub_spots = relationship("SpotModel", back_populates="route", foreign_keys=[SpotModel.route_id])
    is_active = Column(Boolean)
    prices = Column(String)
    description = Column(Dict())
    rules = Column(Dict())
    transportation_rules = Column(Dict())
