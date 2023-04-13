from src.db.sql.database import SessionLocal
from src.db.sql.database import Base
from src.db.sql.database import engine
from src.db.sql.models import *

from src.logic.entities import Route
from src.interfaces import IRouteDataBase

class SqlRouteDataBase(IRouteDataBase):
    def __init__(self):
        Base.metadata.create_all(bind=engine)
        self.db = SessionLocal()

    ...
