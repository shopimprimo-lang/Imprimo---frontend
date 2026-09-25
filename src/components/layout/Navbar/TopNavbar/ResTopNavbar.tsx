import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer text-im-accent hover:text-im-gold transition-colors p-1" aria-label="Open menu">
        <FiMenu size={24} aria-hidden />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto bg-im-black border-r border-[rgba(201,166,70,0.2)] text-im-text" aria-describedby={undefined}>
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/imprimo-logo.png"
                  alt="Imprimo Trading"
                  width={300}
                  height={150}
                  className="object-contain w-[140px] h-[70px]"
                  unoptimized
                  priority
                />
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "MenuItem" && (
                <SheetClose asChild>
                  <Link href={item.url ?? "/"} className="mb-5 text-[17.6px] tracking-[1px] text-im-accent hover:text-im-gold transition-colors">
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === "MenuList" && (
                <div className="mb-4 w-full">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pb-0 border-l flex flex-col">
                        {item.children.map((itemChild, idx) => (
                          <SheetClose
                            key={itemChild.id}
                            asChild
                            className="w-fit py-2 text-base"
                          >
                            <Link href={itemChild.url ?? "/"}>
                              {itemChild.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
