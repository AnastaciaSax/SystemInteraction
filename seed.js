const { Country, Route, Sale } = require('../models');
const sequelize = require('../config/database');

// Данные для заполнения
const countriesData = [
  { name: 'Turkey', currency: 'USD' },
  { name: 'Egypt', currency: 'USD' },
  { name: 'Spain', currency: 'EUR' },
  { name: 'Italy', currency: 'EUR' },
  { name: 'Thailand', currency: 'USD' },
  { name: 'Greece', currency: 'EUR' },
  { name: 'France', currency: 'EUR' },
  { name: 'USA', currency: 'USD' },
  { name: 'Maldives', currency: 'USD' },
  { name: 'UAE', currency: 'USD' }
];

const routesData = [
  // Turkey
  { 
    name: 'Istanbul Cultural Tour', 
    countryId: 1, 
    price_usd: 1200, 
    duration_days: 7, 
    description: 'Explore the rich history of Istanbul with visits to Hagia Sophia, Blue Mosque, and Topkapi Palace', 
    photo_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500',
    is_active: true 
  },
  { 
    name: 'Antalya Beach Vacation', 
    countryId: 1, 
    price_usd: 800, 
    duration_days: 10, 
    description: 'Relax on the beautiful beaches of Antalya with all-inclusive resort', 
    photo_url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500',
    is_active: true 
  },
  
  // Egypt
  { 
    name: 'Cairo and Pyramids', 
    countryId: 2, 
    price_usd: 1500, 
    duration_days: 8, 
    description: 'Discover ancient pyramids and temples in Cairo and Giza', 
    photo_url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500',
    is_active: true 
  },
  { 
    name: 'Red Sea Diving', 
    countryId: 2, 
    price_usd: 2000, 
    duration_days: 14, 
    description: 'Diving in the Red Sea with professional instructors', 
    photo_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
    is_active: true 
  },
  
  // Spain
  { 
    name: 'Barcelona and Madrid', 
    countryId: 3, 
    price_usd: 1800, 
    duration_days: 10, 
    description: 'Vibrant cities of Spain with cultural experiences', 
    photo_url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500',
    is_active: true 
  },
  { 
    name: 'Costa Brava', 
    countryId: 3, 
    price_usd: 1100, 
    duration_days: 7, 
    description: 'Beautiful coast of Spain with medieval towns', 
    photo_url: 'https://images.unsplash.com/photo-1598940605375-ee821b785725?w=500',
    is_active: true 
  },
  
  // Italy
  { 
    name: 'Rome and Florence', 
    countryId: 4, 
    price_usd: 2200, 
    duration_days: 9, 
    description: 'Art and history of Italy with Vatican and Uffizi Gallery', 
    photo_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500',
    is_active: true 
  },
  { 
    name: 'Venice and Milan', 
    countryId: 4, 
    price_usd: 1900, 
    duration_days: 8, 
    description: 'Romantic cities of Italy with gondola rides', 
    photo_url: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=500',
    is_active: true 
  },
  
  // Thailand
  { 
    name: 'Bangkok and Pattaya', 
    countryId: 5, 
    price_usd: 1000, 
    duration_days: 10, 
    description: 'Exotic Thailand with temples and beaches', 
    photo_url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500',
    is_active: true 
  },
  { 
    name: 'Phuket Island', 
    countryId: 5, 
    price_usd: 1300, 
    duration_days: 12, 
    description: 'Tropical paradise with luxury resorts', 
    photo_url: 'https://images.unsplash.com/photo-1555993537-0619424d45bd?w=500',
    is_active: true 
  }
];

const salesData = [
  { routeId: 1, sale_date: '2024-01-15', visa_cost_usd: 50, quantity: 2 },
  { routeId: 1, sale_date: '2024-01-20', visa_cost_usd: 50, quantity: 1 },
  { routeId: 2, sale_date: '2024-02-05', visa_cost_usd: 25, quantity: 3 },
  { routeId: 3, sale_date: '2024-02-10', visa_cost_usd: 60, quantity: 2 },
  { routeId: 4, sale_date: '2024-03-01', visa_cost_usd: 100, quantity: 4 },
  { routeId: 5, sale_date: '2024-03-15', visa_cost_usd: 80, quantity: 2 },
  { routeId: 6, sale_date: '2024-04-02', visa_cost_usd: 80, quantity: 1 },
  { routeId: 7, sale_date: '2024-04-12', visa_cost_usd: 90, quantity: 2 },
  { routeId: 8, sale_date: '2024-05-01', visa_cost_usd: 90, quantity: 3 },
  { routeId: 9, sale_date: '2024-05-20', visa_cost_usd: 40, quantity: 5 },
  { routeId: 10, sale_date: '2024-06-10', visa_cost_usd: 40, quantity: 2 }
];

async function seedDatabase() {
  try {
    console.log('Starting DB seeding...');

    // Синхронизация базы данных
    await sequelize.sync({ force: true });
    console.log('DB synced');

    // Заполняем страны
    console.log('Seeding countries...');
    const countries = await Country.bulkCreate(countriesData);
    console.log(`Created ${countries.length} countries`);

    // Заполняем маршруты
    console.log('Seeding routes...');
    const routes = await Route.bulkCreate(routesData);
    console.log(`Created ${routes.length} routes`);

    // Заполняем продажи (предварительно рассчитывая total_cost_usd)
    console.log('Seeding sales...');
    for (const saleData of salesData) {
      const route = await Route.findByPk(saleData.routeId);
      const total_cost_usd = (route.price_usd * saleData.quantity) + (saleData.visa_cost_usd * saleData.quantity);
      
      await Sale.create({
        ...saleData,
        total_cost_usd
      });
    }
    
    const salesCount = await Sale.count();
    console.log(`Created ${salesCount} sales`);

    console.log('DB seeded successfully!');
    
    // Выводим статистику
    const totalRoutes = await Route.count();
    const totalSales = await Sale.count();
    const totalRevenue = await Sale.sum('total_cost_usd');
    
    console.log('\nDatabase Statistics:');
    console.log(`Countries: ${countries.length}`);
    console.log(`Routes: ${totalRoutes}`);
    console.log(`Sales: ${totalSales}`);
    console.log(`Total Revenue: $${totalRevenue}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
}

// Запуск сидинга
seedDatabase();