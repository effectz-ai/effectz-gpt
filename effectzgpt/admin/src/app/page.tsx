import { AdditionalApiKeys, ChatUi, KnowlegeUpload, ModelProvider, NavBar, RagConfig } from "@/components";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

export default function Home() {
  return (
    <SimpleGrid columns={2} gap={6} >
      <GridItem maxH='100vh' overflowY='scroll'>
        <ModelProvider m={10} />
        <RagConfig m={10} />
        <KnowlegeUpload m={10} />
        <AdditionalApiKeys m={10} />
      </GridItem>
      <GridItem>
        <ChatUi />
      </GridItem>
    </SimpleGrid>
  );
}
