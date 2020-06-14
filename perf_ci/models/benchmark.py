from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint, Table
from sqlalchemy.orm import relationship, backref

from database import Base


benchmark_commit_table = Table('benchmark_commit', Base.metadata,
    Column('commit_id', Integer, ForeignKey('commits.id')),
    Column('benchmark_id', Integer, ForeignKey('benchmarks.id'))
)

class Benchmark(Base):
    __tablename__ = 'benchmarks'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), index=True)

    commits = relationship('Commit', secondary=benchmark_commit_table, back_populates='benchmarks')

    def __init__(self, commit_id=None, name=None):
        self.commit_id = commit_id
        self.name = name

    def __repr__(self):
        return f'<Benchmark <{self.name}>'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
