import { useState, useEffect } from "react"
import { Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "#about" },
    {
      label: "SERVICES",
      href: "#services",

    },
    { label: "DESTINATIONS", href: "#destinations" },
    { label: "CONTACT", href: "#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed navbar-font top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-black backdrop-blur-md "
          : "text-white   "
      }`}
    >
      <div className="container mx-auto px-4">
        {isDesktop ? (
          <div className="flex items-center justify-between w-full">

            {/* 1️⃣ LOGO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <a href="/" className="flex items-center">
                <div className="relative h-20 w-48">
                  <img
                    src="/logo-dark.png"
                    alt="Golden Ticket Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
              </a>
            </motion.div>

            {/* 2️⃣ MENU */}
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
                  transition={{
                    duration: 0.3,
                    delay: 0.1 * index + 0.4,
                  }}
                >
                  {item.dropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:text-golden-400 transition-colors flex items-center gap-1">
                        {item.label}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.dropdown.map((dropdownItem, idx) => (
                          <DropdownMenuItem key={idx} asChild>
                            <a href={dropdownItem.href}>
                              {dropdownItem.label}
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <a
                      href={item.href}
                      className="hover:text-golden-400 transition-colors"
                      onClick={(e) => {
                        if (item.href.startsWith("#")) {
                          e.preventDefault()
                          const el = document.getElementById(
                            item.href.replace("#", "")
                          )
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            })
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            {/* 3️⃣ TEL + LOGIN */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4 flex-shrink-0"
            >
              <a
                href="https://wa.me/+964750454723"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-golden-400" />
                <span>964 750 454 7323</span>
              </a>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="bg-golden-400 text-white border-golden-400 hover:bg-golden-400/90 px-8  text-sm rounded-full transition-all duration-300"
                  onClick={() => {
                    const el =
                      document.getElementById("register-login")
                    if (el)
                      el.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* 📱 MOBILE (inchangé) */
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white text-black p-6">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6 mt-8"
                >
                  <img
                    src="/logo-dark.png"
                    alt="Golden Ticket Logo"
                    className="h-20 w-auto object-contain mb-6"
                  />

                  <ul className="flex flex-col gap-4">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                        }}
                        className="border-b border-gray-200"
                      >
                        <a
                          href={item.href}
                          className="hover:text-golden-400"
                          onClick={(e) => {
                            e.preventDefault()
                            setOpen(false)
                            setTimeout(() => {
                              if (item.href.startsWith("#")) {
                                const el = document.getElementById(
                                  item.href.replace("#", "")
                                )
                                if (el)
                                  el.scrollIntoView({
                                    behavior: "smooth",
                                  })
                              } else {
                                window.location.href = item.href
                              }
                            }, 200)
                          }}
                        >
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-4 mt-4">
                    <a
                      href="https://wa.me/964750454723"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-golden-400" />
                      <span>964 750 454 7323</span>
                    </a>

                    <Button
                      className="bg-golden-400 text-white rounded-full py-6"
                      onClick={() => {
                        setOpen(false)
                        setTimeout(() => {
                          const el =
                            document.getElementById("register-login")
                          if (el)
                            el.scrollIntoView({
                              behavior: "smooth",
                            })
                        }, 200)
                      }}
                    >
                      Login
                    </Button>
                  </div>
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
