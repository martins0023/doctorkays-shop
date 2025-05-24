/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',  'blog.doctorkays.com'     // allow Sanity’s hosted assets
      // any other external domains…
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port: "",
        // pathname: "/ayomikun/image/upload/**",
      }
    ]
  }
    // experimental: {
    //   appDir: true,
    //   serverComponentsExternalPackages: ["mongoose"],
    // },
    // images: {
    //   domains: ['lh3.googleusercontent.com'],
    // },
    // webpack(config) {
    //   config.experiments = {
    //     ...config.experiments,
    //     topLevelAwait: true,
    //   }
    //   return config
    // }
  }
  
  module.exports = nextConfig
  