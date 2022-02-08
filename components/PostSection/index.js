import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import styles from "../../styles/PostSection.module.scss";
import Link from "next/link";
const PostSection = ({ posts }) => {
  const router = useRouter();

  const buildUrl = (image) => {
    const imgBuilder = imageUrlBuilder({
      projectId: "ejsram2b",
      dataset: "production",
    });
    return imgBuilder.image(image).url();
  };
  return (
    <>
      {posts.map(({ title, author, mainImage, slug }) => (
        <div
          className={styles.postWrapper}
          key={title}
          onClick={() => router.push(`/post/${encodeURI(slug.current)}`)}
        >
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
    </>
  );
};

export default PostSection;
