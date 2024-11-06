// File: app/components/TopFoods.tsx

import Link from 'next/link';

const topFoods = [
  'Apple Cider Donuts', 'Apple Pie', 'Avocado Toast', 'Bagel', 'Baklava', 'Bangers and Mash', 'BBQ Ribs', 'Beef', 'Beef Brisket',
  'Beef Jerky', 'Beef Stroganoff', 'Beef Wellington', 'Beignets', 'Biryani', 'Biscuits', 'Bibimbap', 'Bourbon Chicken', 
  'Bread Pudding', 'Broccoli Cheddar Soup', 'Bruschetta', 'Burger', 'Bulgogi', 'Burrito', 'Buffalo Wings', 'Calzone', 
  'Cannoli', 'Caprese Salad', 'Caesar Salad', 'Caramelized Apple', 'Carbonara', 'Ceviche', 'Cheesecake', 'Cheese Fondue', 
  'Cheddar Biscuits', 'Chicken', 'Chicken Cacciatore', 'Chicken Fried Steak', 'Chicken Kiev', 'Chicken Marsala', 
  'Chicken Parmesan', 'Chicken Pot Pie', 'Chicken Souvlaki', 'Chili', 'Chili Cheese Fries', 'Chimichanga', 'Chocolate', 
  'Chocolate Soufflé', 'Chow Mein', 'Clam Bake', 'Clam Chowder', 'Cornbread', 'Corned Beef', 'Crepe', 'Crab Cakes', 
  'Crêpes', 'Croissant', 'Curry', 'Dim Sum', 'Dumplings', 'Duck à l’Orange', 'Eggplant Parmesan', 'Egg Drop Soup', 
  'Egg Rolls', 'Eggs Benedict', 'Empanadas', 'Enchiladas', 'Falafel', 'Fettuccine Alfredo', 'Fish and Chips', 'Fish Tacos', 
  'Fondue', 'French Toast', 'Fries', 'Fried Chicken', 'Fried Green Tomatoes', 'Fried Rice', 'Frittata', 'Gelato', 
  'Gnocchi', 'Goulash', 'Greek Salad', 'Gumbo', 'Gyro', 'Hash Browns', 'Hot Dog', 'Hummus', 'Ice Cream', 'Italian Beef', 
  'Italian Wedding Soup', 'Jalapeno Poppers', 'Jambalaya', 'Jerk Chicken', 'Key Lime Pie', 'Kebabs', 
  'Kielbasa', 'Korean BBQ', 'Lamb', 'Lamb Chops', 'Lamb Kofta', 'Lasagna', 'Lemon Meringue Pie', 'Lobster', 'Macaroni and Cheese', 
  'Mango Lassi', 'Maple Glazed Ham', 'Mashed Potatoes', 'Meatballs', 'Miso Soup', 'Mochi Ice Cream', 'Moussaka', 'Muffins', 
  'Nachos', 'Noodles', 'Omelette', 'Onion Rings', 'Osso Buco', 'Pad Thai', 'Paella', 'Pancakes', 'Pasta', 'Pasta Primavera', 
  'Pasta Carbonara', 'Peach Cobbler', 'Peking Duck', 'Peking Ribs', 'Pho', 'Pierogi', 'Pizza', 'Plantain Chips', 
  'Polenta', 'Pork Chops', 'Pot Roast', 'Poutine', 'Pretzel', 'Pumpkin Pie', 'Pulled Pork', 'Pulled Pork Sandwich', 
  'Quesadilla', 'Ramen', 'Ratatouille', 'Ramen Burger', 'Reuben', 'Red Velvet Cake', 'Rib-Eye Steak', 'Risotto', 
  'Risotto Milanese', 'Roast Duck', 'Roti', 'Salad', 'Salisbury Steak', 'Samosa', 'Schnitzel', 'Scones', 'Seafood', 
  'Shrimp Scampi', 'Shrimp and Grits', 'Shawarma', 'Smoothie', 'Soup', 'Souvlaki', 'Spanakopita', 'Spaghetti', 
  'Spanish Paella', 'Spring Rolls', 'Steak', 'Stir Fry', 'Stuffed Mushrooms', 'Stuffed Peppers', 'Sukiyaki', 'Sushi', 
  'Tacos', 'Tandoori Chicken', 'Tamales', 'Teriyaki Chicken', 'Toad in the Hole', 'Tofu', 'Tom Yum Soup', 'Tortilla', 
  'Turkey', 'Waffles', 'White Chocolate Souffle', 'Yakitori', 'Yogurt', 'Ziti'
];

export default function TopFoods() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Foods</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {topFoods.map((food) => (
            <Link
              key={food}
              href={`/recipes?query=${encodeURIComponent(food.toLowerCase())}`}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              {food}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
