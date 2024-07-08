import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import darth from "../../../assets/darth.png";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const AnimatedHeading = motion(Heading);
const AnimatedText = motion(Text);
export const Hero = () => {
  return (
    <Flex
      as="section"
      overflow="hidden"
      w="full"
      minH="100vh"
      bg="red.500"
      alignItems="center"
      py={20}
      pos="relative"
      _after={{
        content: `""`,
        width: "full",
        height: "full",
        bgImage: darth,
        pos: "absolute",
        top: 0,
        left: 0,
        bgSize: "100%",
        bgPosition: "center",
        bgRepeat: "no-repeat",
        mixBlendMode: "multiply"
      }}
    >
      <Box zIndex={1} ml={{ base: 4, lg: 12 }} alignSelf="stretch" w="1px" bgColor="white"></Box>
      <AnimatedHeading
        initial={{ opacity: 0, y: 200, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.5 }}
        zIndex={1}
        fontWeight={900}
        fontSize={{ base: "2rem", lg: "6rem" }}
        textTransform="uppercase"
        pos="absolute"
        left="50%"
        width="max-content"
      >
        Explore the galaxy
      </AnimatedHeading>
      <Box mr={{ base: 4, lg: 12 }} ml="auto" alignSelf="stretch" w="1px" bgColor="white"></Box>

      <AnimatedText
        animate={{ y: 0, x: "-50%" }}
        initial={{ y: -10, x: "-50%" }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.7, bounce: 0.25 }}
        fontSize="xl"
        zIndex={1}
        pos="absolute"
        bottom={20}
        left={"50%"}
      >
        Scroll
        <ArrowDownIcon ml={2} />
      </AnimatedText>
    </Flex>
  );
};
