import axios from 'axios';
import Promise from 'promise-polyfill'; 
// import dp from './dumpling-palace.json'; 

function delayReturn(delay, thing) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(thing);
        }, delay);
    });
}

export function api_list_restaurants() {
    // return axios.get('/api/restaurants');
    return delayReturn(2000, {
        data: {
            restaurant_infos: [
                {
                    address: {
                        country: "USA",
                        locality: "Boston",
                        postal_code: "02115",
                        region: "MA",
                        street_address: "179 Massachusetts Ave"
                    },
                    delivery_fee: 3.0,
                    tax: 8,
                    logo: "https://dtyxqspugqu5z.cloudfront.net/logo/8098/308098/20150528logo.jpg",
                    name: "Dumpling Palace",
                    order_minimum: 15.0,
                    price_rating: 3,
                    id: "4321-4321-4321-4321"
                },
                {
                    address: {
                        country: "USA",
                        locality: "Boston",
                        postal_code: "02215",
                        region: "MA",
                        street_address: "472 Commonwealth Ave"
                    },
                    delivery_fee: 1.5,
                    tax: 8,
                    logo: "https://dtyxqspugqu5z.cloudfront.net/logo/316/240316/20110601Logo.jpg",
                    name: "Cafe 472",
                    order_minimum: 12.0,
                    price_rating: 2,
                    id: "1234-1234-1234-1234"
                }
            ]
        }
    })
}

export function api_create_order() {
    return delayReturn(2000, {
        data: {
            id: "correct-horse-battery-staple",
        }
    });
}

export function api_order_status(order_id) {
    return delayReturn(2000, {
        data: {
            id: "correct-horse-battery-staple",
            description: "Awesome order",
            closes_at: new Date(new Date()*1 + 300000).toISOString(),
            restaurant_info: {
                address: {
                    country: "USA",
                    locality: "Boston",
                    postal_code: "02115",
                    region: "MA",
                    street_address: "179 Massachusetts Ave"
                },
                delivery_fee: 3.0,
                tax: 8,
                logo: "https://dtyxqspugqu5z.cloudfront.net/logo/8098/308098/20150528logo.jpg",
                name: "Dumpling Palace",
                order_minimum: 15.0,
                price_rating: 3,
                id: "4321-4321-4321-4321"
            },
            subtotal: 39.9,
            orders: [
                {
                    name: "Jack",
                    venmo: "Jack-Serrino",
                    subtotal: 19.95,
                    items: [
                        {
                            name: "A15. Enoki Mushroom with Beef Tripe",
                            price: 12.00,
                            choices: [
                                {
                                    name: "Choose a spice level",
                                    selected: [
                                        "Spicy"
                                    ]
                                },
                                {
                                    name: "Choose add-ons",
                                    selected: [
                                        "White Rice",
                                        "Coca-Cola"
                                    ]
                                }
                            ]
                        },
                        {
                            name: "A12. Steamed Pork with Garlic",
                            price: 7.95,
                            choices: []
                        }
                    ]
                },
                {
                    name: "Larry",
                    venmo: "Larry-Zhang",
                    subtotal: 19.95,
                    items: [
                        {
                            name: "A15. Enoki Mushroom with Beef Tripe",
                            price: 12.00,
                            choices: [
                                {
                                    name: "Choose a spice level",
                                    selected: [
                                        "Spicy"
                                    ]
                                },
                                {
                                    name: "Choose add-ons",
                                    selected: [
                                        "White Rice",
                                        "Coca-Cola"
                                    ]
                                }
                            ]
                        },
                        {
                            name: "A12. Steamed Pork with Garlic",
                            price: 7.95,
                            choices: []
                        }
                    ]
                }
            ]
        }
    })
}

export function api_save_order(sequenceNumber) {
    return delayReturn(2000, {
        data: {
            success: true,
            sequence_number: sequenceNumber
        }
    })
}

export function api_load_order() {
    return delayReturn(2000, {
        data: {
            id: 'correct-horse-battery-staple',
            description: "Awesome order",
            closes_at: new Date(new Date()*1 + 300000).toISOString(),
            restaurant_info: {
                address: {
                    country: "USA",
                    locality: "Boston",
                    postal_code: "02115",
                    region: "MA",
                    street_address: "179 Massachusetts Ave"
                },
                delivery_fee: 3.0,
                tax: 8,
                logo: "https://dtyxqspugqu5z.cloudfront.net/logo/8098/308098/20150528logo.jpg",
                name: "Dumpling Palace",
                order_minimum: 15.0,
                price_rating: 3,
                id: "4321-4321-4321-4321"
            },
            order: {
                name: "Jack",
                venmo: "Jack-Serrino",
                subtotal: 19.95,
                items: [
                    {
                        name: "A15. Enoki Mushroom with Beef Tripe",
                        price: 12.00,
                        choices: [
                            {
                                name: "Choose a spice level",
                                selected: [
                                    "Spicy"
                                ]
                            },
                            {
                                name: "Choose add-ons",
                                selected: [
                                    "White Rice",
                                    "Coca-Cola"
                                ]
                            }
                        ]
                    },
                    {
                        name: "A12. Steamed Pork with Garlic",
                        price: 7.95,
                        choices: []
                    }
                ]
            },
            "menu": [
                {
                    "items": [
                        {
                            "choices": [
                                {
                                    "name": "Choose a soda",
                                    "options": [
                                        {
                                            "name": "Coke",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "Diet Coke",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "Ginger Ale",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "Sprite",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "Orange",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "Ice Tea",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "Chinese Herbal Tea",
                                            "price": 3.0
                                        }
                                    ],
                                    "requirements": {
                                        "max_choices": 1,
                                        "min_choices": 1
                                    }
                                }
                            ],
                            "description": "",
                            "name": "Can Soda",
                            "price": 1.5
                        },
                        {
                            "choices": [],
                            "description": "",
                            "name": "Bottle of Water",
                            "price": 1.5
                        },
                        {
                            "choices": [],
                            "description": "",
                            "name": "Hot Tea",
                            "price": 1.5
                        }
                    ],
                    "name": "Drinks"
                },
                {
                    "items": [
                        {
                            "choices": [
                                {
                                    "name": "Choose three items",
                                    "options": [
                                        {
                                            "name": "2 Spring Rolls",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "4 Crab Rangoon",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "2 Beef Teriaki",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "4 Chicken Wings",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "2 Chicken Teriyaki",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "2 Shrimp Teriyaki",
                                            "price": 0.0
                                        }
                                    ],
                                    "requirements": {
                                        "max_choices": 3,
                                        "min_choices": 3
                                    }
                                },
                                {
                                    "name": "Choose a rice",
                                    "options": [
                                        {
                                            "name": "White Rice",
                                            "price": 0.0
                                        },
                                        {
                                            "name": "Fried Rice",
                                            "price": 1.0
                                        }
                                    ],
                                    "requirements": {
                                        "max_choices": 1,
                                        "min_choices": 1
                                    }
                                }
                            ],
                            "description": "Choice of 3 items with white rice. ",
                            "name": "Appetizer Combo",
                            "price": 10.5
                        }
                    ],
                    "name": "Appetizer Combo"
                }
            ]
        }
    })
}
