import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DeviceSelector } from './components/DeviceSelector';
import { HowItWorks } from './components/HowItWorks';
import { ServicesDetailed } from './components/ServicesDetailed';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetails } from './components/ProductDetails';
import { BookYourRepairPage } from './components/BookYourRepairPage';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { FindUsSection } from './components/FindUsSection';
import { FAQSection } from './components/FAQSection';
import { BrandLogos } from './components/BrandLogos';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { DeviceType, RepairService, ProductItem, CartItem } from './types';
import { PRODUCTS_CATALOG } from './data/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('iPhone');
  const [selectedRepair, setSelectedRepair] = useState<RepairService | null>(null);

  // Dedicated Product Page state
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Dedicated Book Your Repair Page state
  const [isBookingPage, setIsBookingPage] = useState(false);

  // Cart state for direct product ordering
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync hash routing for direct links or back button navigation
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const found = PRODUCTS_CATALOG.find((p) => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setIsBookingPage(false);
          return;
        }
      } else if (hash === '#book-repair' || hash === '#appointment' || hash === '#booking') {
        setIsBookingPage(true);
        setSelectedProduct(null);
        return;
      } else if (hash === '' || hash === '#hero' || hash === '#services' || hash === '#products') {
        setIsBookingPage(false);
        setSelectedProduct(null);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleSelectProduct = (product: ProductItem) => {
    setIsBookingPage(false);
    setSelectedProduct(product);
    window.location.hash = `product-${product.id}`;
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setIsBookingPage(false);
    window.location.hash = 'products';
    setTimeout(() => {
      const el = document.getElementById('products');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleGoHome = () => {
    setSelectedProduct(null);
    setIsBookingPage(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = () => {
    setSelectedRepair(null);
    setSelectedProduct(null);
    setIsBookingPage(true);
    window.location.hash = 'book-repair';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRepair = (repair: RepairService) => {
    setSelectedRepair(repair);
    setSelectedProduct(null);
    setIsBookingPage(true);
    window.location.hash = 'book-repair';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromBooking = () => {
    setIsBookingPage(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to basket`);
  };

  const handleBuyNow = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-blue-500/50 text-white text-xs font-semibold shadow-2xl shadow-blue-950/60 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar with Desktop TopBar & Off-Canvas Drawer */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={handleOpenBooking}
        onGoHome={handleGoHome}
      />

      {/* Main Page Layout, Dedicated Single Product Page, or Dedicated Book Your Repair Page */}
      <main id="main-content">
        {isBookingPage ? (
          <BookYourRepairPage
            onBack={handleBackFromBooking}
            preselectedDevice={selectedDevice}
            preselectedRepair={selectedRepair}
          />
        ) : selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onBack={handleBackToCatalog}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectRelatedProduct={handleSelectProduct}
          />
        ) : (
          <>
            {/* Hero with cinematic video / poster, canvas circuits & parallax */}
            <Hero onOpenBooking={handleOpenBooking} />

            {/* Device Category Picker & Popular Repairs */}
            <DeviceSelector
              selectedDevice={selectedDevice}
              onSelectDevice={(device) => {
                setSelectedDevice(device);
                setSelectedRepair(null);
                setSelectedProduct(null);
                setIsBookingPage(true);
                window.location.hash = 'book-repair';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectRepair={handleSelectRepair}
            />

            {/* 3-Step Process: Book, Diagnose & Fix, Collect */}
            <HowItWorks onOpenBooking={handleOpenBooking} />

            {/* Detailed Services & Capabilities */}
            <ServicesDetailed onOpenBooking={handleOpenBooking} />

            {/* Direct Ordering Product Catalog */}
            <ProductCatalog
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onSelectProduct={handleSelectProduct}
            />

            {/* Why Choose Us & Interactive Before/After Showcase */}
            <WhyChooseUs onOpenBooking={handleOpenBooking} />

            {/* Customer Reviews with Mobile Scrolling Marquee */}
            <ReviewsSection />

            {/* Find Us Card with Google Maps, Address & Tap-to-call */}
            <FindUsSection />

            {/* Frequently Asked Questions */}
            <FAQSection />

            {/* Brand Compatibility Banner */}
            <BrandLogos />
          </>
        )}
      </main>

      {/* Footer with Quick Inquiry Form */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDevice={selectedDevice}
        preselectedRepair={selectedRepair}
      />

      {/* Direct Order Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
