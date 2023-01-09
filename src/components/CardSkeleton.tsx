import React from "react";
import { Skeleton, VStack, HStack, Center, NativeBaseProvider } from "native-base";
import COLORS from '@config/colors'

const CardSkeleton = () => {
  return <Center w="100%" bg={COLORS.contentBg100} borderColor={COLORS.LineColor100} borderWidth={1} mb={5} borderRadius={6} pt={2} pb={5}>
      <HStack w="100%" maxW="100%" borderWidth="1" space={5} rounded="md" _dark={{
      borderColor: COLORS.LineColor200
    }} _light={{
      borderColor: COLORS.LineColor200
    }} p="4">
        <VStack flex="3" space="3">
          <Skeleton rounded="md" startColor={COLORS.contentBg400} />
          <Skeleton.Text startColor={COLORS.contentBg400} />
          <HStack space="2" alignItems="center">
            <Skeleton size="5" rounded="full" startColor={COLORS.contentBg400} />
            <Skeleton h="3" flex="2" rounded="full" startColor={COLORS.contentBg400} />
            <Skeleton h="3" flex="1" rounded="full" startColor={COLORS.contentBg400} />
          </HStack>
        </VStack>
      </HStack>
    </Center>;
};


export default CardSkeleton