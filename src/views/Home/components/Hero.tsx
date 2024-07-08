import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";
import darth from "../../../assets/darth.png";
import { ArrowDownIcon } from "@chakra-ui/icons";

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
      <Heading
        zIndex={1}
        fontWeight={900}
        justifySelf="center"
        fontSize={{ base: "4rem", lg: "6rem" }}
        textTransform="uppercase"
        pos="absolute"
        left="50%"
        width="max-content"
        transform="translateX(-50%)"
      >
        Explore the galaxy
      </Heading>
      <Box mr={{ base: 4, lg: 12 }} ml="auto" alignSelf="stretch" w="1px" bgColor="white"></Box>

      <Text fontSize="xl" zIndex={1} pos="absolute" bottom={20} left={"50%"} transform={"translateX(-50%)"}>
        Scroll
        <ArrowDownIcon ml={2} />
      </Text>
    </Flex>
  );
};
