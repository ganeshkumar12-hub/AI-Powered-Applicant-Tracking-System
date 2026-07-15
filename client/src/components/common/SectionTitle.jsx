import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

function SectionTitle({ title, subtitle }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      sx={{
        textAlign: "center",
        mb: 6,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          maxWidth: 700,
          mx: "auto",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default SectionTitle;