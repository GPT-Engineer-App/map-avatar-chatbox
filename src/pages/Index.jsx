import React, { useState } from "react";
import { Box, Text, VStack, HStack, Avatar, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Input, IconButton } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaTimes, FaPaperPlane } from "react-icons/fa";

const MapPlaceholder = () => <Box width="100%" height="500px" bg="gray.200" />;

const users = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzA5Njc4MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080",
    position: { top: "20%", left: "30%" },
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MDk2NzgzOTJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    position: { top: "40%", left: "50%" },
  },
  // Add more users with positions here
];

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState("");
  const [chatHistory, setChatHistory] = useState({});

  const openChat = (user) => {
    setSelectedUser(user);
    setMessages("");
    onOpen();
  };

  const sendMessage = () => {
    if (messages.trim()) {
      const newChatHistory = {
        ...chatHistory,
        [selectedUser.id]: [...(chatHistory[selectedUser.id] || []), messages.trim()],
      };
      setChatHistory(newChatHistory);
      setMessages("");
    }
  };

  return (
    <Box position="relative" p={5}>
      <MapPlaceholder />
      {/* User Avatars on the Map */}
      {users.map((user) => (
        <IconButton key={user.id} icon={<FaMapMarkerAlt />} colorScheme="red" variant="ghost" position="absolute" top={user.position.top} left={user.position.left} aria-label={`Marker for ${user.name}`} onClick={() => openChat(user)}>
          <Avatar name={user.name} src={user.avatar} size="sm" />
        </IconButton>
      ))}
      {/* Chat Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Chat with {selectedUser ? selectedUser.name : ""}
            <IconButton aria-label="Close Chat" icon={<FaTimes />} onClick={onClose} size="sm" position="absolute" right="8px" top="8px" />
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {selectedUser &&
                chatHistory[selectedUser.id]?.map((message, index) => (
                  <HStack key={index} justify="flex-start">
                    <Text>{message}</Text>
                  </HStack>
                ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack width="full">
              <Input value={messages} onChange={(e) => setMessages(e.target.value)} placeholder="Type a message..." />
              <IconButton aria-label="Send Message" icon={<FaPaperPlane />} onClick={sendMessage} />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
