import logging

from authlib.integrations.flask_client import OAuth
from starlette.config import Config
from starlette.responses import RedirectResponse, JSONResponse

logger = logging.getLogger('github')

config = Config(".env")
oauth = OAuth(config)
github = oauth.register('github',
                        client_kwargs={'scope': 'openid profile email user'}
                        )

