from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, backref

from database import Base
from perf_ci.models.benchmark import benchmark_commit_table


class Commit(Base):
    __tablename__ = 'commits'
    id = Column(Integer, primary_key=True)
    hash_code = Column(String(50), unique=True)
    description = Column(String(200))
    author_name = Column(String(50))
    author_email = Column(String(50))

    project_id = Column(Integer, ForeignKey('projects.id'))
    project = relationship('Project', backref=backref('commits', lazy=True))

    benchmarks = relationship('Benchmark', secondary=benchmark_commit_table, back_populates='commits')

    def __init__(self, hash_code, description='No description', author_name='Unknown', author_email='Unknown'):
        self.hash_code = hash_code
        self.description = description
        self.author_name = author_name
        self.author_email = author_email

    def __repr__(self):
        return f'<Commit <{self.hash_code} {self.description}>'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
