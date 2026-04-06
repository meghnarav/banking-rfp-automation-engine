package com.bank.rfp.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

@Service
public class DraftingService {
    private final ChatClient chatClient;

    public DraftingService(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder
                .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore))
                .defaultSystem("You are a Banking Procurement Expert. Use ONLY provided context.")
                .build();
    }

    public String generate(String query) {
        return chatClient.prompt().user(query).call().content();
    }
}