import requests
import sys
import json

def get_auth_token():
    BASE_URL = 'https://api-gtm.grubhub.com/auth'
    HEADERS = {
        "Content-Type": "application/json"
    }
    POST_BODY = {
        "brand": "GRUBHUB",
        "client_id": "beta_UmWlpstzQSFmocLy3h1UieYcVST",
        "scope": "anonymous"
    }
    r = requests.post(BASE_URL, data=json.dumps(POST_BODY), headers=HEADERS)
    return r.json()['session_handle']['access_token']

def download_restaurant(grubhub_id):
    BASE_URL = "https://api-gtm.grubhub.com/restaurants/{}".format(grubhub_id)
    QUERY = {
        "hideChoiceCategories": "false",
        "hideUnavailableMenuItems": "true",
        "hideMenuItems": "false",
        "showMenuItemCoupons": "false"
    }
    HEADERS = {
        "Authorization": "Bearer {}".format(get_auth_token())
    }
    return requests.get(BASE_URL, params=QUERY, headers=HEADERS).json()

def clean_json(downloaded_json):
    result = {}
    result['address'] = downloaded_json['restaurant']['address']
    result['logo'] = downloaded_json['restaurant']['logo']
    result['name'] = downloaded_json['restaurant']['name']
    result['price_rating'] = int(downloaded_json['restaurant']['price_rating'])
    result['delivery_fee'] = downloaded_json['restaurant_availability']['delivery_fee']['amount']/100.0
    result['order_minimum'] = downloaded_json['restaurant_availability']['order_minimum']['amount']/100.0
    menu = []
    for category_json in downloaded_json['restaurant']['menu_category_list']:
        category = {}
        category['name'] = category_json['name']
        items = []
        for item_json in category_json['menu_item_list']:
            item = {}
            item['name'] = item_json['name']
            item['description'] = item_json['description']
            item['price'] = item_json['minimum_price_variation']['amount']/100.0
            item['max_price'] = item_json['maximum_price_variation']['amount']/100.0
            choices = []
            for choice_json in item_json['choice_category_list']:
                choice = {}
                choice['name'] = choice_json['name']
                choice['requirements'] = {
                    "min_choices": choice_json['min_choice_options'],
                    "max_choices": choice_json['max_choice_options']
                }
                options = []
                for option_json in choice_json['choice_option_list']:
                    option = {}
                    option['name'] = option_json['description']
                    option['price'] = option_json['price']['amount']/100.0
                    options.append(option)
                for option in options:
                    option['price'] -= min(options, key=lambda o: o['price'])['price']
                choice['options'] = options
                choices.append(choice)
            item['choices'] = choices
            items.append(item)
        category['items'] = items
        menu.append(category)
    result['menu'] = menu
    return result

def main(grubhub_id):
    downloaded_json = download_restaurant(grubhub_id)
    cleaned_json = clean_json(downloaded_json)
    print json.dumps(cleaned_json, sort_keys=True, indent=4, separators=(',', ': '))

if __name__ == "__main__":
    grubhub_id = sys.argv[1]
    main(grubhub_id)
