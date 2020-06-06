import logging

from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.responses import RedirectResponse, JSONResponse

logger = logging.getLogger('github')

config = Config(".env")
oauth = OAuth(config)
github = oauth.register('github',
                        client_kwargs={'scope': 'openid profile email user'}
                        )

async def login(request):
    redirect_uri = request.url_for('github_auth')
    logger.info(f'Redirect URL {redirect_uri}')
    return await oauth.github.authorize_redirect(request, redirect_uri)


async def auth(request):
    token = await oauth.github.authorize_access_token(request)
    user = await oauth.github.get('user', token=token)
    request.session['user'] = user

    return JSONResponse(user.json())
