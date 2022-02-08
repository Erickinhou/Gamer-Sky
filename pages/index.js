import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Footer from "../components/Footer";
import PostSection from "../components/PostSection";

export async function getStaticProps() {
  const query = encodeURIComponent(
    `*[ _type == "post" ]{ title, mainImage, slug, author->{name} }`
  );
  const url = `https://ejsram2b.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const posts = result.result;
  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Gamer Sky</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={styles.header}>
        <div className={styles.textWrapper}>
          <div>
            <h1>Gamer Sky</h1>
            <span>The best gamer blog site</span>
          </div>
        </div>
      </header>
      <section>
        <h2 style={{ textAlign: "center" }}>{">> Latest Posts"}</h2>
        <PostSection posts={posts} />
      </section>
      <Footer />
    </>
  );
}
