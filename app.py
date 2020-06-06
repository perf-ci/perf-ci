import os

from starlette.applications import Starlette
from starlette.config import Config
from starlette.datastructures import Secret
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import FileResponse
from starlette.routing import Route, Mount
import uvicorn
from starlette.staticfiles import StaticFiles

from api.auth.github import login, auth

config = Config(".env")


async def homepage(request):
    return FileResponse('frontend/build/index.html')


app = Starlette(debug=True, routes=[
    Route('/', homepage),
    Route('/github/login', login, name='github_login'),
    Route('/github/auth', auth, name='github_auth'),
    Mount('/static', app=StaticFiles(directory='frontend/build/static'), name="static")
], middleware=[
    Middleware(SessionMiddleware, secret_key=config('SECRET_KEY', cast=Secret))
])

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host='0.0.0.0', port=port)
