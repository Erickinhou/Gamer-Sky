import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import styles from "../../styles/Post.module.scss";

export const Post = ({ title, body, image, author }) => {
  const [imageUrl, setImageUrl] = useState("");

  useState(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "ejsram2b",
      dataset: "production",
    });
    console.log(imageUrl);
    setImageUrl(imgBuilder.image(image).url());
  }, [image]);

  return (
    <div>
      <Head>
        <title>Gamer Sky - {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.textWrapper}>
            <h1>{title}</h1>
            <h2>author: {author.name}</h2>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.mainImage}
              layout="fill"
              objectFit="cover"
              objectPosition="center top"
              src={imageUrl}
              alt={title}
            />
          </div>
        </div>

        <article className={styles.body}>
          <BlockContent blocks={body} />
        </article>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}" ]{body[]{ ..., asset->{ ..., "_key": _id } }, title, mainImage, author->{name} }`
  );
  const url = `https://ejsram2b.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      body: post.body,
      title: post.title,
      image: post.mainImage,
      author: post.author,
    },
  };
};

export default Post;
