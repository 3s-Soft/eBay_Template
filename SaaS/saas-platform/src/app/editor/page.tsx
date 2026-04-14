"use client";

import { useState, useEffect } from "react";

export default function EditorPage() {
  const [formData, setFormData] = useState({
    title: "Premium Nike Sneakers",
    price: "$129.99",
    mainImage: "https://via.placeholder.com/600x400?text=Sneakers",
    description: "Great condition. Includes original box.",
    condition: "Pre-owned - Excellent",
  });

  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTemplate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: "demo",
          data: formData,
        }),
      });
      const data = await res.json();
      if (data.html) {
        setGeneratedHtml(data.html);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate an initial preview on mount
  useEffect(() => {
    generateTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    alert("HTML Copied to Clipboard!");
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-6 bg-white border-r border-gray-200 overflow-y-auto shadow-sm z-10">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 tracking-tight">Listing Automator <span className="text-sm font-normal text-gray-400 bg-indigo-50 px-2 py-1 rounded ml-2">MVP</span></h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
            <input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
            <input 
              name="mainImage" 
              value={formData.mainImage} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <input 
              name="condition" 
              value={formData.condition} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            />
          </div>

          <div className="pt-4 border-t border-gray-200 mt-6 flex flex-col gap-3">
            <button 
              onClick={generateTemplate} 
              disabled={isGenerating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition disabled:opacity-75 disabled:cursor-wait"
            >
              {isGenerating ? "Updating..." : "Refresh Preview"}
            </button>
            <button 
              onClick={copyToClipboard}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-2.5 px-4 rounded-md border border-gray-300 shadow-sm transition"
            >
              Copy HTML Source
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-gray-100 p-8 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
          <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">eBay Compliant (No JS)</span>
        </div>
        <div className="flex-1 bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden relative">
          {generatedHtml ? (
            <iframe 
               srcDoc={generatedHtml} 
               className="w-full h-full border-none absolute inset-0"
               title="Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">Loading Preview...</div>
          )}
        </div>
      </div>
    </div>
  );
}
