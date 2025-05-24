'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react'
import logo from '../public/assets/logo.png'
import { navItems } from '../constants'
import {
  fadeIn,
  pulse,
  slideInFromTop,
} from '../constants/animations'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  // On client mount, read theme preference
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('isDarkMode') === 'true'
    setIsDarkMode(stored)
  }, [])

  // Persist and apply theme
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('isDarkMode', isDarkMode)
  }, [isDarkMode, mounted])

  const toggleDarkMode = () => setIsDarkMode(p => !p)
  const toggleMobile = () => setMobileOpen(p => !p)

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-purple-700/80"
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => router.push('/')}
            className="flex items-center flex-shrink-0 cursor-pointer"
          >
            <img src={logo.src} alt="Logo" className="h-8 w-auto mr-2" />
            <span className="text-[16px] tracking-tight">DoctorKays</span>
          </div>

          {/* Desktop links */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`pb-1 ${
                    pathname === item.href
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Dark toggle (desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            {mounted && (
              <button onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <Moon size={24} className="text-gray-300 hover:text-primary" />
                ) : (
                  <Sun size={24} className="text-gray-300 hover:text-primary" />
                )}
              </button>
            )}
          </div>

          {/* Book Consultation (desktop) */}
          <motion.div
            variants={pulse}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center justify-center space-x-12"
          >
            <Link
              href="/consultation"
              className="bg-gradient-to-r from-purple-500 to-purple-950 text-white py-2 px-3 rounded-full"
            >
              Book a Consultation
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleMobile}>
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideInFromTop}
            className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden"
          >
            <ul>
              {navItems.map(item => (
                <motion.li
                  key={item.href}
                  className="py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`pb-1 flex w-fit gap-1 ${
                      pathname === item.href
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-300 hover:text-primary'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div>{item.iconMapping}</div> <div>{item.label}</div>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Dark toggle (mobile) */}
            {mounted && (
              <div className="flex space-x-4 mt-6 mb-5">
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <Moon size={24} className="text-gray-300 hover:text-primary" />
                  ) : (
                    <Sun size={24} className="text-gray-300 hover:text-primary" />
                  )}
                </button>
              </div>
            )}

            {/* Book Consultation (mobile) */}
            <div className="mt-2">
              <Link
                href="/consultation"
                className="rounded-full py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-950 text-white"
                onClick={() => setMobileOpen(false)}
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
