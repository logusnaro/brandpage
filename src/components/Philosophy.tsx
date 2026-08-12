"use client";

import { RevealLines } from "./RevealLines";
import { blankLarge, blankSoft, line } from "./richText";
import { contentShell, type as t } from "./type";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="section-screen paper-texture flex flex-col justify-center pt-16"
    >
      <div className={contentShell}>
        <RevealLines
          lines={[
            { text: "PHILOSOPHY", className: t.label },
            blankSoft(),
            line("Little things. Lasting stories.", t.large),
            blankLarge(),
            line("We don't build products", t.smallItalic),
            line("to make people do **more**.", t.smallItalic),
            blankSoft(),
            line("We build products", t.smallItalic),
            line("that help people **remember** more.", t.smallItalic),
            blankSoft(),
            line("Because every little moment", t.smallItalic),
            line("deserves to be **remembered**.", t.smallItalic),
          ]}
          staggerMs={150}
          as="p"
        />
      </div>
    </section>
  );
}
