from flask import request, render_template, jsonify, send_from_directory
from .models import Restaurant, Entry, Order
from index import app, db
from config import basedir

import os

import json

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/icon.png', methods=['GET'])
def icon():
    return send_from_directory(os.path.join(basedir,'static'), 'icon.png')

@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/restaurants", methods=["GET"])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify(restaurants=map(lambda restaurant: restaurant.info_json(), restaurants))

@app.route("/api/create_order", methods=["POST"])
def create_order():
    incoming = request.get_json()
    restaurant = Restaurant.query.filter(Restaurant.grubhub_id == incoming['restaurant_id']).one()
    order = Order(incoming['description'], incoming['closes_at'], restaurant)
    db.session.add(order)
    db.session.commit()
    return jsonify(id=order.uuid)

@app.route("/api/order_status/<order_id>", methods=["GET"])
def get_order_status(order_id):
    order = Order.query.filter(Order.uuid == order_id).one()
    return jsonify(order.json())

@app.route("/api/save_order/<order_id>", methods=["POST"])
def save_order(order_id):
    order = Order.query.filter(Order.uuid == order_id).one()
    incoming = request.get_json()

    entry = None
    for e in order.entries:
        if e.user_uuid == incoming['user_uuid']:
            entry = e
            break
    if entry is None:
        entry = Entry(order, incoming['user_uuid'], "")

    entry.data = json.dumps(incoming['order'])
    db.session.add(entry)
    db.session.commit()

    return jsonify(sequence_number=incoming['sequence_number'])

@app.route("/api/load_order/<order_id>/<user_id>", methods=["GET"])
def load_order(order_id, user_id):
    order = Order.query.filter(Order.uuid == order_id).one()
    return jsonify(order.user_json(user_id))



