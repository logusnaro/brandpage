"use client";

import type { SocialLink } from "@/sanity/lib/types";
import { Footer } from "./Footer";
import { RevealLines } from "./RevealLines";
import { blankLarge, blankSoft, line } from "./richText";
import { contentShell, type as t } from "./type";

type ContactProps = {
  email: string;
  socialLinks: SocialLink[];
};

export function Contact({ email, socialLinks }: ContactProps) {
  const threads = socialLinks.find((link) => link.platform === "threads");

  return (
    <section
      id="contact"
      className="section-screen flex flex-col justify-center pt-16"
    >
      <div className={`${contentShell} flex flex-1 flex-col justify-center`}>
        <RevealLines
          lines={[
            { text: "CONTACT", className: t.label },
            blankSoft(),
            line("**log** little moments.", t.large),
            line("with **Us**.", t.large),
            blankLarge(),
            { text: "e-mail", className: t.small },
            {
              text: email,
              href: `mailto:${email}`,
              className: t.small,
            },
            blankSoft(),
            { text: "Threads", className: t.small },
            threads
              ? {
                  text: "@logus.naro",
                  href: threads.url,
                  external: true,
                  className: t.small,
                }
              : { text: "@logus.naro", className: t.small },
          ]}
          staggerMs={150}
          as="p"
        />
      </div>
      <div className={`${contentShell} pb-10 pt-8`}>
        <Footer />
      </div>
    </section>
  );
}
