import React, { useState } from "react";
import {
  Box,
  Input,
  HStack,
  Text,
  VStack,
  Separator,
  Em,
  Link,
} from "@chakra-ui/react";
import { Button } from "./components/ui/button";
import { Tooltip } from "./components/ui/tooltip";

interface Topic {
  id: string;
  display_name: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Topic[] | null>(null);

  const handleSearch = async () => {
    try {
      if (!query) {
        setResults(null);
        return;
      }
      const response = await fetch(
        `https://api.openalex.org/topics?search=${query}`
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  };

  return (
    <HStack
      minHeight={"100vh"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      spaceX={0}
      pt={10}
    >
      <Box display={"flex"} justifyContent={"center"} width={"40vw"}>
        <VStack spaceY={4} alignItems={"flex-start"}>
          <Text fontSize="3xl" fontWeight="bold">
            Search Topics
          </Text>
          <HStack alignItems={"center"}>
            <Input
              placeholder="Enter a topic to search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              minWidth="300px"
              mr={2}
              aria-label="Search Input"
            />
            <Button onClick={handleSearch}>Search</Button>
          </HStack>
        </VStack>
      </Box>
      <Separator orientation={"vertical"} size={"lg"} height={700} />
      {results ? (
        <Box
          p={4}
          border="1px solid #ccc"
          borderRadius="md"
          width="40vw"
          height={"60vh"}
          overflowY={"auto"}
        >
          <Text
            justifySelf={"center"}
            fontWeight="bold"
            fontSize={"2xl"}
            mb={4}
          >
            Results:
          </Text>
          {results.length > 0 ? (
            results.map((topic, idx) => (
              <div key={topic.id}>
                {idx > 0 && <Separator size={"md"} my={1} />}
                <Tooltip
                  content={"View in OpenAlex"}
                  openDelay={200}
                  closeDelay={50}
                >
                  <Link
                    href={topic.id}
                    target="_blank"
                    rel={"noopener noreferrer"}
                  >
                    {topic.display_name}
                  </Link>
                </Tooltip>
              </div>
            ))
          ) : (
            <Text>No results found.</Text>
          )}
        </Box>
      ) : (
        <Box
          p={4}
          border="1px solid #ccc"
          borderRadius="md"
          width="40vw"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"60vh"}
        >
          <Em color={"#555555"} fontSize={"5xl"}>
            Search for a topic!
          </Em>
        </Box>
      )}
    </HStack>
  );
};

export default Search;
