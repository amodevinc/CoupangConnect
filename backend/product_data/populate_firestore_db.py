import csv
import firebase_admin
from collections import defaultdict
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime
import random

# Initialize Firebase Admin SDK
cred = credentials.Certificate('service_key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

MAX_ROWS_PER_PRODUCT = 30
USD_TO_KRW_RATE = 1300  # Approximate conversion rate, 1 USD ≈ 1300 KRW

# Function to mock prices based on the product category
def generate_mock_price(category):
    """Generate a mock price based on product category."""
    if 'Electronics' in category:
        return random.uniform(100, 1000)  # Price range for electronics
    elif 'Fashion' in category:
        return random.uniform(20, 300)  # Price range for fashion
    elif 'Home' in category or 'Appliance' in category:
        return random.uniform(50, 500)  # Price range for home appliances
    else:
        return random.uniform(10, 500)  # General price range for other categories

def calculate_max_discount(price):
    """Calculate a reasonable max discount based on the product's price."""
    if price < 50:
        discount = random.uniform(0.05, 0.15) * price  # 5% to 15% discount
    elif 50 <= price <= 200:
        discount = random.uniform(0.10, 0.25) * price  # 10% to 25% discount
    else:
        discount = random.uniform(0.15, 0.40) * price  # 15% to 40% discount
    
    return round(discount, 2)  # Round to 2 decimal places

def import_products(csv_file):
    product_data = defaultdict(list)
    
    # First, group rows by product ID
    with open(csv_file, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            product_data[row['id']].append(row)
    
    # Process each product
    for product_id, rows in product_data.items():
        # Limit to MAX_ROWS_PER_PRODUCT
        rows = rows[:MAX_ROWS_PER_PRODUCT]
        
        # Use the first row for product details
        first_row = rows[0]
        
        # Generate a mock price based on the category
        category = first_row['primaryCategories']
        price_usd = round(generate_mock_price(category), 2)  # Mock price in USD
        price_krw = round(price_usd * USD_TO_KRW_RATE, 2)  # Convert to South Korean Won
        
        # Calculate max discount values for both currencies
        max_discount_usd = calculate_max_discount(price_usd)
        max_discount_krw = calculate_max_discount(price_krw)
        
        product_info = {
            'id': first_row['id'],
            'name': first_row['name'],
            'description': first_row['categories'],  # Assuming categories as description for now
            'price': price_usd,   # Mock price in USD
            'price_won': price_krw,  # Converted price in South Korean Won
            'category': category,
            'review_summary': '',  # To be populated later with ReviewGPT
            'review_sentiment': 0.0,  # Placeholder for now (-1 to 1)
            'image_url': first_row['imageURLs'].split(',')[0],  # First image URL
            'group_discount_eligible': random.choice([True, False]),  # Random choice for now
            'max_discount_value': max_discount_usd,  # Max discount in USD
            'max_discount_value_won': max_discount_krw  # Max discount in South Korean Won
        }
        
        # Add the product to Firestore
        product_ref = db.collection('products').document(product_id)
        product_ref.set(product_info)
        
        # Process reviews and add them as subcollections under the product
        for row in rows:
            if row['reviews.date']:
                # Clean the date to remove the time part
                review_date_str = row['reviews.date'].split('T')[0]  # Only take the date part before 'T'
                
                # Parse the cleaned date string
                review_date = datetime.strptime(review_date_str, '%Y-%m-%d')
                
                # Create review document matching the required schema
                review = {
                    'id': f"review_{random.randint(100000, 999999)}",  # Random review ID
                    'product_id': product_id,
                    'user_id': row['reviews.username'],  # Assuming username as user_id
                    'content': row['reviews.text'],  # Review content
                    'rating': int(row['reviews.rating']) if row['reviews.rating'] != '' else 1,
                    'sentiment_score': 0.0,  # Placeholder sentiment score for now
                    'timestamp': review_date
                }
                
                # Add review to 'reviews' subcollection under the product document
                product_ref.collection('reviews').document(review['id']).set(review)
        
        print(f"Added product: {first_row['name']} with {len(rows)} reviews")

if __name__ == '__main__':
    import_products('electronics_product_data.csv')
    print("Import completed!")
