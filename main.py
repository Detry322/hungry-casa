from application.app import app

from config import ProdConfig

app.config.from_object(ProdConfig)

app = app
