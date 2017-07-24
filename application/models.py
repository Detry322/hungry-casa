from index import db, bcrypt

import uuid, json

class Restaurant(db.Model):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer(), primary_key=True)
    grubhub_id = db.Column(db.String(20), unique=True, index=True)
    info = db.Column(db.Text(), nullable=False)
    menu = db.Column(db.Text(), nullable=False)

    def __init__(self, grubhub_id, info, menu):
        self.grubhub_id = grubhub_id
        if isinstance(info, str):
            self.info = info
        else:
            self.info = json.dumps(info)

        if isinstance(menu, str):
            self.menu = menu
        else:
            self.menu = json.dumps(menu)

    def info_json(self):
        info = json.loads(self.info)
        info['id'] = self.grubhub_id
        return info

    def menu_json(self):
        return json.loads(self.menu)

class Entry(db.Model):
    __tablename__ = 'entry'
    id = db.Column(db.Integer(), primary_key=True)
    user_uuid = db.Column(db.String(40), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    order = db.relationship("Order", back_populates="entries", foreign_keys=order_id)
    data = db.Column(db.Text(), nullable=False)

    def __init__(self, order, user_uuid, data):
        self.order = order
        self.user_uuid = user_uuid
        if isinstance(data, str):
            self.data = data
        else:
            self.data = json.dumps(data)

    def json(self):
        return json.loads(self.data)

class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer(), primary_key=True)
    uuid = db.Column(db.String(40), unique=True, index=True)
    entries = db.relationship("Entry", back_populates="order", primaryjoin=(id == Entry.order_id))
    create_time = db.Column(db.DateTime, default=db.func.now())

    description = db.Column(db.Text(), nullable=False)
    closes_at = db.Column(db.Text(), nullable=False)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    restaurant = db.relationship("Restaurant", foreign_keys=restaurant_id)

    def __init__(self, description, closes_at, restaurant):
        self.description = description
        self.closes_at = closes_at
        self.restaurant = restaurant
        self.uuid = str(uuid.uuid4())

    def json(self):
        return {
            'id': self.uuid,
            'description': self.description,
            'closes_at': self.closes_at,
            'restaurant_info': self.restaurant.info_json(),
            'orders': map(lambda entry: entry.json(), self.entries)
        }

    def user_json(self, user_uuid):
        entry = None
        for e in self.entries:
            if e.user_uuid == user_uuid:
                entry = e
        return {
            'id': self.uuid,
            'description': self.description,
            'closes_at': self.closes_at,
            'restaurant_info': self.restaurant.info_json(),
            'order': None if entry is None else entry.json(),
            'menu': self.restaurant.menu_json()
        }
