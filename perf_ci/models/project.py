import uuid

from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, backref

from database import Base
from perf_ci.models.commit import Commit
from perf_ci.models.benchmark import Benchmark
from perf_ci.models.metric import Metric


class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    api_token = Column(String(50), unique=True)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', backref=backref('projects', lazy=True))


    UniqueConstraint('user_id', 'name', name='uix_1')

    def __init__(self, user_id=None, name=None):
        self.user_id = user_id
        self.name = name
        self.api_token = str(uuid.uuid4())

    def __repr__(self):
        return '<Project %r>' % self.name

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def add_commit(self, commit_data):
        db_commit = Commit(hash_code=commit_data['hash_code'],
                        description=commit_data['description'],
                        author_name=commit_data['author_name'],
                        author_email=commit_data['author_email'])

        for benchmark in commit_data['benchmarks']:
            db_benchmark = Benchmark.query.filter_by(name=benchmark['name']).one_or_none()
            if db_benchmark is None:
                db_benchmark = Benchmark(name=benchmark['name'])

            metric = benchmark['metric']
            db_metric = Metric(iterations=metric['iterations'],
                               real_time=metric['real_time'],
                               cpu_time=metric['cpu_time'])

            db_benchmark.metrics.append(db_metric)
            db_commit.benchmarks.append(db_benchmark)

        self.commits.append(db_commit)



