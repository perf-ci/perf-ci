from authlib.integrations.starlette_client import OAuth
from starlette.config import Config
from starlette.responses import RedirectResponse, JSONResponse

config = Config(".env")
oauth = OAuth(config)
github = oauth.register('github')


async def login(request):
    redirect_uri = request.url_for('github_auth')
    return await oauth.github.authorize_redirect(request, redirect_uri)


async def auth(request):
    token = await oauth.github.authorize_access_token(request)
    user = await oauth.github.parse_id_token(request, token)

    request.session['user'] = dict(user)
    # return RedirectResponse(url='/')
    return JSONResponse(request.session['user'])
