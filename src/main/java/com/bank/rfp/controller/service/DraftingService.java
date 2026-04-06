package com.bank.rfp.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

@Service
public class DraftingService {

    private final ChatClient chatClient;

    public DraftingService(ChatClient.Builder builder, VectorStore vectorStore) {
        this.chatClient = builder
                .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore, SearchRequest.defaults()))
                .defaultSystem("""
                    You are a Senior Banking Procurement Officer at Indian Bank. 
                    Strictly follow DFS (Department of Financial Services) and IBA guidelines.
                    Draft RFP sections based ONLY on the retrieved banking context.
                    If the context is insufficient, state that specific internal guidelines are required.
                    Use formal, legally-binding terminology (e.g., 'The Bidder shall', 'Force Majeure').
                    """)
                .build();
    }

    public String generateRfpSection(String userRequirement) {
        return this.chatClient.prompt()
                .user(userRequirement)
                .call()
                .content();
    }
}
