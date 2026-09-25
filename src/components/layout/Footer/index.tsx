import { SocialNetworks } from "./footer.types";
import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaGlobe, FaFacebookF, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import LayoutSpacing from "./LayoutSpacing";

const INSTAGRAM_URL = "https://www.instagram.com/imprimoservice";
const FACEBOOK_URL = "https://www.facebook.com/share/1BxDmmLFBB/?mibextid=wwXIfr";
// Unconfirmed details stay out of the code: set in .env once verified.
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const socialsData: (SocialNetworks & { label: string })[] = [
  { id: 1, label: "Instagram", icon: <FaInstagram />, url: INSTAGRAM_URL },
  { id: 2, label: "Facebook", icon: <FaFacebookF />, url: FACEBOOK_URL },
];

const quickLinks = [
  { label: "Home", url: "/" },
  { label: "About Us", url: "/about" },
  { label: "Contact", url: "/#contact" },
];

const contactItems = [
  { icon: <FaMapMarkerAlt />, label: "Address", text: "Lusail Marina 50, 5th Floor, Doha, Qatar" },
  { icon: <FaPhoneAlt />, label: "Phone", text: "+974 3336 7169", href: "tel:+97433367169" },
  ...(CONTACT_EMAIL ? [{ icon: <FaEnvelope />, label: "Email", text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` }] : []),
  { icon: <FaGlobe />, label: "Website", text: "imprimotrading.com", href: "https://imprimotrading.com" },
];

const headingCls = "font-heading text-lg font-semibold text-im-gold tracking-[1px] mb-3 pb-2 border-b border-[rgba(201,166,70,0.35)] w-fit";

const Footer = () => {
  return (
    <footer className="bg-im-velvet border-t border-[rgba(201,166,70,0.1)] text-im-text/80 font-light px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto pt-8 pb-5 sm:pt-12 sm:pb-6">
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-10">
          {/* Brand & socials */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/images/imprimo-logo.png"
                alt="Imprimo Trading"
                width={300}
                height={150}
                className="object-contain w-[130px] sm:w-[150px] h-auto"
                unoptimized
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-4">
              Premium printing, personalized gifts, corporate gifting and packaging —
              crafted in Doha with attention to every detail.
            </p>
            <div className="flex items-center gap-3">
              {socialsData.map((social) => (
                <Link
                  href={social.url}
                  key={social.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-[rgba(212,175,55,0.45)] flex items-center justify-center text-im-gold hover:bg-im-gold hover:text-black hover:border-im-gold transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h4 className={headingCls}>Quick Links</h4>
            {/* One row on phones, a column from sm up */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:flex-col sm:gap-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.url} className="hover:text-im-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact" className="lg:col-span-4 scroll-mt-24">
            <h4 className={headingCls}>Contact Details</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm">
              {contactItems.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <span className="text-im-gold mt-[3px] flex-shrink-0 text-[13px]" aria-hidden>{c.icon}</span>
                  <span className="sr-only">{c.label}: </span>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-im-gold transition-colors">
                      {c.text}
                    </a>
                  ) : (
                    <span>{c.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="border-t border-[rgba(201,166,70,0.15)] pt-4 sm:pt-5 text-xs text-im-muted">
          © {new Date().getFullYear()} Imprimo Trading. All rights reserved.
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
