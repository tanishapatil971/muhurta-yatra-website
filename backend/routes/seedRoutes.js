const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Package = require('../models/Package');
const Place = require('../models/Place');

// @desc Seed database with professional data
// @route POST /api/seed
router.post('/', async (req, res) => {
    try {
        console.log('🕒 [SEED] Starting database seeding...');

        // 1. Check DB Connection
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ message: 'Database not connected' });
        }

        // 2. Sample Data for Packages (Based on Mumbai/Maharashtra context)
        const samplePackages = [
            {
                destination: 'Ujjain & Omkareshwar',
                price: 15500,
                maxPeople: 12,
                image: 'https://images.unsplash.com/photo-1544015759-111fb4372986?q=80&w=2670',
                duration: '3 Days / 2 Nights',
                description: 'Experience the spiritual essence of Shipra river and the ancient Jyotirlingas.',
                itinerary: ['Arrival at Ujjain', 'Omkareshwar Visit', 'Departure'],
                status: 'Active',
                transport: 'Train + AC Cab'
            },
            {
                destination: 'Maharashtra Forts Expedition',
                price: 8900,
                maxPeople: 20,
                image: 'https://images.unsplash.com/photo-1610448154563-7182962f074d?q=80&w=2670',
                duration: '4 Days / 3 Nights',
                description: 'A historical journey through Sinhagad, Raigad, and Lohagad.',
                itinerary: ['Sinhagad Trek', 'Raigad Exploration', 'Lohagad History', 'Return'],
                status: 'Active',
                transport: 'AC Tempo Traveller'
            },
            {
                destination: 'Goa Coastal Retreat',
                price: 22000,
                maxPeople: 8,
                image: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?q=80&w=2670',
                duration: '5 Days / 4 Nights',
                description: 'Relax on the pristine beaches and explore the Portuguese heritage.',
                itinerary: ['North Goa Beaches', 'South Goa Relaxation', 'Old Goa Tour', 'Departure'],
                status: 'Premium',
                transport: 'Private SUV'
            }
        ];

        // 3. Clear existing only if specifically requested or as a safety (here we append)
        // For the user's convenience on an empty DB, we insertMany
        
        const existingPackagesCount = await Package.countDocuments();
        if (existingPackagesCount === 0) {
            await Package.insertMany(samplePackages);
            console.log('✅ [SEED] Packages seeded.');
        } else {
            console.log('⏭️ [SEED] Packages already exist, skipping.');
        }

        // 4. Seed places if empty (reuse existing data logic from seedPlaces.js if needed)
        const existingPlacesCount = await Place.countDocuments();
        if (existingPlacesCount === 0) {
            // Minimal set for now to keep response fast
            await Place.insertMany([
                { name: 'Sinhagad Fort', idKey: 'sinhagad', categoryKey: 'forts', pricePerPerson: 1800 },
                { name: 'Raigad Fort', idKey: 'raigad', categoryKey: 'forts', pricePerPerson: 2800 }
            ]);
            console.log('✅ [SEED] Places seeded.');
        }

        res.status(200).json({ 
            message: 'Seed successful!',
            packagesAdded: existingPackagesCount === 0 ? samplePackages.length : 0 
        });

    } catch (error) {
        console.error('❌ [SEED] Error:', error.message);
        res.status(500).json({ message: 'Seed failed', error: error.message });
    }
});

module.exports = router;
