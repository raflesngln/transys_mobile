import React from "react";
import { Skeleton, VStack, HStack, Center, NativeBaseProvider } from "native-base";
import COLORS from '@config/colors'

const CardSkeleton = () => {
  return <Center w="100%" bg="transparent" borderColor="#dcdede" borderWidth={1} mb={5} borderRadius={6} pt={2} pb={5}>
      <HStack w="100%" maxW="100%" borderWidth="1" space={5} rounded="md" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }} p="4">
        <VStack flex="3" space="3">
          <Skeleton rounded="md" startColor={COLORS.IconBg} />
          <Skeleton.Text startColor={COLORS.IconBg} />
          <HStack space="2" alignItems="center">
            <Skeleton size="5" rounded="full" startColor={COLORS.IconBorder} />
            <Skeleton h="3" flex="2" rounded="full" startColor={COLORS.IconBorder} />
            <Skeleton h="3" flex="1" rounded="full" startColor={COLORS.IconBorder} />
          </HStack>
        </VStack>
      </HStack>
    </Center>;
};


export default CardSkeleton