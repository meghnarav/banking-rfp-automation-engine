package com.bank.rfp.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;  

@Service
public class DraftingService {

    private final ChatClient chatClient;

    public DraftingService(ChatClient.Builder builder, VectorStore vectorStore) {
        // The QuestionAnswerAdvisor automatically handles the "Search" part of RAG
        this.chatClient = builder
                .defaultAdvisors(new QuestionAnswerAdvisor(vectorStore))
                .defaultSystem("""
                    You are a Senior Banking Procurement Officer. 
                    Use formal, legally-compliant language. 
                    Draft RFP sections based ONLY on the provided context from previous bank documents.
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