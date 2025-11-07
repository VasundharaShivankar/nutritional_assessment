import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function ProgressTracker() {
  const [pastImage, setPastImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [disease, setDisease] = useState('Skin Lesion (Generic/Acne)');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const diseases = [
    'Skin Lesion (Generic/Acne)',
    'Nail Psoriasis',
    'Dermatitis / Eczema',
    'Stevens-Johnson Syndrome (SJS)',
    'Psoriasis',
    'Scoliosis'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pastImage || !newImage) {
      alert('Please select both past and new images');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('past_image', pastImage);
    formData.append('new_image', newImage);
    formData.append('disease', disease);

    try {
      const response = await fetch('http://localhost:5000/progress-tracker', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Disease Progress Tracker</h1>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Disease:</label>
              <select
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {diseases.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Past Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPastImage(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">New Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Track Progress'}
            </button>
          </form>

          {result && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Progress Report</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Disease:</strong> {result.disease}</p>
                  <p><strong>Past Area:</strong> {result.past_area} pixels</p>
                  <p><strong>New Area:</strong> {result.new_area} pixels</p>
                </div>
                <div>
                  <p><strong>Percent Change:</strong> {result.percent_change.toFixed(2)}%</p>
                  <p><strong>Status:</strong> <span className={`font-bold ${
                    result.status.includes('IMPROVEMENT') ? 'text-green-600' :
                    result.status.includes('REGRESSION') ? 'text-red-600' : 'text-gray-600'
                  }`}>{result.status}</span></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProgressTracker;
