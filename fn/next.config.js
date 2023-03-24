/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_BASE_URL: 'http://0.0.0.0:3000/',
        NEXT_PUBLIC_API_URL: 'http://103.214.112.32:5000/',
    },
}

module.exports = nextConfig
