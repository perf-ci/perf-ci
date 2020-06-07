from flask import Flask, render_template, url_for, redirect, session
from authlib.integrations.flask_client import OAuth
from requests import Response
from flask_sslify import SSLify

app = Flask(__name__, static_url_path='/', static_folder='frontend/build', template_folder='frontend/build')
app.config.from_pyfile('app.config')
sslify = SSLify(app)

@app.route('/')
def homepage():
    return render_template('index.html')


oauth = OAuth(app)
github = oauth.register('github',
                        client_kwargs={'scope': 'openid profile email user'}
                        )


@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    app.logger.info(f'Redirect URI {redirect_uri}')
    return oauth.github.authorize_redirect(redirect_uri)


@app.route('/authorize')
def auth():
    token = oauth.github.authorize_access_token()
    user :Response = oauth.github.get('user', token=token)
    session['user'] = user.json()
    session.modified = True

    return redirect('/')
