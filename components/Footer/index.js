import React from "react";
import { BsFacebook, BsTwitch, BsTwitter, BsInstagram } from "react-icons/bs";
import styles from "../../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div>
        <BsFacebook className={styles.icon} size={20} />
        <BsTwitch className={styles.icon} size={20} />
        <BsInstagram className={styles.icon} size={20} />
        <BsTwitter className={styles.icon} size={20} />
      </div>
    </div>
  );
};

export default Footer;
