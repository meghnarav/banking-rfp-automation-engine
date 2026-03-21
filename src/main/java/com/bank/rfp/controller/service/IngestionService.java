package com.bank.rfp.service;

import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.document.Document;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IngestionService {

    private final VectorStore vectorStore;

    public IngestionService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void ingest(Resource pdfResource) {
        // 1. READ: Professional PDF parsing
        TikaDocumentReader reader = new TikaDocumentReader(pdfResource);
        
        // 2. TRANSFORM: Chunking (Pro-level: 800 tokens with 200 overlap)
        TokenTextSplitter splitter = new TokenTextSplitter(800, 200, 5, 10, true);
        
        // 3. LOAD: Save to pgvector
        List<Document> documents = splitter.apply(reader.get());
        vectorStore.accept(documents);
        
        System.out.println("✅ Processed and stored " + documents.size() + " banking context chunks.");
    }
}