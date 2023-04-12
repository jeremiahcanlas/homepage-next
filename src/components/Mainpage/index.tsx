import { Box, Text, Flex } from "@chakra-ui/react";
import Clock from "../Clock";
import Greet from "../Greet";
import Weather from "../Weather";
import styles from "./Mainpage.module.scss";

const Mainpage = () => {
  return (
    <Box className={styles.mainpageContainer}>
      <Flex flexDirection="column" className={styles.componentOne}>
        <Greet />
        <Clock />
      </Flex>
      <Flex>
        <Weather />
      </Flex>
    </Box>
  );
};

export default Mainpage;
