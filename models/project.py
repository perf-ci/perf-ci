from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, backref

from database import Base


class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    api_token = Column(String(50), unique=True)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref=backref('projects', lazy=True))


    UniqueConstraint('user_id', 'name', name='uix_1')

    def __init__(self, name=None, email=None):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<Project %r>' % self.name

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
