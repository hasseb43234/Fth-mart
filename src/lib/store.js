import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_ANNOUNCEMENT
} from '../data/mock-data';
import { generateOrderNumber, generateTrackingNumber } from './formatters';

export const useStore = create(
  persist(
    (set, get) => ({
      // --- Auth & User State ---
      user: {
        id: 'usr-001',
        name: 'Saad Ur Rehman',
        phone: '03214892104',
        email: 'saad.rehman@gmail.com',
        role: 'customer', // 'customer' or 'admin'
        addresses: [
          {
            id: 'addr-1',
            isDefault: true,
            recipientName: 'Saad Ur Rehman',
            phone: '03214892104',
            province: 'Punjab',
            city: 'Lahore',
            area: 'DHA Phase 5, Sector C',
            street: 'House 412, Street 8',
            landmark: 'Near Jalal Sons'
          },
          {
            id: 'addr-2',
            isDefault: false,
            recipientName: 'Saad Ur Rehman (Office)',
            phone: '03214892104',
            province: 'Punjab',
            city: 'Lahore',
            area: 'Gulberg III',
            street: 'Office 402, Al-Hafeez Heights',
            landmark: 'Ghalib Market'
          }
        ]
      },
      login: (userData) => set({ user: { ...get().user, ...userData } }),
      logout: () => set({ user: null }),
      switchRole: (role) => {
        const currentUser = get().user || {
          id: 'usr-001',
          name: 'Saad Ur Rehman',
          phone: '03214892104',
          email: 'saad.rehman@gmail.com'
        };
        set({ user: { ...currentUser, role } });
      },
      addUserAddress: (addressData) => {
        const user = get().user;
        if (!user) return;
        const newAddress = {
          id: `addr-${Date.now()}`,
          isDefault: user.addresses.length === 0,
          ...addressData
        };
        set({
          user: {
            ...user,
            addresses: [...user.addresses, newAddress]
          }
        });
      },
      deleteUserAddress: (addressId) => {
        const user = get().user;
        if (!user) return;
        set({
          user: {
            ...user,
            addresses: user.addresses.filter((a) => a.id !== addressId)
          }
        });
      },
      setDefaultAddress: (addressId) => {
        const user = get().user;
        if (!user) return;
        set({
          user: {
            ...user,
            addresses: user.addresses.map((a) => ({
              ...a,
              isDefault: a.id === addressId
            }))
          }
        });
      },

      // --- Storefront Products & Inventory ---
      products: INITIAL_PRODUCTS,
      syncMarkazCatalog: () => {
        set({ products: INITIAL_PRODUCTS, categories: INITIAL_CATEGORIES });
        return INITIAL_PRODUCTS.length;
      },
      addProduct: (productData) => {
        const newProduct = {
          id: `prod-${Date.now()}`,
          rating: 5.0,
          reviewsCount: 0,
          ordersCount: 0,
          reviews: [],
          faqs: [],
          ...productData
        };
        set((state) => ({ products: [newProduct, ...state.products] }));
        return newProduct;
      },
      updateProduct: (productId, updatedData) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, ...updatedData } : p
          )
        }));
      },
      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId)
        }));
      },
      updateStock: (productId, newStock) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, stock: Math.max(0, Number(newStock)) } : p
          )
        }));
      },

      // --- Categories ---
      categories: INITIAL_CATEGORIES,
      addCategory: (catData) => {
        const newCat = {
          id: `cat-${Date.now()}`,
          itemCount: 0,
          featured: false,
          subcategories: [],
          ...catData
        };
        set((state) => ({ categories: [...state.categories, newCat] }));
      },
      updateCategory: (catId, updatedData) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === catId ? { ...c, ...updatedData } : c
          )
        }));
      },
      deleteCategory: (catId) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== catId)
        }));
      },

      // --- Shopping Cart ---
      cart: [
        {
          id: 'cart-item-1',
          productId: 'prod-001',
          variantId: 'v-001-1',
          variantTitle: 'Midnight Black / Standard ANC',
          title: 'FTH Pro ANC Wireless Earbuds with LED Power Display',
          price: 2499,
          costPrice: 1150,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80',
          sku: 'FTH-AUD-01-BLK',
          selected: true,
          sellerName: 'FTH Official Tech Hub'
        }
      ],
      appliedCoupon: null,
      selectedShippingCity: 'Lahore',
      setSelectedShippingCity: (city) => set({ selectedShippingCity: city }),

      addToCart: (product, variant, quantity = 1) => {
        const cart = get().cart;
        const variantId = variant?.id || 'default';
        const existingIndex = cart.findIndex(
          (item) => item.productId === product.id && item.variantId === variantId
        );

        if (existingIndex > -1) {
          const updated = [...cart];
          updated[existingIndex].quantity += quantity;
          set({ cart: updated });
        } else {
          const newItem = {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            productId: product.id,
            variantId: variantId,
            variantTitle: variant?.title || 'Standard',
            title: product.title,
            price: variant?.price || product.price,
            costPrice: variant?.costPrice || product.costPrice || (product.price * 0.5),
            quantity: quantity,
            image: (variant?.imageIndex !== undefined && product.images[variant.imageIndex]) ? product.images[variant.imageIndex] : (product.images[0] || ''),
            sku: variant?.sku || product.sku,
            selected: true,
            sellerName: product.seller?.name || 'FTH Mart Official'
          };
          set({ cart: [...cart, newItem] });
        }
        get().addToast({
          title: 'Added to Cart',
          message: `${product.title.substring(0, 32)}... has been added.`,
          type: 'success'
        });
      },

      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          )
        }));
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== cartItemId)
        }));
        get().addToast({
          title: 'Item Removed',
          message: 'Item was removed from your cart.',
          type: 'info'
        });
      },

      toggleCartItemSelection: (cartItemId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === cartItemId ? { ...item, selected: !item.selected } : item
          )
        }));
      },

      selectAllCartItems: (selectAll = true) => {
        set((state) => ({
          cart: state.cart.map((item) => ({ ...item, selected: selectAll }))
        }));
      },

      clearCart: () => set({ cart: [], appliedCoupon: null }),

      applyCoupon: (code) => {
        const found = get().coupons.find(
          (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
        );
        if (!found) {
          get().addToast({
            title: 'Invalid Coupon',
            message: 'Coupon code not found or expired.',
            type: 'error'
          });
          return false;
        }

        const subtotal = get().getCartSubtotal();
        if (subtotal < found.minSpend) {
          get().addToast({
            title: 'Minimum Spend Required',
            message: `Order must be at least Rs ${found.minSpend.toLocaleString()} to use ${found.code}.`,
            type: 'warning'
          });
          return false;
        }

        set({ appliedCoupon: found });
        get().addToast({
          title: 'Coupon Applied! 🎉',
          message: `Saved with ${found.code} - ${found.description}`,
          type: 'success'
        });
        return true;
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
        get().addToast({
          title: 'Coupon Removed',
          message: 'Promo coupon has been removed.',
          type: 'info'
        });
      },

      getCartSubtotal: () => {
        return get().cart
          .filter((item) => item.selected)
          .reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getCartShipping: () => {
        const subtotal = get().getCartSubtotal();
        if (subtotal === 0) return 0;
        if (subtotal >= 2500) return 0; // Free delivery over Rs 2,500
        return 180; // Standard TCS Delivery in Pakistan
      },

      getCartDiscount: () => {
        const coupon = get().appliedCoupon;
        const subtotal = get().getCartSubtotal();
        if (!coupon || subtotal === 0) return 0;
        if (coupon.discountPercent > 0) {
          return Math.round((subtotal * coupon.discountPercent) / 100);
        }
        return coupon.fixedDiscount || 0;
      },

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        if (subtotal === 0) return 0;
        const shipping = get().getCartShipping();
        const discount = get().getCartDiscount();
        return Math.max(0, subtotal + shipping - discount);
      },

      // --- Wishlist ---
      wishlist: ['prod-002', 'prod-005'],
      toggleWishlist: (productId) => {
        const wishlist = get().wishlist;
        const exists = wishlist.includes(productId);
        if (exists) {
          set({ wishlist: wishlist.filter((id) => id !== productId) });
          get().addToast({
            title: 'Removed from Wishlist',
            message: 'Product removed from your saved items.',
            type: 'info'
          });
        } else {
          set({ wishlist: [...wishlist, productId] });
          get().addToast({
            title: 'Added to Wishlist ❤️',
            message: 'Saved to your personal wishlist.',
            type: 'success'
          });
        }
      },
      isInWishlist: (productId) => get().wishlist.includes(productId),

      // --- Orders & Operations ---
      orders: INITIAL_ORDERS,
      createOrder: (orderPayload) => {
        const orderId = generateOrderNumber();
        const trackingNumber = generateTrackingNumber(orderPayload.courierPrefix || 'TCS');

        const newOrder = {
          id: orderId,
          createdAt: new Date().toISOString(),
          customer: orderPayload.customer,
          shippingAddress: orderPayload.shippingAddress,
          items: orderPayload.items,
          subtotal: orderPayload.subtotal,
          shippingFee: orderPayload.shippingFee,
          discount: orderPayload.discount,
          total: orderPayload.total,
          totalCost: orderPayload.items.reduce((sum, i) => sum + (i.costPrice || i.price * 0.5) * i.quantity, 0),
          grossProfit: orderPayload.total - orderPayload.items.reduce((sum, i) => sum + (i.costPrice || i.price * 0.5) * i.quantity, 0),
          paymentMethod: orderPayload.paymentMethod || 'cod',
          paymentStatus: orderPayload.paymentMethod === 'cod' ? 'pending_cod' : 'paid',
          status: 'placed',
          courier: orderPayload.courier || 'TCS Express',
          trackingNumber: trackingNumber,
          rtoRisk: 'low',
          notes: orderPayload.notes || '',
          timeline: [
            {
              status: 'placed',
              title: 'Order Placed Successfully',
              time: new Date().toISOString(),
              note: `Order registered via ${orderPayload.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Prepaid Transfer'}.`
            }
          ]
        };

        // Decrement stock for ordered items
        const currentProducts = get().products;
        const updatedProducts = currentProducts.map((prod) => {
          const orderedItem = orderPayload.items.find((i) => i.productId === prod.id);
          if (orderedItem) {
            return {
              ...prod,
              stock: Math.max(0, prod.stock - orderedItem.quantity),
              ordersCount: (prod.ordersCount || 0) + orderedItem.quantity
            };
          }
          return prod;
        });

        // Remove ordered items from cart
        const orderedItemIds = orderPayload.items.map((i) => i.id);
        const remainingCart = get().cart.filter((i) => !orderedItemIds.includes(i.id));

        set((state) => ({
          orders: [newOrder, ...state.orders],
          products: updatedProducts,
          cart: remainingCart,
          appliedCoupon: null
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus, note = '', courier = null, trackingNumber = null) => {
        const statusTitles = {
          placed: 'Order Placed',
          confirmed: 'Order Verified & Confirmed',
          packed: 'Packed & Ready for Dispatch',
          shipped: 'Handed to Courier Logistics',
          in_transit: 'In Transit — Out for Delivery',
          delivered: 'Delivered & Payment Reconciled',
          cancelled: 'Order Cancelled',
          rto: 'Return to Origin (RTO Initiated)'
        };

        set((state) => ({
          orders: state.orders.map((ord) => {
            if (ord.id === orderId) {
              const newEvent = {
                status: newStatus,
                title: statusTitles[newStatus] || newStatus,
                time: new Date().toISOString(),
                note: note || `Status transitioned to ${newStatus}.`
              };
              return {
                ...ord,
                status: newStatus,
                courier: courier || ord.courier,
                trackingNumber: trackingNumber || ord.trackingNumber,
                paymentStatus: (newStatus === 'delivered' && ord.paymentMethod === 'cod') ? 'collected' : ord.paymentStatus,
                timeline: [...ord.timeline, newEvent]
              };
            }
            return ord;
          })
        }));

        get().addToast({
          title: 'Order Status Updated',
          message: `Order ${orderId} is now ${newStatus.toUpperCase()}.`,
          type: 'success'
        });
      },

      cancelOrder: (orderId, reason = 'Customer requested cancellation') => {
        get().updateOrderStatus(orderId, 'cancelled', reason);
      },

      // --- Coupons Management ---
      coupons: INITIAL_COUPONS,
      addCoupon: (couponData) => {
        set((state) => ({
          coupons: [{ active: true, ...couponData }, ...state.coupons]
        }));
        get().addToast({
          title: 'Coupon Created',
          message: `Promo code ${couponData.code} is now live.`,
          type: 'success'
        });
      },
      deleteCoupon: (code) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.code !== code)
        }));
      },
      toggleCouponStatus: (code) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.code === code ? { ...c, active: !c.active } : c
          )
        }));
      },

      // --- Product Reviews ---
      addProductReview: (productId, reviewData) => {
        const user = get().user;
        const newReview = {
          id: `rev-${Date.now()}`,
          userName: user?.name || 'Verified Pakistani Buyer',
          userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
          rating: reviewData.rating || 5,
          date: new Date().toISOString().split('T')[0],
          verifiedPurchase: true,
          variantPurchased: reviewData.variantTitle || 'Standard',
          comment: reviewData.comment,
          images: reviewData.images || [],
          helpfulCount: 0
        };

        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === productId) {
              const updatedReviews = [newReview, ...(p.reviews || [])];
              const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
              const avgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));
              return {
                ...p,
                reviews: updatedReviews,
                reviewsCount: updatedReviews.length,
                rating: avgRating
              };
            }
            return p;
          })
        }));

        get().addToast({
          title: 'Review Submitted! ⭐',
          message: 'Thank you for rating your purchase on FTH Mart.',
          type: 'success'
        });
      },

      // --- UI & Global State ---
      isCartDrawerOpen: false,
      setCartDrawerOpen: (open) => set({ isCartDrawerOpen: open }),

      recentlyViewed: [],
      addRecentlyViewed: (product) => {
        const list = get().recentlyViewed.filter((p) => p.id !== product.id);
        set({ recentlyViewed: [product, ...list].slice(0, 10) });
      },

      announcementText: INITIAL_ANNOUNCEMENT,
      setAnnouncementText: (text) => set({ announcementText: text }),

      toasts: [],
      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const newToast = { id, duration: 4000, ...toast };
        set((state) => ({ toasts: [...state.toasts, newToast] }));
        setTimeout(() => {
          get().removeToast(id);
        }, newToast.duration);
      },
      removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }
    }),
    {
      name: 'fth_mart_storage_v4',
      version: 4,
      migrate: (persistedState) => {
        if (!persistedState || !persistedState.products || persistedState.products.length < 100) {
          return {
            ...persistedState,
            products: INITIAL_PRODUCTS,
            categories: INITIAL_CATEGORIES
          };
        }
        return persistedState;
      },
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        wishlist: state.wishlist,
        products: state.products,
        categories: state.categories,
        orders: state.orders,
        coupons: state.coupons,
        recentlyViewed: state.recentlyViewed,
        selectedShippingCity: state.selectedShippingCity
      })
    }
  )
);
