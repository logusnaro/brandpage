import type { Metadata } from "next";
import { dayByBabyPrivacy } from "@/content/daybybaby/privacy.ko";
import styles from "../terms/terms.module.css";

export const metadata: Metadata = {
  title: "Day By Baby 개인정보 처리방침 | logUs Studio",
  description: "Day By Baby 개인정보 처리방침",
  alternates: { canonical: "/daybybaby/privacy" },
  robots: { index: true, follow: true },
};

const listClassNames = {
  decimal: styles.numberedList,
  parenthesized: styles.parenthesizedList,
  dash: styles.dashList,
};

export default function DayByBabyPrivacyPage() {
  const privacy = dayByBabyPrivacy;

  return (
    <main className={styles.page}>
      <article className={styles.document}>
        <header className={styles.header}>
          <p className={styles.product}>{privacy.product}</p>
          <h1>{privacy.documentTitle}</h1>
          <p className={styles.effectiveDate}>시행일: {privacy.effectiveDate}</p>
        </header>

        <div className={styles.introduction}>
          {privacy.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <nav className={styles.contents} aria-label="개인정보 처리방침 목차">
          <h2>목차</h2>
          <ol>
            {privacy.articles.map((article) => (
              <li key={article.id}><a href={`#${article.id}`}>{article.title}</a></li>
            ))}
          </ol>
        </nav>

        <div className={styles.articles}>
          {privacy.articles.map((article) => (
            <section id={article.id} key={article.id} className={styles.article}>
              <h2><a href={`#${article.id}`} aria-label={`${article.title} 바로가기`}>{article.title}</a></h2>
              {article.blocks.map((block, index) => block.type === "paragraph" ? (
                block.text.startsWith("https://") ? (
                  <p key={index}><a href={block.text}>{block.text}</a></p>
                ) : <p key={index}>{block.text}</p>
              ) : block.marker === "decimal" ? (
                <ol key={index} className={`${styles.list} ${listClassNames[block.marker]}`}>
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ol>
              ) : (
                <ul key={index} className={`${styles.list} ${listClassNames[block.marker]}`}>
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ))}
            </section>
          ))}

          <section className={styles.addendum} aria-labelledby="privacy-addendum-title">
            <h2 id="privacy-addendum-title">부칙</h2>
            <p>{privacy.addendum}</p>
          </section>
        </div>

        <footer className={styles.footer}>Day By Baby by logUs Studio</footer>
      </article>
    </main>
  );
}
