import { Box, Text, Flex } from "@chakra-ui/react";
import Clock from "../Clock";
import Greet from "../Greet";
import styles from "./Mainpage.module.scss";

const Mainpage = () => {
  return (
    <Box className={styles.mainpageContainer}>
      <Flex>
        <Greet />
        <Clock />
      </Flex>
    </Box>
  );
};

export default Mainpage;
