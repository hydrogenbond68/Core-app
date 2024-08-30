import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCore = () => {
    const [coreTitle, setCoreTitle] = useState('');
    const [coreDescription, setCoreDescription] = useState('');
    const [link, setLink] = useState('');
    const [hashtag, setHashtag] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (e) => setCoreTitle(e.target.value);
    const handleDescriptionChange = (e) => setCoreDescription(e.target.value);
    const handleLinkChange = (e) => setLink(e.target.value);
    const handleHashtagChange = (e) => setHashtag(e.target.value);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlChange = (e) => setImageUrl(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!coreTitle || !coreDescription) {
            setErrorMessage('Both title and description are required.');
            return;
        }

        const imageToSave = selectedImage || imageUrl;
        if (!imageToSave) {
            setErrorMessage('Please select an image or provide a URL.');
            return;
        }

        // Reset form
        setCoreTitle('');
        setCoreDescription('');
        setLink('');
        setHashtag('');
        setSelectedImage(null);
        setImageUrl('');
        setErrorMessage('');

        // Navigate to dashboard with state containing core data
        navigate('/dashboard', { state: { core: { title: coreTitle, description: coreDescription, link, hashtag, image: imageToSave } } });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md flex">
            {/* Left Side - Plus Button */}
            <div className="w-1/12 pr-4 border-r border-gray-300 flex flex-col justify-center">
                <label htmlFor="imageUpload" className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
                    +
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </div>

            {/* Left Side - Create Core and Picture Frame */}
            <div className="w-1/2 pr-6 border-r border-gray-300 flex flex-col">
                <div className="relative mb-4">
                    <h2 className="text-2xl font-bold mb-6 ml-4">CREATE CORE</h2>
                    <div className="relative border border-gray-600 bg-gray-100 rounded-md ml-4" style={{ height: '500px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        {selectedImage || imageUrl ? (
                            <img src={selectedImage || imageUrl} alt="Selected" className="w-full h-full object-contain" />
                        ) : (
                            <span className="text-gray-500">Choose a file or drag and drop it here</span>
                        )}
                        <label htmlFor="imageUpload" className="bg-white border-2 border-black flex items-center justify-center rounded-full w-12 h-12 cursor-pointer absolute" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-black">
                                <path d="M12 6V14L8 10H6l6 6 6-6h-2l-4 4V6h-2z" />
                            </svg>
                        </label>
                    </div>
                </div>
                <div className="ml-4">
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        placeholder="Paste image URL here"
                    />
                    <button
                        type="button"
                        className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => {
                            if (imageUrl) {
                                const img = new Image();
                                img.src = imageUrl;
                                img.onload = () => {
                                    setSelectedImage(imageUrl);
                                    setImageUrl('');
                                };
                                img.onerror = () => {
                                    setErrorMessage('Invalid URL. Please enter a valid image URL.');
                                };
                            }
                        }}
                    >
                        Save from URL
                    </button>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-1/2 pl-6">
                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="Title" className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                            type="text"
                            id="Title"
                            value={coreTitle}
                            onChange={handleTitleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add title"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Description" className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            id="Description"
                            value={coreDescription}
                            onChange={handleDescriptionChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add a detailed description"
                            rows="4"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="block text-gray-700 font-medium mb-2">Link</label>
                        <input
                            type="text"
                            id="link"
                            value={link}
                            onChange={handleLinkChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add link"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="hashtag" className="block text-gray-700 font-medium mb-2">Hashtag</label>
                        <input
                            type="text"
                            id="hashtag"
                            value={hashtag}
                            onChange={handleHashtagChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Choose a hashtag"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCore