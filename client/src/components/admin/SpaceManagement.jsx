import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  X, Edit2, Trash2, PlusCircle, MapPin, 
  DollarSign, Users, Check 
} from 'lucide-react';
import Navbar from './AdminNavbar';
import Footer from '../Footer';

const initialSpaceState = {
  name: '',
  category: '',
  description: '',
  location: {
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
  },
  pricePerHour: '',
  amenities: '',
  capacity: '',
  availability: true,
  images: [],
  ratings: 0,
};

const SpaceManagement = () => {
  const [spaces, setSpaces] = useState([]);
  const [newSpace, setNewSpace] = useState(initialSpaceState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    fetchSpaces();
  }, []);

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsDialogOpen(false);
        setEditingSpace(null);
      }
    };

    if (isDialogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDialogOpen]);

  const fetchSpaces = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/spaces');
      setSpaces(response.data);
    } catch (error) {
      console.error('Error fetching spaces:', error);
    }
  };

  const handleCreateSpace = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/spaces', newSpace);
      setSpaces([...spaces, response.data.space]);
      setNewSpace(initialSpaceState);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating space:', error);
    }
  };

  const handleUpdateSpace = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/spaces/${editingSpace._id}`, editingSpace);
      setSpaces(spaces.map((space) =>
        space._id === editingSpace._id ? response.data.space : space
      ));
      setEditingSpace(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating space:', error);
    }
  };

  const handleDeleteSpace = async (spaceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/spaces/${spaceId}`);
      setSpaces(spaces.filter((space) => space._id !== spaceId));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting space:', error);
    }
  };

  const handleChange = (field, value, nestedField = null) => {
    const updateState = editingSpace ? setEditingSpace : setNewSpace;
    const currentState = editingSpace || newSpace;

    if (nestedField) {
      updateState({
        ...currentState,
        [field]: {
          ...currentState[field],
          [nestedField]: value,
        },
      });
    } else {
      updateState({
        ...currentState,
        [field]: value,
      });
    }
  };

  const handleImageUrlChange = (index, value) => {
    const updateState = editingSpace ? setEditingSpace : setNewSpace;
    const currentState = editingSpace || newSpace;

    const updatedImages = [...(currentState.images || [])];
    updatedImages[index] = value;

    updateState({
      ...currentState,
      images: updatedImages,
    });
  };

  const addImageUrlField = () => {
    const updateState = editingSpace ? setEditingSpace : setNewSpace;
    const currentState = editingSpace || newSpace;

    updateState({
      ...currentState,
      images: [...(currentState.images || []), ''],
    });
  };

  const removeImageUrl = (index) => {
    const updateState = editingSpace ? setEditingSpace : setNewSpace;
    const currentState = editingSpace || newSpace;

    const updatedImages = currentState.images.filter((_, i) => i !== index);
    
    updateState({
      ...currentState,
      images: updatedImages,
    });
  };

  const renderInput = (label, field, value, type = 'text', nestedField = null) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
        {label}
      </label>
      <input
        type={type}
        value={nestedField ? value[field][nestedField] : value[field]}
        onChange={(e) =>
          nestedField
            ? handleChange(field, e.target.value, nestedField)
            : handleChange(field, e.target.value)
        }
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const renderSpaceRow = (space) => (
    <tr key={space._id} className="border-b text-md hover:bg-gray-50 transition">
      <td className="px-6 py-4">{space.name}</td>
      <td className="px-6 py-4">{space.category}</td>
      <td className="px-6 py-4">{space.location.address}</td>
      <td className="px-6 py-4">Rp{space.pricePerHour}</td>
      <td className="px-2 py-4">{space.capacity} people</td>
      <td className="px-2 py-4 flex items-center justify-center">
        <button
          onClick={() => {
            setEditingSpace(space);
            setIsDialogOpen(true);
          }}
          className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 p-2 rounded-full transition"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setDeleteConfirmation(space._id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-[1280px] mt-[70px] min-h-screen py-[80px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Space Management
          </h1>
          <button
            onClick={() => {
              setNewSpace(initialSpaceState);
              setIsDialogOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" /> 
            Add New Space
          </button>
        </div>

        {/* Create/Edit Space Modal */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div 
              ref={dialogRef}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto"
            >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingSpace ? 'Edit Space' : 'Create New Space'}
                </h2>
                <button 
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingSpace(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="grid grid-cols-2 gap-6">
                {renderInput('Name', 'name', editingSpace || newSpace)}
                {renderInput('Category', 'category', editingSpace || newSpace)}
                {renderInput('Description', 'description', editingSpace || newSpace)}
                {renderInput('Address', 'location', editingSpace || newSpace, 'text', 'address')}
                {renderInput('City', 'location', editingSpace || newSpace, 'text', 'city')}
                {renderInput('State', 'location', editingSpace || newSpace, 'text', 'state')}
                {renderInput('Country', 'location', editingSpace || newSpace, 'text', 'country')}
                {renderInput('Latitude', 'location', editingSpace || newSpace, 'number', 'lat')}
                {renderInput('Longitude', 'location', editingSpace || newSpace, 'number', 'lng')}
                {renderInput('Price Per Hour', 'pricePerHour', editingSpace || newSpace, 'number')}
                {renderInput('Capacity', 'capacity', editingSpace || newSpace, 'number')}
                {renderInput('Amenities (comma separated)', 'amenities', editingSpace || newSpace)}
                
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image URLs
                  </label>
                  {(editingSpace || newSpace).images.map((imageUrl, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        placeholder="Enter image URL"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageUrl(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImageUrlField}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 mt-2 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Add Image URL
                  </button>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <label className="mr-4 text-gray-700 font-medium">Availability</label>
                  <input
                    type="checkbox"
                    checked={editingSpace ? editingSpace.availability : newSpace.availability}
                    onChange={(e) => handleChange('availability', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2 flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingSpace(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingSpace ? handleUpdateSpace : handleCreateSpace}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <Check className="mr-2 w-5 h-5" />
                    {editingSpace ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h3>
              <p className="mb-6 text-gray-600">Are you sure you want to delete this space?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteSpace(deleteConfirmation)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center"
                >
                  <Trash2 className="mr-2 w-5 h-5" /> 
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Spaces Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <MapPin className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <Users className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <MapPin className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <DollarSign className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Price/Hour
                  </th>
                  <th className="px-6 py-4 text-left text-gray-600 font-semibold">
                    <Users className="inline-block mr-2 w-5 h-5 text-gray-500" />
                    Capacity
                  </th>
                  <th className="px-6 py-4 text-center text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {spaces.map(renderSpaceRow)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpaceManagement;