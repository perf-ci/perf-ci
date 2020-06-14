from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

def init_db(db_url):
    engine = create_engine(db_url, convert_unicode=True)
    db_session = scoped_session(sessionmaker(autocommit=False,
                                             autoflush=False,
                                             bind=engine))
    Base.query = db_session.query_property()

    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    import perf_ci.models
    Base.metadata.create_all(bind=engine)

    return db_session
