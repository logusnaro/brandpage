"use client";

import { RevealLines } from "./RevealLines";
import { blankLarge, line } from "./richText";
import { contentShell, type as t } from "./type";

/**
 * Spacing rhythm (all pages):
 * - label → title: soft (1)
 * - title → body / next block: large (1)
 * - stanza / field groups: soft (1)
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="section-screen relative flex flex-col justify-center pt-16"
    >
      <div className={contentShell}>
        <RevealLines
          lines={[
            line("logUs Studio[:]", t.large),
            blankLarge(),
            line("The **little things** become your story.", t.smallItalic),
          ]}
          staggerMs={180}
          as="p"
        />
      </div>
    </section>
  );
}
