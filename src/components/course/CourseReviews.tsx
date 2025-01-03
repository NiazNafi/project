import { useState } from 'react';
import { Star } from 'lucide-react';

export function CourseReviews() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900">4.8</div>
            <div className="flex items-center justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5"
                  fill={star <= 4.8 ? '#1e3a8a' : 'none'}
                  stroke={star <= 4.8 ? '#1e3a8a' : '#d1d5db'}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">Course Rating</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((num) => (
              <div key={num} className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1 w-20">
                  {[...Array(num)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      fill="#1e3a8a"
                      stroke="#1e3a8a"
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-900 rounded-full"
                    style={{ width: `${num * 20}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-12">{num * 20}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className="w-8 h-8"
                    fill={star <= rating ? '#1e3a8a' : 'none'}
                    stroke={star <= rating ? '#1e3a8a' : '#d1d5db'}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Share your experience with this course..."
            />
          </div>
          <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}