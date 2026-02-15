/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "api.microlink.io", // Microlink Image Preview
            "assets.aceternity.com", // Aceternity UI assets
            "images.unsplash.com", // Unsplash
        ],
    },
};

export default nextConfig;
