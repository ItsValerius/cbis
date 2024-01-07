"use client";
import { MenuIcon, SplitIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "~/components/ui/sheet";

const MarketingHeader = () => {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-4 shadow">
      <Link className="flex items-center justify-center" href="/">
        <SplitIcon className="h-6 w-6" />
        <span className="sr-only">BillSplit</span>
      </Link>
      <NavigationMenu>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <NavigationMenuList className="flex flex-col">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <SheetClose>Home</SheetClose>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <SheetClose>Pricing</SheetClose>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <SheetClose>About</SheetClose>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <SheetClose>Contact</SheetClose>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <Button asChild variant="outline">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <SheetClose>Login</SheetClose>
                    </NavigationMenuLink>
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </SheetContent>
        </Sheet>
        <NavigationMenuList className="hidden md:flex">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <Button asChild variant="outline">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Login
                </NavigationMenuLink>
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default MarketingHeader;
