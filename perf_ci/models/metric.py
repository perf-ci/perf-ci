from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, backref

from database import Base


class Metric(Base):
    __tablename__ = 'metrics'
    id = Column(Integer, primary_key=True)
    iterations = Column(Integer)
    real_time = Column(Integer)
    cpu_time = Column(Integer)

    benchmark_id = Column(Integer, ForeignKey('benchmarks.id'))
    benchmark = relationship('Benchmark', backref=backref('metrics', lazy=True))

    def __init__(self, iterations=None, real_time=None, cpu_time=None):
        self.iterations = iterations
        self.real_time = real_time
        self.cpu_time = cpu_time

    def __repr__(self):
        return f'<Metric <{self.id} {self.benchmark}>'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
