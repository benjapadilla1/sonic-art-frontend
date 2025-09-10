'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/stores/useAuthStore';
import { useCartStore } from '@/stores/useCartStore';
import axios from 'axios';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

const typeColors: Record<string, string> = {
  course: 'bg-blue-100 text-blue-700',
  samplePack: 'bg-purple-100 text-purple-700',
};

export function CartSheet() {
  const { items, total, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/paypal/create-order`,
        { items, userId: user?.uid },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { href } = res.data;
      if (href) {
        window.location.href = href;
      }
    } catch (error) {
      console.error('Error al crear la orden de PayPal:', error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="hover:bg-ctas relative">
          <ShoppingCart className="h-5 w-5 text-white" />
          {items.length > 0 && (
            <span className="bg-ctas absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-secondaryLight flex w-[400px] flex-col p-5">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Tu carrito</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex-1 space-y-4 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No tienes productos en el carrito</p>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.coverImageUrl ?? '/placeholder.jpg'}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                    <Badge
                      className={`${typeColors[item.type] || 'bg-gray-100 text-gray-600'} mt-1`}
                    >
                      {item.type === 'course' ? 'Curso' : 'Sample Pack'}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total:</span>
              <span className="text-ctas text-lg">${total()}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="destructive" className="flex-1" onClick={clearCart}>
                Vaciar carrito
              </Button>
              <Button className="bg-ctas flex-1 text-white" onClick={handleCheckout}>
                Ir a pagar
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
