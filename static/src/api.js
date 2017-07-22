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

export function api_order_status() {
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

export function api_place_order() {
    return delayReturn(2000, {
        data: {
            id: "correct-horse-battery-staple",
            description: "Awesome order",
            closes_at: new Date(new Date()*1 + 300000).toISOString(),
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
            }
        }
    })
}
