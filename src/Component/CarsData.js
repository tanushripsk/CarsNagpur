import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, Fuel, Gauge, Heart, DollarSign, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function CarsData() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [data, setData] = useState(null);  // Start with null for easy loading check
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`http://3.111.58.199:3000/api/cars/cars/${params?.id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch car details');
      }

      const dataResponse = await response.json();
      console.log('API Response:', dataResponse);
      setData(dataResponse);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [params?.id]);

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (!data) {
    return <p>No car data available.</p>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-4">
            <div className="relative h-64 sm:h-80 md:h-96 mb-4">
              <img
                src={data.images[currentImageIndex].url}
                alt={`${data.carName} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </div>
            <div className="flex justify-center space-x-2 overflow-x-auto">
              {data.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                    index === currentImageIndex ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <img src={image.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.carName} {data.brand}</h2>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(data.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-gray-600">{data.rating}/5</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-gray-600">{data.brand} </span>
              </div>
              <div className="flex items-center">
                <Gauge className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-gray-600">{data.kilometer} km</span>
              </div>
              <div className="flex items-center">
                <Fuel className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-gray-600">{data.petrol ? "Petrol" : data.diesel ? "Diesel" : "Other"}</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-gray-600">{data.owner}</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Description</h3>
              {/* Additional code for toggling description */}
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* <DollarSign className="w-8 h-8 text-green-500 mr-2" /> */}
                  <span className="text-3xl font-bold text-gray-900">₹{data.price.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link to={`/testdrive/${data._id} `} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center flex-grow">
                  Book Test Drive
                </Link>
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full transition-colors duration-300 ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarsData;