from flask_script import Manager

from application.app import app, db

from application.models import Restaurant

from scripts.download_restaurant import download_restaurant

manager = Manager(app)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()

@manager.command
def add_restaurant(grubhub_id):
    downloaded = download_restaurant(grubhub_id)
    r = Restaurant(str(grubhub_id), downloaded['restaurant_info'], downloaded['menu'])
    db.session.add(r)
    db.session.commit()

@manager.command
def delete_restaurant(grubhub_id):
    r = Restaurant.query.filter(Restaurant.grubhub_id == grubhub_id).one()
    db.session.delete(r)
    db.session.commit()

if __name__ == '__main__':
    manager.run()
