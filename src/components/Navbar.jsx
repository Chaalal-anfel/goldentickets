import { useState, useEffect } from "react"
import { Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    {
      label: "SERVICES",
      href: "#",
      dropdown: [
        { label: "Flight Booking", href: "/services/flights" },
        { label: "Hotel Booking", href: "/services/hotels" },
        { label: "Tour Packages", href: "/services/tours" },
      ],
    },
    { label: "DESTINATIONS", href: "/destinations" },
    { label: "CONTACT", href: "/contact" },
    { label: "LOGIN", href: "/login" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-black/30 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="/" className="flex items-center">
            <div className="relative h-12 w-48">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%202-EmHNE8CQCqYOkuYkiY3CuT3Wba6FVw.png"
                alt="Golden Ticket Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </a>
        </motion.div>

        {isDesktop ? (
          <div className="flex items-center gap-8">
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-6"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.4 }}
                >
                  {item.dropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-white hover:text-golden-400 transition-colors flex items-center gap-1">
                        {item.label}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.dropdown.map((dropdownItem, idx) => (
                          <DropdownMenuItem key={idx} asChild>
                            <a href={dropdownItem.href}>{dropdownItem.label}</a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <a href={item.href} className="text-white hover:text-golden-400 transition-colors">
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <a href="tel:+964750454723" className="flex items-center gap-2 text-white">
                <Phone className="h-4 w-4 text-golden-400" />
                <span>964 750 454 7323</span>
              </a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-golden-400/20 text-white border-golden-400 hover:bg-golden-400/30 transition-all duration-300"
                >
                  Login
                </Button>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gray-900 text-white">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6 mt-8"
                >
                  <div className="mb-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%202-EmHNE8CQCqYOkuYkiY3CuT3Wba6FVw.png"
                      alt="Golden Ticket Logo"
                      className="h-10 w-auto object-contain"
                    />
                  </div>

                  <ul className="flex flex-col gap-4">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {item.dropdown ? (
                          <div className="flex flex-col gap-2">
                            <span className="text-golden-400">{item.label}</span>
                            <ul className="pl-4 flex flex-col gap-2">
                              {item.dropdown.map((dropdownItem, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: (index + idx) * 0.1 + 0.1 }}
                                >
                                  <a
                                    href={dropdownItem.href}
                                    className="text-white hover:text-golden-400 transition-colors"
                                    onClick={() => setOpen(false)}
                                  >
                                    {dropdownItem.label}
                                  </a>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <a
                            href={item.href}
                            className="text-white hover:text-golden-400 transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </a>
                        )}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex flex-col gap-4 mt-4"
                  >
                    <a href="tel:+964750454723" className="flex items-center gap-2 text-white">
                      <Phone className="h-4 w-4 text-golden-400" />
                      <span>964 750 454 7323</span>
                    </a>
                    <Button
                      variant="outline"
                      className="bg-golden-400/20 text-white border-golden-400 hover:bg-golden-400/30"
                    >
                      Login
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
