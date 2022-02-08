import Head from "next/head";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import styles from "../styles/Home.module.scss";
import Footer from "../components/Footer";

export async function getStaticProps() {
  const query = encodeURIComponent(
    `*[ _type == "post" ]{ title, mainImage, author->{name} }`
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
  console.log("posts ->", posts);

  const buildUrl = (image) => {
    const imgBuilder = imageUrlBuilder({
      projectId: "ejsram2b",
      dataset: "production",
    });
    return imgBuilder.image(image).url();
  };

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
      <h2 style={{ textAlign: "center" }}>{">> Latest Posts"}</h2>
      {posts.map(({ title, author, mainImage }) => (
        <div className={styles.postWrapper} key={title}>
          <div className={styles.imageWrapper}>
            <Image
              objectFit="cover"
              objectPosition={"center top"}
              src={buildUrl(mainImage)}
              alt={title}
              layout="fill"
            />
          </div>
          <div className={styles.textWrapper}>
            <h2>{title}</h2>
            <span>author: {author.name}</span>
          </div>
        </div>
      ))}
      <Footer />
    </>
  );
}
