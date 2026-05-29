import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="ml-60 border-t py-6 flex items-center justify-center"
      style={{
        borderColor: "var(--color-border)",
      }}
    >
      <p
        // className="tracking-wide"
        style={{ color: "var(--color-text-primary)" }}
      >
        © {new Date().getFullYear()} Anurag Vaidya. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
