import unittest
from sqlalchemy.exc import IntegrityError

from database import init_db

from perf_ci.models import Project, Benchmark


class ProjectTest(unittest.TestCase):

    def setUp(self) -> None:
        self.db_session = init_db('sqlite://')
        self.project = Project(name='Test project')
        self.db_session.add(self.project)
        self.db_session.commit()

    def test_unique_name(self):
        project = Project(name='Test project')
        self.db_session.add(project)
        with self.assertRaises(IntegrityError):
            self.db_session.commit()

    def test_add_new_commit(self):
        commit = {
            'hash_code': '1234567890',
            'description': 'Some commit',
            'author_email': 'author@email.com',
            'author_name': 'Author',
            'benchmarks': [
                {
                    'name': 'Benchmark1',
                    'metric': {
                        'iterations': 100,
                        'real_time': 200,
                        'cpu_time': 300,
                    }
                },
                {
                    'name': 'Benchmark2',
                    'metric': {
                        'iterations': 300,
                        'real_time': 400,
                        'cpu_time': 500,
                    }
                }
            ]
        }

        self.project.add_commit(commit_data=commit)
        self.db_session.commit()

        bench2 = Benchmark.query.filter_by(name='Benchmark2').one()

        self.assertEqual('Benchmark2', bench2.name)
        self.assertEqual(300, bench2.metrics[0].iterations)
        self.assertEqual(400, bench2.metrics[0].real_time)
        self.assertEqual(500, bench2.metrics[0].cpu_time)

        commit = bench2.commits[0]

        self.assertEqual(2, len(commit.benchmarks))
        self.assertEqual('1234567890', commit.hash_code)
        self.assertEqual('Some commit', commit.description)
        self.assertEqual('author@email.com', commit.author_email)
        self.assertEqual('Author', commit.author_name)
