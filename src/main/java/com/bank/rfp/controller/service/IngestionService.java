package com.bank.rfp.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.tika.TikaDocumentReader;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class IngestionService {

    private final VectorStore vectorStore;

    public IngestionService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void ingest(Resource pdfResource, String department) {
        // 1. Extract: Uses Apache Tika (Enterprise standard for complex PDFs)
        TikaDocumentReader reader = new TikaDocumentReader(pdfResource);
        
        // 2. Transform: 800 token chunks with 200 token overlap to maintain context
        TokenTextSplitter splitter = new TokenTextSplitter(800, 200, 5, 10, true);
        
        List<Document> documents = splitter.apply(reader.get());
        
        // 3. Enrich: Adding metadata makes the "Search" part professional
        documents.forEach(doc -> {
            doc.getMetadata().put("source", pdfResource.getFilename());
            doc.getMetadata().put("department", department);
            doc.getMetadata().put("bank", "Indian Bank");
        });

        // 4. Load: Handled by your local Vector DB (e.g., pgvector)
        vectorStore.accept(documents);
    }
}
