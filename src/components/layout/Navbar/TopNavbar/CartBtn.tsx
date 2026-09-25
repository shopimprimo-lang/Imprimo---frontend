"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  const { cart } = useAppSelector((state: RootState) => state.carts);

  return (
    <Link href="/cart" className="relative p-1 flex items-center justify-center" aria-label="Cart">
      <FiShoppingCart className="text-im-accent hover:text-im-gold transition-colors" size={22} aria-hidden />
      {cart && cart.totalQuantities > 0 && (
        <span className="bg-im-gold text-black rounded-full min-w-[18px] h-[18px] px-1 text-[11px] leading-[18px] text-center font-semibold absolute -top-2 -right-2">
          {cart.totalQuantities}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
