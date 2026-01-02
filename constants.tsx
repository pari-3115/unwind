
import React from 'react';
import { Plot, UserRole, User, Booking } from './types';

export const MOCK_USER_TRAVELLER: User = {
  id: 'u1',
  name: 'Arjun Sharma',
  email: 'arjun@example.com',
  role: UserRole.TRAVELLER,
  avatar: 'https://i.pravatar.cc/150?u=arjun',
  savedPlotIds: []
};

export const MOCK_USER_OWNER: User = {
  id: 'o1',
  name: 'Priya Patel',
  email: 'priya@example.com',
  role: UserRole.OWNER,
  avatar: 'https://i.pravatar.cc/150?u=priya',
  savedPlotIds: []
};

export const MOCK_USER_ADMIN: User = {
  id: 'a1',
  name: 'UnWind Admin',
  email: 'admin@unwind.com',
  role: UserRole.ADMIN,
  avatar: 'https://i.pravatar.cc/150?u=admin_user',
  savedPlotIds: []
};

export const MOCK_TRIPS: Booking[] = [
  {
    id: 'b1',
    plotId: 'p1',
    travellerId: 'u1',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    totalPrice: 9500,
    status: 'confirmed',
    plotTitle: 'Goa Horizon Beach Plot',
    plotLocation: 'South Goa, Goa',
    plotImageUrl: 'https://www.tourmyindia.com/blog//wp-content/uploads/2021/08/Best-Beach-Destinations-in-India.jpg'
  }
];

export const INITIAL_PLOTS: Plot[] = [
  {
    id: 'p1',
    ownerId: 'o1',
    ownerName: 'Priya Patel',
    title: 'Goa Horizon Beach Plot',
    description: 'A premium beachside RV spot in South Goa. Wake up to the Arabian Sea and enjoy private access to the shore.',
    location: 'South Goa, Goa',
    coordinates: { lat: 15.2993, lng: 73.9814 },
    pricePerNight: 4500,
    imageUrl: 'https://www.tourmyindia.com/blog//wp-content/uploads/2021/08/Best-Beach-Destinations-in-India.jpg',
    amenities: { evCharging: true, bathroom: true, waterHookup: true, wifi: true, petFriendly: true },
    checkpoints: [{ id: 'c1', label: 'Beach Access', description: 'Direct path to the beach.', isVerified: true }],
    reviews: [],
    overallRating: 4.9,
    status: 'available'
  },
  {
    id: 'p2',
    ownerId: 'o1',
    ownerName: 'Priya Patel',
    title: 'Dal Lake Royal View',
    description: 'Park your RV overlooking the majestic Dal Lake. Experience the serenity of Srinagar in a secured, vetted sanctuary.',
    location: 'Srinagar, Kashmir',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    pricePerNight: 5500,
    imageUrl: 'https://www.holidify.com/images/bgImages/SRINAGAR.jpg',
    amenities: { evCharging: false, bathroom: true, waterHookup: true, wifi: true, petFriendly: true },
    checkpoints: [{ id: 'c2', label: 'Lake View', description: 'Unobstructed views of the water.', isVerified: true }],
    reviews: [],
    overallRating: 5.0,
    status: 'available'
  },
  {
    id: 'p3',
    ownerId: 'o2',
    ownerName: 'Rajesh Kumar',
    title: 'Kerala Backwater Retreat',
    description: 'Surrounded by palm trees and tranquil waters, this Alappuzha plot is the ultimate spot for unwinding.',
    location: 'Alappuzha, Kerala',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    pricePerNight: 3800,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8bTRCXRhaR-gvCx75fhHq-8eGZ23z-t3Fw&s',
    amenities: { evCharging: true, bathroom: true, waterHookup: true, wifi: false, petFriendly: true },
    checkpoints: [],
    reviews: [],
    overallRating: 4.7,
    status: 'available'
  },
  {
    id: 'p4',
    ownerId: 'o3',
    ownerName: 'Vikram Singh',
    title: 'Jaipur Heritage Heights',
    description: 'Experience the Pink City from a private plateau with views of Amer Fort. Secure and historically enriched.',
    location: 'Jaipur, Rajasthan',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    pricePerNight: 6200,
    imageUrl: 'https://assets-news.housing.com/news/wp-content/uploads/2022/11/25103509/Famous-tourist-places-in-India-11.jpg',
    amenities: { evCharging: true, bathroom: true, waterHookup: true, wifi: true, petFriendly: false },
    checkpoints: [],
    reviews: [],
    overallRating: 4.8,
    status: 'available'
  },
  {
    id: 'p5',
    ownerId: 'o4',
    ownerName: 'Anita Desai',
    title: 'Gulmarg Snow Haven',
    description: 'A high-altitude RV park in Gulmarg. Perfect for winter enthusiasts looking for a safe place to rest in the mountains.',
    location: 'Gulmarg, Kashmir',
    coordinates: { lat: 34.0484, lng: 74.3805 },
    pricePerNight: 7500,
    imageUrl: 'https://c.myholidays.com/blog/blog/content/images/2020/11/Kashmir.webp',
    amenities: { evCharging: false, bathroom: true, waterHookup: true, wifi: false, petFriendly: true },
    checkpoints: [],
    reviews: [],
    overallRating: 4.9,
    status: 'available'
  },
  {
    id: 'p6',
    ownerId: 'o5',
    ownerName: 'Sanjay Gupta',
    title: 'Rishikesh Ganga Edge',
    description: 'Listen to the sound of the holy Ganges. A serene, spiritually uplifting plot for travellers in Uttarakhand.',
    location: 'Rishikesh, Uttarakhand',
    coordinates: { lat: 30.0869, lng: 78.2676 },
    pricePerNight: 4200,
    imageUrl: 'https://www.indianholiday.com/wordpress/wp-content/uploads/2025/06/uttarakhand.jpg',
    amenities: { evCharging: true, bathroom: true, waterHookup: true, wifi: true, petFriendly: true },
    checkpoints: [],
    reviews: [],
    overallRating: 4.6,
    status: 'available'
  },
  {
    id: 'p7',
    ownerId: 'o6',
    ownerName: 'Meera Iyer',
    title: 'Mysore Palace Overlook',
    description: 'Enjoy royal vibes from this secure plot near the Amba Vilas Palace. Level ground and excellent security.',
    location: 'Mysore, Karnataka',
    coordinates: { lat: 12.3052, lng: 76.6552 },
    pricePerNight: 4800,
    imageUrl: 'https://www.yourvacationtrip.com/wp-content/uploads/2023/11/Amba-vilas-Place-1024x682-1.jpg',
    amenities: { evCharging: true, bathroom: true, waterHookup: true, wifi: true, petFriendly: true },
    checkpoints: [],
    reviews: [],
    overallRating: 4.9,
    status: 'available'
  },
  {
    id: 'p8',
    ownerId: 'o1',
    ownerName: 'Priya Patel',
    title: 'Hampi Boulder Sanctuary',
    description: 'Park among the historic ruins and massive boulders of Hampi. A unique, vetted experience for the nomadic soul.',
    location: 'Hampi, Karnataka',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    pricePerNight: 3500,
    imageUrl: 'https://www.indiatravelblog.com/attachments/resources/6563-1-The-Best-Tourist-Places-To-Visit-In-India.jpg',
    amenities: { evCharging: false, bathroom: true, waterHookup: true, wifi: false, petFriendly: true },
    checkpoints: [],
    reviews: [],
    overallRating: 4.5,
    status: 'available'
  }
];