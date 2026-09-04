"use client";

import { RevealLines } from "./RevealLines";
import { blankLarge, blankSoft, line } from "./richText";
import { contentShell, type as t } from "./type";

export function Studio() {
  return (
    <section
      id="studio"
      className="section-screen paper-texture flex flex-col justify-center pt-16"
    >
      <div className={contentShell}>
        <RevealLines
          lines={[
            { text: "STUDIO", className: t.label },
            blankSoft(),
            line("We are logUs Studio.", t.large),
            blankLarge(),
            line("We build **small**", t.smallItalic),
            line("digital products", t.smallItalic),
            line("for **everyday life**.", t.smallItalic),
            blankSoft(),
            line("Simple.", t.smallItalic),
            line("Useful.", t.smallItalic),
            line("Made to last.", t.smallItalic),
          ]}
          staggerMs={150}
          as="p"
        />
      </div>
    </section>
  );
}
