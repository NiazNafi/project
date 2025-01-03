import React, { useRef, useState } from 'react';

export function Whiteboard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (tool === 'pencil') {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = brushSize;
      ctx.lineTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.clearRect(
        e.nativeEvent.offsetX - brushSize / 2,
        e.nativeEvent.offsetY - brushSize / 2,
        brushSize,
        brushSize
      );
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <div className="flex gap-4 mb-4 justify-center flex-col items-center">
          {/* Clear button above Pencil */}
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded mb-4"
          >
            Clear
          </button>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setTool('pencil')}
              className={`px-4 py-2 border rounded ${
                tool === 'pencil' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Pencil
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`px-4 py-2 border rounded ${
                tool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              Eraser
            </button>
            <div className="flex items-center gap-2">
              <label htmlFor="brushSize" className="text-gray-700">Brush Size:</label>
              <input
                id="brushSize"
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={380}
          height={460}
          className="border bg-white mx-auto"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
}