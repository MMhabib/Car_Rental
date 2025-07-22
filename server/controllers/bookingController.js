import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Helper: Check if car is available during requested dates
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    $or: [
      {
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
      },
    ],
  });

  return bookings.length === 0;
};

// [1] API: Check cars available for location & date range
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    const cars = await Car.find({ location, isAvailable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter(car => car.isAvailable);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error?.message || 'Something went wrong' });
  }
};

// [2] API: Create a booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: 'Car is not available for selected dates' });
    }

    const carData = await Car.findById(car);
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({ success: true, message: 'Booking created successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error?.message || 'Failed to create booking' });
  }
};

// [3] API: Get bookings for logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;

    const bookings = await Booking.find({ user: _id })
      .populate('car')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error?.message || 'Failed to get user bookings' });
  }
};

// [4] API: Get bookings for owner
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.json({ success: false, message: 'Unauthorized access' });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate('car user')
      .select('-user.password')
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error?.message || 'Failed to get owner bookings' });
  }
};

// [5] API: Change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.json({ success: false, message: 'Booking not found' });
    }

    if (!booking.owner.equals(_id)) {
      return res.json({ success: false, message: 'Unauthorized' });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: 'Booking status updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error?.message || 'Failed to update status' });
  }
};
