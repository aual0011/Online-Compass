import React, { useState } from 'react';
import { cn } from "@/lib/utils";

const Compass = () => {
  const [degrees, setDegrees] = useState<number>(0);

  const getCardinalDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 360) {
      setDegrees(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 p-4">
      <div className="relative w-64 h-64 mb-8">
        {/* Compass face */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-300 bg-gradient-to-br from-blue-800 to-blue-900 shadow-lg">
          {/* Cardinal directions */}
          {['N', 'E', 'S', 'W'].map((direction, index) => (
            <div
              key={direction}
              className="absolute text-blue-200 font-semibold text-lg"
              style={{
                top: direction === 'N' ? '10px' : direction === 'S' ? 'calc(100% - 30px)' : '50%',
                left: direction === 'W' ? '10px' : direction === 'E' ? 'calc(100% - 20px)' : '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {direction}
            </div>
          ))}
          
          {/* Compass needle */}
          <div
            className="absolute w-1 h-32 bg-yellow-400 left-1/2 top-1/2 origin-bottom transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-50%) translateY(-100%) rotate(${degrees}deg)`
            }}
          >
            <div className="w-3 h-3 bg-yellow-400 rounded-full absolute -top-1 -left-1"></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-blue-800 p-6 rounded-lg shadow-xl space-y-4 w-64">
        <div className="space-y-2">
          <label htmlFor="degrees" className="block text-blue-200 text-sm font-medium">
            Enter Degrees (0-360)
          </label>
          <input
            type="number"
            id="degrees"
            min="0"
            max="360"
            value={degrees}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-blue-700 text-blue-100 rounded border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div className="text-center">
          <p className="text-blue-200">
            Current Direction: {getCardinalDirection(degrees)}
          </p>
          <p className="text-blue-300 text-sm">
            {degrees}°
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compass;