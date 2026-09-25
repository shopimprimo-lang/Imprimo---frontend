"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "@/lib/features/filters/filtersSlice";
import type { RootState } from "@/lib/store";

const PriceSection = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector(
    (state: RootState) => state.filters.priceRange
  );
  const [localPrice, setLocalPrice] = useState(priceRange);

  useEffect(() => {
    setLocalPrice(priceRange);
  }, [priceRange]);

  const handlePriceChange = (value: number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setLocalPrice([value[0], value[1]]);
      dispatch(setPriceRange([value[0], value[1]]));
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-im-text font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            value={localPrice}
            onValueChange={handlePriceChange}
            min={0}
            max={5000}
            step={1}
            label="QAR"
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-im-text/55 font-medium">Min</span>
              <span className="text-base font-semibold text-im-text font-mono">
                QAR {localPrice[0]?.toString().padStart(4, "0")}
              </span>
            </div>
            <span className="text-im-text/55">-</span>
            <div className="flex flex-col text-right">
              <span className="text-xs text-im-text/55 font-medium">Max</span>
              <span className="text-base font-semibold text-im-text font-mono">
                QAR {localPrice[1]?.toString().padStart(4, "0")}
              </span>
            </div>
          </div>
          <div className="mb-3" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
