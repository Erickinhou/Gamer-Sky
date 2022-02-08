import React from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import styles from "../../styles/PostSection.module.scss";

const PostSection = ({ posts }) => {
  const buildUrl = (image) => {
    const imgBuilder = imageUrlBuilder({
      projectId: "ejsram2b",
      dataset: "production",
    });
    return imgBuilder.image(image).url();
  };
  return (
    <>
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
    </>
  );
};

export default PostSection;
