import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { BlogCardWrapper } from ".";

export const SkeletonBlogCard = () => {
  return (
    <BlogCardWrapper>
      <Skeleton
        height={200}
        borderBottomRightRadius={0}
        borderBottomLeftRadius={0}
      />
      <Stack p={4} px={6} gap={4}>
        <SkeletonText noOfLines={1} h={6} width="80%" />
        <SkeletonText noOfLines={1} h={20} />
        <Stack>
          <SkeletonText noOfLines={1} w={20} h={5} />
          <SkeletonText noOfLines={1} width="50%" h={5} />
        </Stack>
      </Stack>
    </BlogCardWrapper>
  );
};
