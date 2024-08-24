import csv
import firebase_admin
from collections import defaultdict
from firebase_admin import credentials
from firebase_admin import firestore
import random
# Initialize Firebase Admin SDK
cred = credentials.Certificate('service_key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

SKIP_PRODUCT_ID = "AVpf3txeLJeJML43FN82"
MAX_ROWS_PER_PRODUCT = 30

def import_products(csv_file):
    product_data = defaultdict(list)
    
    # First, group rows by product ID
    with open(csv_file, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            if row['id'] != SKIP_PRODUCT_ID:
                product_data[row['id']].append(row)
    
    # Process each product
    for product_id, rows in product_data.items():
        # Limit to MAX_ROWS_PER_PRODUCT
        rows = rows[:MAX_ROWS_PER_PRODUCT]
        
        # Use the first row for product details
        first_row = rows[0]
        product_info = {
            'id': first_row['id'],
            'asins': first_row['asins'].split(','),
            'brand': first_row['brand'],
            'categories': first_row['categories'].split(','),
            'colors': first_row['colors'].split(','),
            'dateAdded': first_row['dateAdded'],
            'dateUpdated': first_row['dateUpdated'],
            'dimension': first_row['dimension'],
            'ean': first_row['ean'],
            'imageURLs': first_row['imageURLs'].split(','),
            'keys': first_row['keys'].split(','),
            'manufacturer': first_row['manufacturer'],
            'manufacturerNumber': first_row['manufacturerNumber'],
            'name': first_row['name'],
            'primaryCategories': first_row['primaryCategories'],
            'sourceURLs': first_row['sourceURLs'].split(','),
            'upc': first_row['upc'],
            'weight': first_row['weight']
        }
        
        # Add the product to Firestore
        product_ref = db.collection('products').document(product_id)
        product_ref.set(product_info)
        
        # Process reviews
        reviews = []
        for row in rows:
            if row['reviews.date']:
                review = {
                    'date': row['reviews.date'],
                    'rating': int(row['reviews.rating']) if row['reviews.rating'] != '' else 1,
                    'text': row['reviews.text'],
                    'title': row['reviews.title'],
                    'username': row['reviews.username']
                }
                reviews.append(review)
        
        # Add reviews as a subcollection
        for review in reviews:
            product_ref.collection('reviews').add(review)
        
        print(f"Added product: {first_row['name']} with {len(reviews)} reviews")

if __name__ == '__main__':
    import_products('electronics_product_data.csv')
    print("Import completed!")