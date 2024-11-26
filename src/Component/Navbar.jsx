import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, User, ShoppingCart, MapPin,Car, Calendar, Clipboard, Package, Book, FileText, Users, Building, Settings, LogOut, Menu, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

const logo = '/Img/carlogo4.png';

const Dropdown = ({ label, items, isMobile, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (onItemClick) onItemClick();
    if (item.onClick) item.onClick();
    setIsOpen(false);
  };

  return (
    <div 
      className={`relative ${isMobile ? 'w-full' : ''}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="text-black hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center w-full justify-between"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className={`bg-white rounded-md shadow-lg overflow-hidden ${
            isMobile ? 'w-full' : 'absolute w-64 right-0'
          } ${isMobile ? 'max-h-[60vh] overflow-y-auto' : ''}`}
          aria-label={`${label} submenu`}
          role="menu"
        >
          <div className="py-1 w-full">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'link' && (
                  <Link 
                    to={item.href} 
                    className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-orange-100 transition-colors duration-200" 
                    onClick={() => handleItemClick(item)}
                    role="menuitem"
                  >
                    {item.icon && <item.icon className="mr-3 h-5 w-5 text-gray-900" aria-hidden="true" />}
                    <span className="flex-grow">{item.label}</span>
                    {item.tag && <span className="bg-orange-500 text-white px-2 py-1 text-xs rounded ml-2">{item.tag}</span>}
                  </Link>
                )}
                {item.type === 'separator' && (
                  <hr className="my-2 border-gray-200" role="separator" />
                )}
                {item.type === 'header' && (
                  <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider" role="presentation">{item.label}</h3>
                )}
                {item.type === 'button' && (
                  <button 
                    onClick={() => handleItemClick(item)} 
                    className={item.className}
                    role="menuitem"
                  >
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { user, logout, setUser } = useUser();
  const [location, setLocation] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Location unavailable");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
    if (isMobile) {
      handleMobileLinkClick();
    }
  };

  const handleMobileLinkClick = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const servicesItems = [
    { type: 'link', label: 'Financing', href: '/financing', icon: FileText },
    { type: 'link', label: 'Insurance', href: '/insurance', icon: Clipboard },
  ];

  const placesItems = [
    { type: 'link', label: 'Showrooms', href: '/showrooms', icon: Building },
    { type: 'link', label: 'Service Centers', href: '/service', icon: Settings },
    { type: 'link', label: 'Dealerships', href: '/dealerships', icon: Users },
  ];

  const accountItems = [
    ...(user ? [] : [{
      type: 'link',
      label: 'Log In/Sign Up',
      href: '/login',
      icon: User,
      className: 'block w-full text-center bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none mb-2 transition-colors duration-200',
    }]),
    { type: 'header', label: 'My Activities' },
    { type: 'link', label: 'My Appointments', href: '/my-appointments', icon: Calendar, tag: 'SELL' },
    { type: 'link', label: 'My Bookings', href: '/my-bookings', icon: Book, tag: 'BUY' },
    { type: 'link', label: 'My Orders', href: '/my-orders', icon: Package },
    { type: 'separator' },
    { type: 'header', label: 'Account Management' },
    { type: 'link', label: 'Upload-Car', href: '/carup', icon: Car },
    { type: 'link', label: 'RC Transfer Status', href: '/rc-transfer-status', icon: Clipboard },
    { type: 'separator' },
    { type: 'header', label: 'Resources' },
    { type: 'link', label: 'Help Center', href: '/help', icon: FileText },
    { type: 'link', label: 'FAQ', href: '/faq', icon: FileText },
    { type: 'separator' },
    { type: 'header', label: 'Partnerships' },
    { type: 'link', label: 'Become Our Partner', href: '/become-partner', icon: Users },
    { type: 'link', label: 'Become a CarNagpur Franchise', href: '/franchise', icon: Building },
    { type: 'separator' },
    ...(user ? [{
      type: 'button',
      label: 'Sign Out',
      onClick: handleLogout,
      icon: LogOut,
      className: 'flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-orange-100 w-full transition-colors duration-200'
    }] : [])
  ];

  return (
    <div className='mb-[80px] lg:mb-20'>
      <nav className="bg-orange-50 shadow-lg fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center" onClick={handleMobileLinkClick}>
                <img src={logo} alt="CarNagpur Logo" className="h-12 w-auto" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/usedcars" className="text-black hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Used Cars</Link>
              <Link to="/sell-car" className="text-black hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Sell Your Car</Link>
              <Dropdown label="Services" items={servicesItems} isMobile={false} />
              <Dropdown label="Places" items={placesItems} isMobile={false} />
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/cart" className="p-2 rounded-full text-black hover:text-orange-600 transition-colors duration-200">
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
              {user ? (
                <Dropdown
                  label={
                    <div className="flex items-center">
                      <div className="bg-orange-500 rounded-full p-1 mr-2">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm font-medium flex items-center">hello,😊<br />
                        {user.name || user.email}
                      </span>
                    </div>
                  }
                  items={accountItems}
                  isMobile={false}
                />
              ) : (
                <Dropdown
                  label={
                    <div className="flex items-center">
                      <User className="h-6 w-6 mr-1" />
                      <span className="text-sm font-medium">Account</span>
                    </div>
                  }
                  items={accountItems}
                  isMobile={false}
                />
              )}
              <button
                onClick={handleLocationClick}
                className="flex items-center text-black hover:text-orange-600 focus:outline-none transition-colors duration-200"
              >
                <MapPin className="h-6 w-6 mr-1" />
                <span className="text-sm font-medium">{location || "Nagpur"}</span>
              </button>
            </div>

            <div className="lg:hidden">
              <button
                className="text-black hover:text-orange-600 p-2 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-8 w-8" aria-hidden="true" />
                ) : (
                  <Menu className="h-8 w-8" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-orange-50 overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="flex justify-between items-center mb-4">
                <Link to="/" className="flex-shrink-0" onClick={handleMobileLinkClick}>
                  <img src={logo} alt="CarNagpur Logo" className="h-10 w-auto" />
                </Link>
                <button
                  className="text-black hover:text-orange-600 p-2 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-8 w-8" aria-hidden="true" />
                </button>
              </div>
              <Link to="/usedcars" className="text-black hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium" onClick={handleMobileLinkClick}>Used Cars</Link>
              <Link to="/sell-car" className="text-black hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium" onClick={handleMobileLinkClick}>Sell Your Car</Link>
              <Dropdown label="Services" items={servicesItems} isMobile={true} onItemClick={handleMobileLinkClick} />
              <Dropdown label="Places" items={placesItems} isMobile={true} onItemClick={handleMobileLinkClick} />
              <Link to="/cart" className="text-black hover:text-orange-600 block px-3 py-2 rounded-md text-base font-medium" onClick={handleMobileLinkClick}>
                <ShoppingCart className="h-6 w-6 inline-block mr-2" />
                Cart
              </Link>
              <Dropdown
                label={
                  <div className="flex items-center">
                    <User className="h-6 w-6 mr-2" />
                    <span className="text-base font-medium">{user ? (user.name || user.email) : 'Account'}</span>
                  </div>
                }
                items={accountItems}
                isMobile={true}
                onItemClick={handleMobileLinkClick}
              />
              <button
                onClick={handleLocationClick}
                className="flex items-center text-black hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium w-full"
              >
                <MapPin className="h-6 w-6 mr-2" />
                <span>{location || "Nagpur"}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

