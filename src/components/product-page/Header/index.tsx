"use client";

import React, { useState } from "react";
import PhotoSection from "./PhotoSection";
import { Product, ProductVariant, SizeOption } from "@/types/product.types";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import AddToCardSection from "./AddToCardSection";
import { IoMdCheckmark } from "react-icons/io";

const colorMap: Record<string, string> = {
  "sage green": "#8a9a86",
  "sage": "#8a9a86",
  "coffee brown": "#4b3621",
  "coffee": "#4b3621",
  "mauve pink": "#e0b0ff",
  "mauve": "#e0b0ff",
  "olive beige": "#a89f91",
  "olive": "#808000",
  "beige": "#f5f5dc",
  "navy blue": "#000080",
  "navy": "#000080",
  "sky blue": "#87ceeb",
  "mustard yellow": "#ffdb58",
  "mustard": "#ffdb58",
  "dusty pink": "#dcaebb",
  "dusty rose": "#cca0ac",
  "wine red": "#722f37",
  "wine": "#722f37",
  "burgundy": "#800020",
  "charcoal grey": "#36454f",
  "charcoal gray": "#36454f",
  "charcoal": "#36454f",
  "cream": "#fffdd0",
  "khaki": "#c3b091",
  "camel": "#c19a6b",
  "rust": "#b7410e",
  "terracotta": "#e2725b",
  "teal": "#008080",
  "lavender": "#e6e6fa",
  "lilac": "#c8a2c8",
  "peach": "#ffdab9",
  "coral": "#ff7f50",
  "mint green": "#98ff98",
  "mint": "#98ff98",
  "apricot": "#fbceb1",
  "emerald green": "#50c878",
  "emerald": "#50c878",
  "forest green": "#228b22",
  "olive green": "#bab86c",
  "maroon": "#800000",
  "bronze": "#cd7f32",
  "copper": "#b87333",
  "tan": "#d2b48c",
};

const getValidColor = (colorName: string): string => {
  if (!colorName) return "#ccc";
  const clean = colorName.trim().toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ");
  if (/^#([0-9a-f]{3}){1,2}$/i.test(clean)) return colorName;
  if (colorMap[clean]) return colorMap[clean];
  if (clean.includes("red")) return "#ff0000";
  if (clean.includes("blue")) return "#0000ff";
  if (clean.includes("green")) return "#008000";
  if (clean.includes("yellow")) return "#ffff00";
  if (clean.includes("pink")) return "#ffc0cb";
  if (clean.includes("brown")) return "#a52a2a";
  if (clean.includes("orange")) return "#ffa500";
  if (clean.includes("purple")) return "#800080";
  if (clean.includes("grey") || clean.includes("gray")) return "#808080";
  if (clean.includes("black")) return "#000000";
  if (clean.includes("white")) return "#ffffff";
  if (clean.includes("gold")) return "#ffd700";
  if (clean.includes("silver")) return "#c0c0c0";
  if (clean.includes("beige")) return "#f5f5dc";
  if (clean.includes("wooden") || clean.includes("wood")) return "#8B5A2B";
  return colorName;
};

const Header = ({ data }: { data: Product }) => {
  const variants = data.variants ?? [];
  const availableModels = Array.from(
    new Set(variants.flatMap(v => (v.modelName || "").split(",").map(m => m.trim()).filter(Boolean)))
  ) as string[];
  const [selectedModel, setSelectedModel] = useState<string>(availableModels[0] || "");
  const selectedModelActual = availableModels.includes(selectedModel) ? selectedModel : (availableModels[0] || "");

  const validColorsForModel = Array.from(
    new Set(
      variants
        .filter(v => !selectedModelActual || (v.modelName || "").split(",").map(m => m.trim()).includes(selectedModelActual))
        .flatMap(v => (v.color || "").split(",").map(c => c.trim()).filter(Boolean))
    )
  ) as string[];
  const [selectedColor, setSelectedColor] = useState<string>(validColorsForModel[0] || "");
  const selectedColorActual = validColorsForModel.includes(selectedColor) ? selectedColor : (validColorsForModel[0] || "");

  const activeVariant = variants.find(v => 
    (!selectedModelActual || (v.modelName || "").split(",").map(m => m.trim()).includes(selectedModelActual)) &&
    (!selectedColorActual || (v.color || "").split(",").map(c => c.trim()).includes(selectedColorActual))
  ) || variants[0] || null;

  const validSizesForVariant = activeVariant?.sizesArray || [];
  const validSizeNames = validSizesForVariant.map(s => s.size);
  const [selectedSize, setSelectedSize] = useState<string>(validSizeNames[0] || "");
  const selectedSizeActual = validSizeNames.includes(selectedSize) ? selectedSize : (validSizeNames[0] || "");
  const activeSizeObj = validSizesForVariant.find(s => s.size === selectedSizeActual);

  const displayPrice = activeSizeObj?.price || activeVariant?.price || data.price;
  const displayImages = activeVariant?.images?.length
    ? activeVariant.images
    : data.gallery ?? [];
  const displaySrc = displayImages[0] || data.srcUrl;

  const displayProduct: Product = {
    ...data,
    srcUrl: displaySrc,
    gallery: displayImages,
    price: displayPrice,
  };

  // attributes passed to cart: selected model, color, and size (if they exist)
  const cartAttributes = [selectedModelActual, selectedColorActual, selectedSizeActual].filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <PhotoSection data={displayProduct} />
      </div>
      <div>
        {/* Title */}
        <h1 className="font-heading text-[28px] md:text-[40px] font-bold text-im-gold tracking-[1px] leading-tight md:leading-[48px] mb-3 md:mb-3.5 break-words">
          {data.title}
        </h1>

        {/* Price & Stock & SKU */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="font-bold text-im-text text-2xl sm:text-[32px]">
              QAR {displayPrice}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <span className={cn("px-2.5 py-1 text-xs uppercase tracking-[1.5px] font-normal", activeSizeObj && activeSizeObj.stock > 0 ? "text-im-gold border border-[rgba(212,175,55,0.45)]" : activeVariant && activeVariant.stock > 0 ? "text-im-gold border border-[rgba(212,175,55,0.45)]" : "text-im-muted border border-white/20")}>
              {(activeSizeObj && activeSizeObj.stock > 0) || (!activeSizeObj && activeVariant && activeVariant.stock > 0) ? "In Stock" : "Out of Stock"}
            </span>
            {/* <span className="text-im-muted flex items-center gap-1">
              🚚 Estimated Delivery: 3-5 Days
            </span> */}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-im-text/85 font-light leading-relaxed mb-5">
          {data.description ||
            "This product is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}
        </p>

        <hr className="h-[1px] border-t-im-rich/20 mb-5" />

        {/* Model Picker */}
        {availableModels.length > 0 && (
          <React.Fragment>
            <div className="flex flex-col mb-5">
              <span className="text-xs sm:text-sm uppercase tracking-[2px] text-im-muted mb-4">
                Choose Model
              </span>
              <div className="flex items-center flex-wrap gap-3">
                {availableModels.map((model) => {
                  const isSelected = selectedModelActual === model;
                  return (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={cn(
                        "px-6 py-3 text-sm font-medium uppercase tracking-[1px] transition-all border",
                        isSelected
                          ? "bg-im-gold text-black border-im-gold"
                          : "bg-transparent text-im-text border-[rgba(201,166,70,0.3)] hover:border-im-gold hover:text-im-gold"
                      )}
                    >
                      {model.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="h-[1px] border-t-im-rich/20 mb-5" />
          </React.Fragment>
        )}

        {/* Color Picker */}
        {validColorsForModel.length > 0 && (
          <React.Fragment>
            <div className="flex flex-col mb-5">
              <span className="text-xs sm:text-sm uppercase tracking-[2px] text-im-muted mb-4">
                Choose Color
              </span>
              <div className="flex items-center flex-wrap gap-3">
                {validColorsForModel.map((colorRaw) => {
                  const [colorName, colorHex] = colorRaw.includes("|") ? colorRaw.split("|") : [colorRaw, getValidColor(colorRaw)];
                  const isSelected = selectedColorActual === colorRaw;
                  return (
                    <button
                      key={colorRaw}
                      type="button"
                      title={colorName.toUpperCase()}
                      onClick={() => setSelectedColor(colorRaw)}
                      className={cn(
                        "w-10 h-10 rounded-full transition-all border-2",
                        isSelected
                          ? "border-im-gold shadow-md scale-110"
                          : "border-im-rich/30 hover:scale-105"
                      )}
                      style={{ backgroundColor: colorHex }}
                    />
                  );
                })}
              </div>
            </div>
            <hr className="h-[1px] border-t-im-rich/20 mb-5" />
          </React.Fragment>
        )}

        {/* Size Picker */}
        {validSizeNames.length > 0 && (
          <React.Fragment>
            <div className="flex flex-col mb-5">
              <span className="text-xs sm:text-sm uppercase tracking-[2px] text-im-muted mb-4">
                Choose {activeVariant?.sizeName || "Size"}
              </span>
              <div className="flex items-center flex-wrap gap-3">
                {validSizeNames.map((sizeName) => {
                  const isSelected = selectedSizeActual === sizeName;
                  return (
                    <button
                      key={sizeName}
                      type="button"
                      onClick={() => setSelectedSize(sizeName)}
                      className={cn(
                        "px-6 py-3 text-sm font-medium uppercase tracking-[1px] transition-all border",
                        isSelected
                          ? "bg-im-gold text-black border-im-gold"
                          : "bg-transparent text-im-text border-[rgba(201,166,70,0.3)] hover:border-im-gold hover:text-im-gold"
                      )}
                    >
                      {sizeName.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
            <hr className="h-[1px] border-t-im-rich/20 mb-5" />
          </React.Fragment>
        )}

        {/* Active Variant Details */}
        {activeVariant && activeVariant.description && (
          <>
            <div className="mb-5 card-luxe p-4 text-left">
              <h4 className="text-xs font-semibold text-im-text/55 uppercase tracking-wider mb-1">Variant Details</h4>
              <p className="text-sm text-im-text/80">{activeVariant.description}</p>
            </div>
            <hr className="h-[1px] border-t-im-rich/20 mb-5" />
          </>
        )}

        {/* Amenities Section */}
        {data.amenities && data.amenities.length > 0 && (
          <>
            <div className="mb-5 flex flex-col">
              <span className="font-heading text-base sm:text-lg font-semibold text-im-gold mb-3">Amenities & Features</span>
              <div className="flex flex-wrap gap-2">
                {data.amenities.map((amenity, idx) => {
                  const amName = typeof amenity === 'string' ? amenity : (amenity as any).name || 'Amenity';
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 border border-[rgba(212,175,55,0.4)] text-im-text text-sm font-light"
                    >
                      <IoMdCheckmark className="text-im-gold" />
                      {amName}
                    </div>
                  );
                })}
              </div>
            </div>
            <hr className="h-[1px] border-t-im-rich/20 mb-5" />
          </>
        )}

        <AddToCardSection data={displayProduct} attributes={cartAttributes} />
      </div>
    </div>
  );
};

export default Header;
