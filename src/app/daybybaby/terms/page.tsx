import type { Metadata } from "next";
import { dayByBabyTerms } from "@/content/daybybaby/terms.ko";
import styles from "./terms.module.css";

export const metadata: Metadata = {
  title: "Day By Baby 이용약관 | logUs Studio",
  description: "Day By Baby 서비스 이용약관",
  alternates: { canonical: "/daybybaby/terms" },
  robots: { index: true, follow: true },
};

export default function DayByBabyTermsPage() {
  const terms = dayByBabyTerms;

  return (
    <main className={styles.page}>
      <article className={styles.document}>
        <header className={styles.header}>
          <p className={styles.product}>{terms.product}</p>
          <h1>{terms.documentTitle}</h1>
          <p className={styles.effectiveDate}>시행일: {terms.effectiveDate}</p>
        </header>

        <nav className={styles.contents} aria-label="이용약관 목차">
          <h2>목차</h2>
          <ol>
            {terms.articles.map((article) => (
              <li key={article.id}>
                <a href={`#${article.id}`}>{article.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.articles}>
          {terms.articles.map((article) => (
            <section id={article.id} key={article.id} className={styles.article}>
              <h2>
                <a href={`#${article.id}`} aria-label={`${article.title} 바로가기`}>
                  {article.title}
                </a>
              </h2>
              {article.blocks.map((block, blockIndex) =>
                block.type === "paragraph" ? (
                  <p key={blockIndex}>{block.text}</p>
                ) : block.ordered === false ? (
                  <ul
                    key={blockIndex}
                    className={`${styles.list} ${article.id === "article-16" ? styles.dashList : styles.parenthesizedList}`}
                  >
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : (
                  <ol key={blockIndex} start={block.start} className={`${styles.list} ${styles.numberedList}`}>
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                  </ol>
                ),
              )}
            </section>
          ))}

          <section className={styles.addendum} aria-labelledby="addendum-title">
            <h2 id="addendum-title">부칙</h2>
            <p>{terms.addendum}</p>
          </section>
        </div>

        <footer className={styles.footer}>Day By Baby by logUs Studio</footer>
      </article>
    </main>
  );
}
