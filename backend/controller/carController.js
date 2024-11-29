const Car = require('../model/carModel');
const cloudinary = require('../cloudinary'); // Make sure this path is correct

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car' });
  }
};




const createCar = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const imageUrls = [];

    // Upload each file to Cloudinary and store the URLs and names
    await Promise.all(
      req.files.map((file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                return reject(error); // Reject the promise on error
              }
              console.log("Uploaded file URL:", result.secure_url); // Log the URL
              imageUrls.push({ 
                name: file.originalname, // Set name from file's original name
                url: result.secure_url  // Ensure URL is saved in the imageUrls array
              });
              resolve(); // Resolve the promise when done
            }
          );

          // End the stream with the file buffer
          stream.end(file.buffer);
        })
      )
    );

    // Log imageUrls array to debug
    console.log("Final imageUrls array before saving:", imageUrls);

    // Create a new Car instance with image URLs
    const newCar = new Car({
      ...req.body,
      images: imageUrls // Embed uploaded image URLs and names into the car document
    });

    await newCar.save();

    res.status(201).json({
      message: "Car created successfully with images",
      success: true,
      car: newCar,
    });
  } catch (error) {
    console.error("Error in createCar controller:", error);
    res.status(500).json({ message: 'Error creating car with images' });
  }
};


const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: 'Error updating car' });
  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car' });
  }
};

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };