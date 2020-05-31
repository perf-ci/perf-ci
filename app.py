import os

from starlette.applications import Starlette
from starlette.config import Config
from starlette.datastructures import Secret
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import JSONResponse
from starlette.routing import Route
import uvicorn

from api.auth.github import login, auth

config = Config(".env")

async def homepage(request):
    return JSONResponse({'Hell': 'world'})


app = Starlette(debug=True, routes=[
    Route('/', homepage),
    Route('/github/login', login),
    Route('/github/auth', auth),
], middleware=[
    Middleware(SessionMiddleware, secret_key=config('SECRET_KEY', cast=Secret))
])

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host='0.0.0.0', port=port)
