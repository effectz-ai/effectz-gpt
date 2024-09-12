import { AdditionalApiKeys, ChatUi, KnowlegeUpload, ModelProvider, NavBar, RagConfig } from "@/components/admin";
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Home() {
  return (
      <ProtectedRoute adminOnly>
        <SimpleGrid columns={2} gap={6} >
          <GridItem maxH='100vh' overflowY='scroll'>
            <ModelProvider m={10} />
            <RagConfig m={10} />
            <KnowlegeUpload m={10} />
            <AdditionalApiKeys m={10} />
          </GridItem>
          <GridItem>
            <ChatUi m={10} p={6}/>
          </GridItem>
        </SimpleGrid>
      </ProtectedRoute>
  );
}
