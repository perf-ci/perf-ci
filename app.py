from typing import List

from authlib.integrations.flask_client import OAuth
from flask import Flask, render_template, url_for, redirect, session, abort, jsonify
from flask_cors import CORS
from flask_sslify import SSLify
from database import db_session, init_db
from models import User, Project

app = Flask(__name__, static_url_path='/', static_folder='frontend/build', template_folder='frontend/build')
app.config.from_pyfile('app.config')
sslify = SSLify(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

oauth = OAuth(app)
github = oauth.register('github',
                        client_kwargs={'scope': 'openid profile email user'}
                        )

init_db()


@app.route('/')
def homepage():
    return render_template('index.html')


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    app.logger.info(f'Redirect URI {redirect_uri}')
    return oauth.github.authorize_redirect(redirect_uri)


@app.route('/authorize')
def auth():
    token = oauth.github.authorize_access_token()
    github_user = oauth.github.get('user', token=token).json()

    db_user = User.query.filter_by(name=github_user['login']).first()
    if not db_user:
        app.logger.info(f'New user "{github_user["login"]}" has logged. Save them.')

        db_user = User(github_user['login'], github_user['email'])
        db_session.add(db_user)
        db_session.commit()

    session['user'] = db_user.as_dict()
    session.modified = True

    return redirect('/')


def authorized(func):
    def wrapper():
        try:
            current_user = session['user']
            return func(current_user)
        except KeyError:
            abort(401)

    wrapper.__name__ = func.__name__  # trick flask's checks
    return wrapper


@app.route('/api/logout')
def logout():
    del session['user']
    return {}


@app.route('/api/user')
@authorized
def user(current_user):
    return jsonify(current_user)


@app.route('/api/projects', methods=['GET'])
@authorized
def get_projects(current_user):
    projects = Project.query.filter_by(user_id=current_user['id'])
    return jsonify([project.as_dict() for project in projects])
