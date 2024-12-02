import React, { useState } from "react";
import { Box, Input, VStack, Text } from "@chakra-ui/react";
import { Button } from "./components/ui/button";

interface Topic {
  id: string;
  display_name: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Topic[] | null>(null);

  const handleSearch = async () => {
    try {
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
    <VStack spaceX={4} pt={10}>
      <Text fontSize="2xl" fontWeight="bold">
        Search Topics
      </Text>
      <Box>
        <Input
          placeholder="Enter a topic to search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          width="300px"
          mr={2}
          aria-label="Search Input"
        />
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {results && (
        <Box
          mt={4}
          p={4}
          border="1px solid #ccc"
          borderRadius="md"
          width="300px"
        >
          <Text fontWeight="bold">Results:</Text>
          {results.length > 0 ? (
            results.map((topic) => (
              <Text key={topic.id}>{topic.display_name}</Text>
            ))
          ) : (
            <Text>No results found.</Text>
          )}
        </Box>
      )}
    </VStack>
  );
};

export default Search;
