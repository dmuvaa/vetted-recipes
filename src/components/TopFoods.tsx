// File: app/components/TopFoods.tsx

import Link from 'next/link';

const topFoods = [
  'Apple Cider Donuts', 'Apple Pie', 'Avocado Toast', 'BBQ Ribs', 'Beef', 'Beef Brisket',
  'Beef Jerky', 'Beef Wellington', 'Beef Stew', 'Biryani', 'Biscuits', 'Bourbon Chicken',
  'Broccoli Cheddar Soup', 'Burger', 'Burrito', 'Cabbage',
  'Cannoli', 'Caprese Salad', 'Cheesecake', 'Cheddar Biscuits', 'Chicken', 'Chicken Cacciatore',
  'Chicken Fried Steak', 'Chicken Kiev', 'Chicken Marsala',
  'Chicken Parmesan', 'Chicken Pot Pie', 'Chicken Souvlaki', 'Chili', 'Chili Cheese Fries', 'Chocolate', 
  'Corned Beef', 'Crêpes', 'Croissant', 'Curry', 'Dumplings', 'Egg Drop Soup', 
  'Egg Rolls', 'Eggs Benedict', 'Fish', 'Fish and Chips', 'Fish Tacos', 
  'French Toast', 'Fries', 'Fried Chicken', 'Fried Rice', 'Gelato',
  'Greek Salad', 'Gyro', 'Hot Dog', 'Ice Cream', 'Italian Beef',
  'Jerk Chicken', 'Key Lime Pie', 'Kebabs',
  'Korean BBQ', 'Lamb', 'Lamb Chops', 'Lasagna', 'Lobster', 'Macaroni and Cheese',
  'Maple Glazed Ham', 'Mashed Potatoes', 'Meatballs', 'Moussaka', 'Muffins',
  'Nachos', 'Noodles', 'Omelette', 'Paella', 'Pancakes', 'Pasta', 'Pasta Primavera',
  'Peking Ribs', 'Pho', 'Pierogi', 'Pizza', 'Plantain Chips',
  'Pork Chops', 'Pumpkin Pie', 'Pulled Pork', 'Pulled Pork Sandwich',
  'Quesadilla', 'Ramen', 'Ramen Burger', 'Red Velvet Cake', 'Rib-Eye Steak', 'Risotto',
  'Risotto Milanese', 'Roti', 'Salad', 'Salisbury Steak', 'Samosa', 'Scones', 'Seafood',
  'Shrimp', 'Shawarma', 'Smoothie', 'Soup', 'Spaghetti',
  'Spanish Paella', 'Spinach', 'Spring Rolls', 'Steak', 'Stuffed Mushrooms', 'Sukiyaki', 'Sushi',
  'Tacos', 'Tandoori Chicken', 'Tea', 'Teriyaki Chicken', 'Tofu', 'Tom Yum Soup', 'Tortilla',
  'Turkey', 'Waffles', 'White Chocolate Souffle', 'Yogurt', 'Zucchini Bread'
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
